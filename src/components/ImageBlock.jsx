import React from 'react';
import Input from "../elements/Input";
import ImagePreview from "./ImagePreview";

function ImageBlock(props) {
    return (
        <li className="flex ">
            {/*img-inputs*/}
            <div className='flex w-11/12 border border-red-500 bg-indigo-100 rounded-lg p-2 mb-2 h-130'>
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
            <div className='flex justify-center items-center w-1/12'>
                <button type='button'
                        onClick={() => props.delete(props.image.id)}
                        className='text-center px-1 py-1 rounded-lg bg-red-500 hover:bg-red-700 text-white text-xs'
                >Delete</button>
            </div>

        </li>
    );
}

export default ImageBlock;
