import React, { useState } from 'react'
import clock from './img/Clock.gif'
import Timer from './Timer'
const Clock = (props) => {
    const [end, setEnd] = useState(0);
    const [color, setColor] = useState('white');
    return (
        <div id="timer">
            {/* <img src={clock} id="clock" /> */}
            <Timer seconds={[props?.q[2], "clocktimer", setEnd, color, setColor, props?.q[0], props?.q[1]]} />
        </div>
    )
}

export default Clock
