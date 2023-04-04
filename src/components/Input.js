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
        console.log('opt= ', opt);
        value({ ...option, [index]: 1 - opt });
    }
    return (
        <div className="input">
            <input type="checkbox" id={index} onClick={click} />
            <label htmlFor={label}>{label}</label>
        </div>
    );
}
