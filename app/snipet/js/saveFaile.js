


    function saveTextAsFile(textToWrite, fileNameToSaveAs, fileType) {
    let textFileAsBlob = new Blob([textToWrite], { type: fileType });
    let downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';

    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(
            textFileAsBlob
        );
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}


function saveTextAsFile2(text, filename, type = "text/plain") {
    Object.assign(document.createElement('a'), {
         download: filename,
         href: URL.createObjectURL(new Blob([text], { type }))
    }).click();
}

saveTextAsFile('Hello World!', 'hello.txt', 'text/plain');
saveTextAsFile('{"hello": "world"}', 'hello.json', 'application/json');

saveTextAsFile2('Hello World!', 'hello.txt', 'text/plain');
saveTextAsFile2('{"hello": "world"}', 'hello.json', 'application/json');

