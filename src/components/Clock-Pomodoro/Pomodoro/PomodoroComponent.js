import React, { useContext, useRef } from 'react';
import Button from './Button';
import { useState } from 'react';
import { SettingContext } from '../../../context/settings.context';

function PomodoroComponent() {
    // Using settings theme to update executing state of the timer
    const { updateExecute } = useContext(SettingContext)

    const [newTimer, setNewTimer] = useState({
        work: 25,
        short: 5,
        long: 15,
        active: 'work'
    })

    const handleChange = input => {
        const { name, value } = input.target
        switch (name) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value)
                })
                break;
            case 'shortBreak':
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break;
            case 'longBreak':
                setNewTimer({
                    ...newTimer,
                    long: parseInt(value)
                })
                break;
            default:
                break;
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateExecute(newTimer)
    }
    return (
        <div className='form-container'>
            <form noValidate>
                <div className='input-wrapper'>
                    <p>Duration:</p>
                    <input className='input' name="work" onChange={handleChange} value={newTimer.work} />
                    <p>Short Break Duration:</p>
                    <input className='input' name="shortBreak" onChange={handleChange} value={newTimer.short} />
                    <p>Long Break Duration:</p>
                    
                    <input className='input' name="longBreak" onChange={handleChange} value={newTimer.long} />
                </div>
                <Button activeClass={'settings-btn set-timer-btn'} title="Set Timer" _callback={handleSubmit} />
            </form>

        </div>
    );
}

export default PomodoroComponent;