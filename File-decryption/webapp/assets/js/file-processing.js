// as seen in /usr/lib/libzc.so / SetupKeys
const MASTER_KEY = new Uint8Array([
    0x13, 0x27, 0x3f, 0x42,
    0xa5, 0xb6, 0x79, 0xe8,
    0x20, 0x31, 0xc4, 0xf5,
    0x16, 0x17, 0x88, 0x2f,
    0x43, 0xa4, 0x55, 0x69,
    0x77, 0xb8, 0xe2, 0x83,
    0x04, 0x05, 0x60, 0x70,
    0x80, 0x02, 0x03, 0x04,
    0x50, 0x6a, 0x7c, 0x8a,
    0x02, 0x30, 0x40, 0x51,
    0x6a, 0x7d, 0x8d, 0x22,
    0x33, 0x44, 0x59, 0x66,
    0x71, 0x08, 0x02, 0x03,
    0x43, 0x05, 0x67, 0x7a,
    0x8f]);

function hex(byteArray) {
    return Array.prototype.map.call(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
}

// ported from EVP_BytesToKey 
// https://github.com/openssl/openssl/blob/c04e78f0c69201226430fed14c291c281da47f2d/crypto/evp/evp_key.c#L78
function deriveKeyAndIV(password, iterations = 10) {
    var keyLen = 16;
    var ivLen = 16;
    var addmd = 0;

    var key = new Uint8Array(keyLen);
    var iv = new Uint8Array(ivLen);
    var tmp = new Uint8Array();
    var i, key_i = 0, iv_i = 0;

    for (; keyLen > 0 || ivLen > 0;) {
        if (addmd++) {
            block = new Uint8Array([...tmp, ...password]);
        } else {
            block = password;
        }

        tmp = new Uint8Array(sha1.array(block));
        for (i = 1; i < iterations; i++) {
            tmp = sha1.array(tmp);
        }

        i = 0;
        while (keyLen && i != tmp.length) {
            key[key_i++] = tmp[i];
            keyLen--;
            i++;
        }

        while (ivLen != 0 && i != tmp.length) {
            iv[iv_i++] = tmp[i];
            ivLen--;
            i++;
        }
    }

    return { key: key, iv: iv };
}

async function decryptFile(fileContents, key) {  
    // derive key and iv with our EVP_BytesToKey port
    const derived = deriveKeyAndIV(key);
  
    // import the raw key
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      derived.key,
      "AES-CTR",
      true,
      ["encrypt", "decrypt"]
    );
  
    console.log("cryptoKey", cryptoKey)

    // decrypt the file contents using aes-128-ctr
    const decryptedData = await window.crypto.subtle.decrypt(
      { name: "AES-CTR", counter: derived.iv, length: 128 },
      cryptoKey,
      fileContents
    );
  
    // create a new Blob with the decrypted data
    const decryptedBlob = new Blob([decryptedData], { type: "application/octet-stream" });
  
    return decryptedBlob;
  }
  

async function encryptFile(fileContents, key) {  
    // derive key and iv with our EVP_BytesToKey port
    const derived = deriveKeyAndIV(key);
  
    // import the raw key
    const cryptoKey = await window.crypto.subtle.importKey(
        "raw",
        derived.key,
        "AES-CTR",
        true,
        ["encrypt", "decrypt"]
    );
  
    // encrypt the file contents using aes-128-ctr
    const encryptedData = await window.crypto.subtle.encrypt(
        { name: "AES-CTR", counter: derived.iv, length: 128 },
        cryptoKey,
        fileContents
    );
  
    // create a new Blob with the encrypted data
    const encryptedBlob = new Blob([encryptedData], { type: "application/octet-stream" });
  
    return encryptedBlob;
}
  

function processFileDecode(clearText) {
    const protobufType = document.getElementById('protobuf-list').value;

    if(protobufType != ""){
        protoTypes.forEach((type)=>{
            if(type.name === protobufType){
                decodedProtobuf = type.decode(new Uint8Array(clearText))
            }
        })
    }
}
