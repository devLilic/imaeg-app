import React from "react";

function Input(props){
    function handleInput(event){
        props.action(event.target.value)
    }

    return (
        <input
            className="px-2 py-1 text-xl w-full rounded"
            type="text"
            onChange={handleInput}
            value={props.value}
            placeholder={props.placeholder}
        />
    )
}

export default Input
