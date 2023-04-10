import React, { useState } from 'react';

function App() {

  const [txt, setTxt] = useState("")
  const [imagePath, setImagePath] = useState("")

  const changeTxt = (newTxt) => {
    setTxt(newTxt)
  }

  const changeImagePath = (newImagePath) => {
    setImagePath(newImagePath)
  }

  async function loaded(reader) {
    const response = await fetch('https://willdguo-fastai-l2.hf.space/run/predict', {
    method: "POST", body: JSON.stringify({ "data": [reader.result] }),
    headers: { "Content-Type": "application/json" }
    });
  
    const json = await response.json();
    const label = json['data'][0]['confidences'][0]['label'];
    const conf = json['data'][0]['confidences'][0]['confidence']
  
    const results = label + ' with confidence ' + conf
    changeTxt(results)
    changeImagePath(reader.result)

    // console.log(conf)
    // document.getElementById('results').innerHTML = `<br/><img src="${reader.result}" width="300"> <p>${label} with confidence ${conf}%</p>`
  }
  
  const read = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => loaded(reader));
    
    
    reader.readAsDataURL(file);
  }
  
  const read_file = (event) => {
    // console.log(event.target.value)
    read(event.target.files[0])
  }

  return(

      <center>
        <h1> Apple or Owl? fastai Classifier </h1>

        <p> Upload a picture of an apple or a barn owl </p>


        <img src="apple.jpg" width="300px" />
        <img src = "barnowl.jpg" width = "300px" />
        <br />


        <input type = "file" id = "image_file" accept = "image/*" onChange = {read_file}/>

        <img src = {imagePath} />

        <p> {txt} </p>

      </center>

  )
}

export default App
