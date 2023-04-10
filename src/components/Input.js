import React, { useState } from 'react'
export default function Input({ objValue, index }) {
    const { label, value, option } = objValue;
    const [opt, setOpt] = useState(0);
    const click = (e) => {
        if (opt === 1) {
            setOpt(0);
        }
        else {
            setOpt(1);
        }
        value({ ...option, [index]: 1 - opt });
    }
    return (
        <div className="input">
            <label htmlFor={label}><input className="input-box" type="checkbox" id={index} onClick={click} />{label}</label>
        </div>
    );
}
