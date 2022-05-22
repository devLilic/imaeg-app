import React from 'react';
import Input from "../elements/Input";
import ImagePreview from "./ImagePreview";

function ImageBlock(props) {
    return (
        <li className="h-130 flex p-2 border border-red-500 mb-2">
            {/*img-inputs*/}
            <div className="w-full flex flex-col justify-around">
                <Input placeholder="Image url"
                       action={value => (props.setUrl(value, props.image.id))}
                       value={props.image.url}/>

                <Input placeholder="Image name"
                       action={value => (props.setTitle(value, props.image.id))}
                       value={props.image.title}/>
            </div>
            {/*img-preview*/}
            <ImagePreview src={props.image.url}/>
        </li>
    );
}

export default ImageBlock;
