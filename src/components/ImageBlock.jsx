import React from 'react';
import Input from "../elements/Input";
import ImagePreview from "./ImagePreview";

function ImageBlock(props) {
    return (
        <li className="flex relative">
            {/*img-inputs*/}
            <div className='flex w-full border bg-indigo-100 rounded-lg p-2 mb-2 h-130'>
                <div className="w-7/12 flex flex-col justify-around">
                    <Input placeholder="Image url"
                           action={value => (props.setUrl(value, props.image.id))}
                           value={props.image.url}/>

                    <Input placeholder="Image name"
                           action={value => (props.setTitle(value, props.image.id))}
                           value={props.image.title}/>
                </div>
                {/*img-preview*/}
                <ImagePreview image={props.image} edit={props.edit}/>
            </div>
            <button type='button'
                    onClick={() => props.delete(props.image.id)}
                    className='text-center px-1 bg-red-300 hover:bg-red-500 text-white text-xs absolute top-0 right-0 rounded-tr-lg'
            >&times;
            </button>

        </li>
    );
}

export default ImageBlock;
