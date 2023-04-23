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

function processFileInput(e) {
    const fileName = e.target.fileName;
    const serial = document.getElementById('serial-input').value;
    let main_key = null;
    if (serial.length > 0) {
        // local decryption, use master key + serial
        main_key = new Uint8Array([...MASTER_KEY, ...new TextEncoder("utf-8").encode(serial)]);
    } else {
        // global decryption, use master key only
        main_key = MASTER_KEY;
    }

    // derive key and iv with our EVP_BytesToKey port
    const derived = deriveKeyAndIV(main_key);
    // encrypted file contents
    const ciphertext = e.target.result;
    // import the raw key
    window.crypto.subtle.importKey("raw", derived.key, "AES-CTR", true, ["encrypt", "decrypt"]).then(function (key) {
        // decrypt using aes-128-ctr
        window.crypto.subtle.decrypt({ name: "AES-CTR", counter: derived.iv, length: 128 }, key, ciphertext).then(function (cleartext) {
            var blob = new Blob([cleartext], { type: "application/octet-stream" });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName + '.dec';
            link.click();
        });
    });
    processFileDecode(e)
}

function processFileDecode(e) {
    const fileName = e.target.fileName;
    const serial = document.getElementById('serial-input').value;
    let main_key = null;
    if (serial.length > 0) {
        // local decryption, use master key + serial
        main_key = new Uint8Array([...MASTER_KEY, ...new TextEncoder("utf-8").encode(serial)]);
    } else {
        // global decryption, use master key only
        main_key = MASTER_KEY;
    }

    // derive key and iv with our EVP_BytesToKey port
    const derived = deriveKeyAndIV(main_key);
    // encrypted file contents
    const ciphertext = e.target.result;
    // import the raw key
    window.crypto.subtle.importKey("raw", derived.key, "AES-CTR", true, ["encrypt", "decrypt"]).then(function (key) {
        // decrypt using aes-128-ctr
        window.crypto.subtle.decrypt({ name: "AES-CTR", counter: derived.iv, length: 128 }, key, ciphertext).then(function (cleartext) {
            const protobufType = document.getElementById('protobuf-list').value;

            if(protobufType != ""){
                protoTypes.forEach((type)=>{
                    if(type.name === protobufType){
                        try {
                            var protoDecoded = type.decode(new Uint8Array(cleartext))
                            if(protoDecoded){
                                document.getElementById('decrypt-output').value = JSON.stringify(protoDecoded.toJSON(),null,2)
                            }
                        } catch (error) {
                            document.getElementById('decrypt-output').value = 'ERROR PARSING PROTOBUF'

                        }
                    }
                })
            }else{
                let maxDecodedSize = 0;
                let maxDecodedType = "";
                protoTypes.forEach((type)=>{
                    try {
                        var protoDecoded = type.decode(new Uint8Array(cleartext))
                        var protoDecodedString = JSON.stringify(protoDecoded.toJSON())
                        if(protoDecodedString.length > maxDecodedSize){
                            maxDecodedSize = protoDecodedString.length
                            maxDecodedType = type
                        }
                        
                    } catch (error) {
                        document.getElementById('decrypt-output').value = 'ERROR PARSING PROTOBUF'
                    }
                })
                if(maxDecodedType !== ""){
                    document.getElementById('protobuf-list').value = maxDecodedType.name
                    var protoDecoded = maxDecodedType.decode(new Uint8Array(cleartext))
                    document.getElementById('decrypt-output').value = JSON.stringify(protoDecoded.toJSON(),null,2)
                }else{
                    var decoder = new TextDecoder("utf-8");
                    document.getElementById('decrypt-output').value = decoder.decode(cleartext)
                }
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // handle file uploads
    let fileInput = document.getElementById('file-input')
    fileInput.onchange = () => {
        const reader = new FileReader()
        reader.onload = processFileInput;
        for (let file of fileInput.files) {
            // https://stackoverflow.com/questions/24245105/how-to-get-the-filename-from-the-javascript-filereader
            reader.fileName = file.name;
            reader.readAsArrayBuffer(file);
        }
    };

    document.getElementById('protobuf-list').onchange = (e)=>{
        let fileInput = document.getElementById('file-input')
        const reader = new FileReader()
        reader.onload = processFileDecode;
        for (let file of fileInput.files) {
            // https://stackoverflow.com/questions/24245105/how-to-get-the-filename-from-the-javascript-filereader
            reader.fileName = file.name;
            reader.readAsArrayBuffer(file);
        }
    }
});


var protoPaths = ["assets/proto/Capture.proto","assets/proto/Preset.proto"]
var protoTypes = []

function loadTypesFromRoot(current) {
    if (current instanceof protobuf.Type){
        protoTypes.push(current);
        
        document.getElementById('protobuf-list').add(new Option(current.name, current.name))
    }

    if (current.nestedArray){
        current.nestedArray.forEach(function(nested) {
            loadTypesFromRoot(nested);
        });
    }
}

/* ProtoBuf */
protoPaths.forEach((protoPath)=>{
    protobuf.load(protoPath).then((root)=>{
        loadTypesFromRoot(root)
    })
})