import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
export const SettingContext = createContext();

const SettingsContextProvider = (props) => {
    const [pomodoro, setPomodoro] = useState(25);
    const [executing, setExecuting] = useState({});
    const [startAnimate, setStartAnimate] = useState(false);
    
    useEffect(() => { updateExecute(executing) }, [executing, startAnimate])
    

    const startTimer = () => {
        setStartAnimate(true);
    }

    const pauseTimer = () => {
        setStartAnimate(false);
    }

    const stopTimer = () => {
        setStartAnimate(false);
    }

    const settingButton = () => {
        setExecuting({});
        setPomodoro(0);
    }

    function setCurrentTimer(active_state) {
        updateExecute({
            ...executing,
            active: active_state
        })
        setTimer(executing);
    }

    const updateExecute = (updatedSettings) => {
        setExecuting(updatedSettings)
        setTimer(updatedSettings)
    }

    const stopAnimate = () => {
        setStartAnimate(false)
    }

    const setTimer = evaluate => {
        switch (evaluate.active) {
            case 'work':
                setPomodoro(evaluate.work)
                break;
            case 'short':
                setPomodoro(evaluate.short)
                break;
            case 'long':
                setPomodoro(evaluate.long)
                break;
            default:
                setPomodoro(0);
                break;
        }
    }

    const children = ({remainingTime}) => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
            // if(minutes == 0 && seconds == 0) {
            //     playAudio();
            // } 
            if(minutes < 10 && seconds < 10) {
                return `0${minutes}:0${seconds}`
            } else if (minutes < 10 && seconds >= 10) {
                return `0${minutes}:${seconds}`
            } else if (minutes > 10 && seconds < 10) {
                return `${minutes}:0${seconds}`
            }
        return `${minutes}:${seconds}`
    }

    return (
        <SettingContext.Provider 
        value={{ 
            stopTimer, 
            updateExecute,
            pomodoro,
            executing,
            startAnimate,
            startTimer,
            pauseTimer,
            settingButton,
            setCurrentTimer,
            stopAnimate,
            children
            }}>
            {props.children}
        </SettingContext.Provider>

    );
}

export default SettingsContextProvider;