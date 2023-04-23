let decryptedBlobUrl = null;
let currentFileName = null;
let currentClearText = null;
let decodedProtobuf = null;

document.addEventListener("DOMContentLoaded", function () {
    // handle file uploads
    let fileInput = document.getElementById('file-upload');
    let fileDownloadBtn = document.getElementById('file-download');
    let decryptToggle = document.getElementById('decrypt-toggle');
    let serialForm = document.getElementById('serial-form');
    var jsonRenderer = document.querySelector('.target');
    var liveDecoder = document.getElementById('live-decoder');


    // Don't display the download button until a file is selected
    fileDownloadBtn.style.display = 'none';
    serialForm.style.display = 'none';
    liveDecoder.style.display = 'none';

    fileInput.onchange = () => {
        const reader = new FileReader()
        reader.addEventListener('load', (e) => {
            console.log(e);
            currentFileName = e.target.fileName;
            processFileInput(e);

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