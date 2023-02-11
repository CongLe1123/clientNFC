import React,{useState} from 'react';
import './Gallery.css'
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import modified from './functions';
import LazyLoad from 'react-lazyload'

const Gallery = (inputData) =>{

    let data = inputData.data.replace('[', '').replace(']', '').split(',');
    data = modified(data);
    const [model, setModel] = useState(Array(data.length).fill(false));

    const getImg = (index) =>{
        let newModel = Array(data.length).fill(false);
        newModel[index] = true;
        setModel(newModel);
    }

    const nextImg = () => {
        const index = model.indexOf(true);
        let newModel = Array(data.length).fill(false);
        if (index === data.length - 1) {
            newModel[0] = true;
            setModel(newModel); 
        } else {
            newModel[index + 1] =true;
            setModel(newModel);
        }
    }

    const prevImg = () => {
        const index = model.indexOf(true);
        let newModel = Array(data.length).fill(false);
        if (index === 0) {
            newModel[model.length -1] = true;
            setModel(newModel); 
        } else {
            newModel[index - 1] =true;
            setModel(newModel);
        }
    }

    return(

        <>
            <div className="gallery">
                {data.map((item, index)=>{
                    return(
                    <LazyLoad once = {true} placeholder = {<Loading/>}>
                        <div className='pics' key={index} onClick={()=>getImg(index)}>
                            <img src={require(`./storage/Thumbnail/${item}`)} style={{width: '100%'}} alt=''/>
                        </div>
                    </LazyLoad>
                    )
                })}
            </div>

            {data.map((item, index)=>{
                return(
                    <LazyLoad once = {true}>
                        <div className={model[index] ? "model open": "model"}>
                            <img src={require(`./storage/Main/${item}`)} alt=''/>
                            <CloseIcon className='closeButton' onClick={()=>setModel(model[model.indexOf(true)] = false)}/>
                            <ArrowForwardIosIcon className='nextButton'onClick={() => nextImg()}/>
                            <ArrowBackIosIcon className='backButton'onClick={() => prevImg()}/>
                        </div>
                    </LazyLoad>
                )
            })}
        </>
    )

}

function Loading() {
    return (
        <div className="post loading">
            <h5>Loading...</h5>
        </div>
    )
}


export default Gallery;