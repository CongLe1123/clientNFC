import Gallery from './Galerry';
import React, {useState} from 'react';

function App() {

  const url = new URL(window.location.href);
  const set = url.searchParams.get('set');
  const imgs = url.searchParams.get('imgs');
  const [data, setData] = useState();

  const getImgs = async() => {
    const recieve = await fetch(`https://server-jade-delta.vercel.app/get/${set}/${imgs}`);
    const arrayData = await recieve.text();
    setData(arrayData);
  };
  getImgs();
  
  function startRender(){
    if(typeof data !== "undefined"){
      return (
        <>
          <h1 style={{textAlign:'center'}}>Image Gallery</h1>
          <Gallery data={data}/>
        </>
      );
  }
  else{
      setTimeout(startRender, 250);
  }

  }

  return(startRender());
}

export default App;
