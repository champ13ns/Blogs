import React from "react";
const InputBox = function({spanText, placeholder, type, onChange , value}){
    return(
        <div>
                <span className="font-semibold text-white pt-2 pb-2">{spanText}</span>
                <br></br>
                <input value={value} onChange={onChange} className="rounded-md p-2 mt-2 mb-2"  placeholder = {placeholder} type={type}></input>
                <br></br>
        </div>
    )
}
export default InputBox;