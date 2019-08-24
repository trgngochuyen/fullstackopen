import React from 'react'
import '../index.css'

const Message = ({message, color}) => {
    if (message === null) {
        return null
    } else if (message && color === 'red') {
        return (
            <div className='redMessage'>
                <p>{message}</p>
            </div>
        )
    } 
    return (
            <div className='greenMessage'>
                <p>{message}</p>
            </div>
    )
}

export default Message