import React, { useEffect, useRef } from 'react';
import "./PomodoroTimer.css"
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from 'react';
import PomodoroComponent from './PomodoroComponent';
import CountdownAnimation from './CountdownAnimation';

import { SettingContext } from "../../../context/settings.context";
import Button from './Button';
 
function PomodoroTimer(props) {
    const { pomodoro, executing, setCurrentTimer, settingButton, startAnimate, startTimer, pauseTimer, updateExecute, children } = useContext(SettingContext)
    
    useEffect(() => { updateExecute(executing) }, [executing, startAnimate])
    return (
        <div className="container">
            <button className='return' onClick={() => {
                props.setClockActive(true);
                props.setWeatherActive(true);
                props.setPomodoroActive(false);
                props.setNavbarActive(true);
                }}>&larr;
            
            </button>
            <h1>Pomodoro</h1>

            {pomodoro !== 0 ?
                <>
                    <ul className="labels">
                        <li>
                            <Button
                                title="Work"
                                activeClass={executing.active === 'work' ? 'active-label' : 'settings-btn'}
                                _callback={() => setCurrentTimer('work')}
                            />
                        </li>
                        <li>
                            <Button
                                title="Short Break"
                                activeClass={executing.active === 'short' ? 'active-label' : 'settings-btn'}
                                _callback={() => setCurrentTimer('short')}
                            />
                        </li>
                        <li>
                            <Button
                                title="Long Break"
                                activeClass={executing.active === 'long' ? 'active-label' : 'settings-btn'}
                                _callback={() => setCurrentTimer('long')}
                            />
                        </li>
                    </ul>
                    <Button activeClass={"settings-btn settings"}title="Settings" _callback={settingButton} />
                    <div className="timer-container">
                        <div className="time-wrapper">
                            <CountdownAnimation
                                // key={pomodoro}
                                timer={pomodoro}
                                animate={startAnimate}
                            >
                                {children}
                            </CountdownAnimation>
                        </div>
                    </div>
                    <div className="button-wrapper">
                        <Button className='' title="Start" activeClass={!startAnimate ? 'active pause-btn' : 'pause-btn'} _callback={startTimer} />
                        <Button  title="Pause" activeClass={startAnimate ? 'active pause-btn' : 'pause-btn'} _callback={pauseTimer} />
                    </div>
                </> : <PomodoroComponent />}
        </div>
    )
}

export default PomodoroTimer;