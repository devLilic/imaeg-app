import React, {useState, useRef, useEffect} from 'react'
import ReactCrop from 'react-image-crop'
import {canvasPreview} from './CanvasPreview'
import 'react-image-crop/dist/ReactCrop.css'

function CropBlock(props) {
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const aspect = 16 / 9;

    useEffect(() => {
        let height = imgRef.current.clientHeight
        let width = imgRef.current.clientHeight * 16 / 9;

        if (width > imgRef.current.clientWidth) {
            width = imgRef.current.clientWidth;
            height = width * 9 / 16;
        }
        setCrop({
            unit: '%',
            x: 0,
            y: 0,
            width: width / imgRef.current.clientWidth * 100,
            height: height / imgRef.current.clientHeight * 100
        })
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop
                )
            }
        }, 100)
        return () => {
            clearInterval(timer);
        }
    }, [completedCrop])

    function completedCropHandler(c) {
        console.log('handler', crop, completedCrop, c);
        return setCompletedCrop(c)
    }

    return (
        <div>
            {completedCrop && <span>{imgRef.current.naturalWidth} x {imgRef.current.naturalHeight}</span>}
            <hr/>
            <div>
                <ReactCrop crop={crop}
                           onChange={(_, percentCrop) => setCrop(percentCrop)}
                           onComplete={(c) => completedCropHandler(c)}
                           aspect={aspect}>
                    <img ref={imgRef}
                         alt=""
                         src={props.src}
                    />
                </ReactCrop>
            </div>
            <div>
                {completedCrop && (
                    <canvas ref={previewCanvasRef}
                            hidden={true}
                            className="border object-contain"
                            style={{
                                width: completedCrop.width,
                                height: completedCrop.height,
                            }}
                    />
                )}
            </div>
        </div>
    )
}

export default CropBlock;
