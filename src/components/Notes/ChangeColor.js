import React, { useState } from 'react';
import paletteSVG from "../../assets/misc/palette.svg";
import './ChangeColor.css'

function ChangeColor(props) {
  const [pickingColorAll, setPickingColorAll] = useState(false);
  const [pickingColorSingle, setPickingColorSingle] = useState(false);

    return (
        <div 
            className='change-color'
        >
            <img className='palette' onClick={(e) => {setPickingColorAll(!pickingColorAll); } } src={paletteSVG} alt='palette icon' ></img>

            {pickingColorAll &&(
                            <div className='color-options'>
                                <ul className='color-options-list'>
                                    <li onClick={(e) => {props.setNewColor(e.target.style.backgroundColor); setPickingColorAll(false); console.log(e)}} className='color-item' style={{backgroundColor: '#e9d8a6'}}></li>
                                    <li onClick={(e) => {props.setNewColor(e.target.style.backgroundColor); setPickingColorAll(false); console.log(e)}} className='color-item' style={{backgroundColor: '#fcd5ce'}}></li>
                                    <li onClick={(e) => {props.setNewColor(e.target.style.backgroundColor); setPickingColorAll(false); console.log(e)}} className='color-item' style={{backgroundColor: '#84a98c'}}></li>
                                    <li onClick={(e) => {props.setNewColor(e.target.style.backgroundColor); setPickingColorAll(false); console.log(e)}} className='color-item' style={{backgroundColor: 'ivory'}}></li>
                                </ul>
                            </div>
            )}

        </div>
    );
}

export default ChangeColor;