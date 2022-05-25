import React from 'react';
import Input from "../elements/Input";
import ImagePreview from "./ImagePreview";

function ImageBlock(props) {
    return (
        <li className="h-130 flex p-2 border border-red-500 mb-2 bg-indigo-100 rounded-lg">
            {/*img-inputs*/}
            <div className="sm:w-8/12 w-8/12 flex flex-col justify-around">
                <Input placeholder="Image url"
                       action={value => (props.setUrl(value, props.image.id))}
                       value={props.image.url}/>

                <Input placeholder="Image name"
                       action={value => (props.setTitle(value, props.image.id))}
                       value={props.image.title}/>
            </div>
            {/*img-preview*/}
            <ImagePreview src={props.image.url} edit={props.edit}/>
        </li>
    );
}

export default ImageBlock;
