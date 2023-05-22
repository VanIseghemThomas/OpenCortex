import urllib.request
import datetime
import hashlib
import hmac
import json
import sys
from tqdm import tqdm
import requests

download_dir = "./"
updater_mode = "download"

class CorOS_Downloader:
    firmware_version_lut = {
        "2.0.1": "cIR97IrfvF4fKfO5_KIm_j_aP2zGiHp_",
    }

    # Hardcoded values, might be moved to a config file
    service = "execute-api"
    host = "config-api.neuraldsp.com"
    endpoint = "/api/v1/config/firmware/latest"
    stage = ""
    firmwareType = "update_QC_rev5.bin"
    filename = "update"
    access_key = "raphael_zpu"
    secret_key = "a540MUwH+cjmBEg1mNFKKsXwoRerk/IPWoQP+UDFo0M="

    def __init__(self, version, updatermode, download_dir):
        self.firmwareVersion = self.firmware_version_lut[version]
        self.download_dir = download_dir
        self.updatermode = updatermode
    
    @property
    def url(self):
        return "https://{}{}{}".format(self.host, self.stage, self.endpoint)

    @property
    def date(self):
        return str(int((datetime.datetime.utcnow() - datetime.datetime(1970, 1, 1)).total_seconds()))

    @property
    def payload(self):
        payload_dict = {
            "deviceId": self.access_key,
            "firmwareType": self.firmwareType,
            "firmwareVersion": self.firmwareVersion
        }
        return json.dumps(payload_dict)
    
    @property
    def headers(self):
        return 'content-type:application/json;host:{};x-cortex-date:{}'.format(self.host, self.date)

    def sign_request(self):
        string_to_sign = '{}\n{}\n{}\n{}\n{}'.format("POST", self.endpoint, "", hashlib.sha256(self.payload.encode("utf-8")).hexdigest(), self.headers)
        return hmac.new(self.secret_key.encode('utf-8'), string_to_sign.encode('utf-8'), hashlib.sha256).hexdigest()


    def build_authorization_header(self, signature):
        return f'Key={self.access_key} Signature={signature}'
    
    # Define the progress callback function
    def _progress_callback(self, count, block_size, total_size):
        if(count == 0):
            self.progress_bar = tqdm(total=total_size, unit='B', unit_scale=True)
        self.progress_bar.update(count * block_size - self.progress_bar.n)
        if self.progress_bar.n >= total_size:
            self.progress_bar.close()
    
    def download_file(self, url, version_id):
        file = f"{self.download_dir}/{self.filename}-{version_id}.bin" if self.filename else f"{self.download_dir}/{version_id}.bin"
        urllib.request.urlretrieve(url, file, self._progress_callback)

    def download_changelog(self, url):
        file = '{}/changelog'.format(self.download_dir)
        
        urllib.request.urlretrieve(url, file, self._progress_callback)

    def check_update(self, output):
        try:
            parsed = json.loads(output)
            url = parsed.get("url")
            versionId = parsed.get("versionId")
            message = parsed.get("message")
            changelogUrl = parsed.get("changelogUrl")
            if url:
                print(f"New version available, versionId: {versionId}.")
                print(f"url: {url}")

                if changelogUrl:
                    print ("New changelog available")
                    print (f"changelogUrl: {changelogUrl}")
                    self.download_changelog(changelogUrl)
                else:
                    print ("No new changelog found")
                    return True
            else:
                if message:
                    print("No new version available")
                else:
                    print("Try again later, server seems to be busy")
                return False
        except:
            print("An error occurred while trying to check for the latest version")

    def updater_download(self, output):
        try:
            parsed = json.loads(output)
            url = parsed.get("url")
            versionId = parsed.get("versionId")
            message = parsed.get("message")
            if url:
                response = urllib.request.urlopen(url)
                size = response.getheader('Content-Length')
                fname = open(f"{self.download_dir}/{'{}-{}.bin'.format(self.filename, versionId) if self.filename else '{}.bin'.format(versionId)}", "w+")
                fname.write(f"{self.filename}-{versionId}.bin" if self.filename else f"{versionId}.bin")
                fname.close()

                print("Downloading new version, versionId: {}.".format(versionId))
                self.download_file(url, versionId)
            else:
                if message:
                    print("No new version available")
                else:
                    print("Try again later, server busy")
        except:
            print("An error occurred while trying to check for the latest version")

    def initial_request(self):
        if self.access_key is None or self.secret_key is None:
            print('No api access key is available.')
            sys.exit(1)

        signature = self.sign_request()
        authorization_header = self.build_authorization_header(signature)

        headers = {
            'content-type': 'application/json',
            'host': self.host,
            'x-cortex-date': self.date,
            'authorization': authorization_header
        }

        response = requests.post(self.url, data=self.payload, headers=headers)
        output = response.text
        return output

    def download(self):
        initial_request = self.initial_request()
        if self.updatermode == "check":
            self.check_update(initial_request)
        elif self.updatermode == "download":
            self.updater_download(initial_request)


if __name__ == "__main__":
    print("CorOS Downloader started")
    downloader = CorOS_Downloader("2.0.1", updater_mode, download_dir)
    downloader.download()