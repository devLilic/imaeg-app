import React, {useState} from 'react';

function ImageEdit(props) {
    const [imageData, setImageData] = useState({
        format: '',
        size: {
            w: 0,
            h: 0
        }
    })

    function getData(event){
        setImageData({
            format: event.target.src.split('.').pop().trim(),
            size: {
                w: event.target.naturalWidth,
                h: event.target.naturalHeight
            }
        })
    }
    return (
        <div>
            <div className="bg-yellow-100 w-full aspect-video">
                {props.src && <img src={props.src} alt="" onLoad={getData}/>}
            </div>
            <div className='mt-4 ml-2'>
                <p className="font-bold text-2xl mb-2">Details</p>
                <div className="flex flex-wrap">
                    <span className="w-3/12 mb-2">Size</span>
                    <span className="w-9/12 mb-2">{imageData.size.w} x {imageData.size.h}</span>
                    <span className="w-3/12 mb-2">Format</span>
                    <span className="w-9/12 mb-2">{imageData.format}</span>
                </div>
            </div>
        </div>
    );
}

export default ImageEdit;
