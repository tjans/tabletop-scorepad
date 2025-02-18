import React from 'react'

const TextIcon = ({ text, settings }) => {
    return (

        <div className="uppercase rounded-full flex items-center justify-center font-bold"
            style={{ color: settings.textColor, background: settings.color, height: '50px', width: '50px' }}>
            {text}
        </div>

    )
}

export default TextIcon