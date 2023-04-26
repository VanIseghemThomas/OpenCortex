let decryptedBlobUrl = null;
let currentFileName = null;
let currentClearText = null;
let decodedProtobuf = null;

document.addEventListener("DOMContentLoaded", function () {
    // handle file uploads
    let fileInput = document.getElementById('file-upload');
    let fileInputLabel = document.getElementById('file-upload-label');
    let fileDownloadBtn = document.getElementById('file-download');
    let decryptToggle = document.getElementById('decrypt-toggle');
    let serialForm = document.getElementById('serial-form');
    var jsonRenderer = document.querySelector('.target');
    var liveDecoder = document.getElementById('live-decoder');
    let acknowledgement = document.querySelector('.ethics-message-ack');


    // Don't display the download button until a file is selected
    fileDownloadBtn.style.display = 'none';
    serialForm.style.display = 'none';
    liveDecoder.style.display = 'none';
    fileInput.disabled = true;

    // Etics message
    acknowledgement.addEventListener('click', function () {
        document.querySelector('.ethics-message').style.display = 'none';
        // Enable the file input
        console.log(fileInput)
        fileInput.disabled = false;
        fileInputLabel.classList.remove('upload-disabled');
    });

    fileInput.onchange = () => {
        const reader = new FileReader()
        reader.addEventListener('load', async (e) => {
            currentFileName = e.target.fileName;

            const serial = document.getElementById('serial-input').value;

            let main_key = null;
            if (serial.length > 0) {
                // local decryption, use master key + serial
                main_key = new Uint8Array([...MASTER_KEY, ...new TextEncoder("utf-8").encode(serial)]);
            } else {
                // global decryption, use master key only
                main_key = MASTER_KEY;
            }

            console.log("Decrypting file: " + currentFileName + " with key: " + main_key + " and serial: " + serial);
            let blob = await decrypt(e.target.result, main_key);
            console.log(blob);
            decryptedBlobUrl = window.URL.createObjectURL(blob);
            
            // If the filename ends with .cns or pb, we can assume it's a protobuf file
            if(currentFileName.endsWith('.cns') || currentFileName.endsWith('.pb')){
                // Enable live decoding
                liveDecoder.style.display = 'block';
            }
        });

        for (let file of fileInput.files) {
            // https://stackoverflow.com/questions/24245105/how-to-get-the-filename-from-the-javascript-filereader
            reader.fileName = file.name;
            reader.readAsArrayBuffer(file);
        }
        if(fileInput.files.length > 0){
            fileDownloadBtn.style.display = 'flex';
        }else{
            fileDownloadBtn.style.display = 'none';
        }
    };

    fileDownloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = decryptedBlobUrl
        link.download = currentFileName + '.dec';
        link.click();
    };

    decryptToggle.onchange = () => {
        if (decryptToggle.checked) {
            serialForm.style.display = 'block';
        } else {
            serialForm.style.display = 'none';
        }
    };

    document.getElementById('protobuf-list').onchange = (e)=>{
        processFileDecode(currentClearText);
        console.log(decodedProtobuf);

        // Decode protobuf is a class, so we need to convert it to a JSON object
        var json = JSON.parse(JSON.stringify(decodedProtobuf));

        jsonRenderer.innerHTML = jsonViewer(json, true);
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