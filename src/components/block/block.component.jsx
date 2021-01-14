import React from 'react'
import './block.styles.scss'

const Block = ({currentIndex, pointer, sortRunning}) => {
    
    const addHighlight = () => {
        if(sortRunning && currentIndex===pointer) {
            return 'pointing'
        } else {
            return ''
        }
    }

    return <li className={`${addHighlight()} block`}></li>
}

export default Block;