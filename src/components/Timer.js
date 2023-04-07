import React, { useEffect, useRef, useState } from 'react'
export default function Timer(props) {
    const [countdown, setcountdown] = useState(props.seconds[0]);
    const timerid = useRef();
    let color = props.seconds[3];
    const format = (time) => {
        let min = Math.floor(time / 60);
        let sec = Math.floor(time - min * 60);
        if (min < 10) {
            min = '0' + min;
            if (props.seconds[3] !== 'red') {
                props.seconds[4]('red');
            }
        }
        if (sec < 10) sec = '0' + sec;
        return min + ' : ' + sec;
    }
    useEffect(() => {
        timerid.current = setInterval(() => {
            setcountdown(prev => prev - 1);
        }, 1000)
        return () => clearInterval(timerid.current);
    }, [])
    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerid.current);
            props.seconds[2](1);
            if (props.seconds.length === 7) {
                props.seconds[5](props.seconds[6]);
            }
        }
    }, [countdown]);
    return (
        <p id={props.seconds[1]} style={{ color: color }}  >{format(countdown)}</p>
    )
}
