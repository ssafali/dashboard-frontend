import React from 'react';

function Button ({title, activeClass, _callback}) {

    return (
        <div>
            <button className={activeClass} onClick={_callback}>{title}</button>
        </div>
    );
}

export default Button