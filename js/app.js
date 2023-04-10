async function loaded(reader) {
    const response = await fetch('https://willdguo-fastai-l2.hf.space/run/predict', {
    method: "POST", body: JSON.stringify({ "data": [reader.result] }),
    headers: { "Content-Type": "application/json" }
    });
    const json = await response.json();
    const label = json['data'][0]['confidences'][0]['label'];
    document.getElementById('results').innerHTML = `<br/><img src="${reader.result}" width="300"> <p>${label}</p>`
}

function read() {
    const reader = new FileReader();
    reader.addEventListener('load', () => loaded(reader))
    reader.readAsDataURL(image_file.files[0]);
}

window.onload = function(){
    const image_file = document.getElementById('image_file')
    image_file.addEventListener('input', read) 
}
