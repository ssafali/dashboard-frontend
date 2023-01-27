import React, {useState, useEffect} from 'react';
import "./Clock.css"
import moment from 'moment';
function Clock(props) {
    const [clock, setClock] = useState('');
    const [sec, setSec] = useState('');
    const [date, setDate] = useState('')
    useEffect(() => {
        setInterval(() => {
            setClock(moment().format('HH:mm'))
            setSec(moment().format('ss')); 
            setDate(moment().format("MMMM D"))
        },1000)
    },[])
    return (
        <div className="time-container">
            <div className="time-dashboard">
                <div className="clock"  onClick={() => {
                    props.setNewsActive(false)
                    props.setNotesActive(false)
                    props.setWeatherActive(false);
                    props.setClockActive(false);
                    props.setNavbarActive(false);
                    props.setPomodoroActive(true)}}
            >{clock} <p className="seconds">{sec}</p></div>
                <div >
                    <div className="date">{date}</div>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
 
}

export default Clock;