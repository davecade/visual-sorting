import React from 'react'
import './block.styles.scss'

const Block = ({currentIndex, pointer, rightPointer, sortRunning}) => {
    
    const addHighlight = () => {
        if(sortRunning && currentIndex===pointer) {
            return 'pointing'
        }
        
        if(rightPointer!==null) {
            if(sortRunning && currentIndex===rightPointer){
                return 'pointing'
            }
        }

        
        return ''
    }

    return <li className={`${addHighlight()} block`}></li>
}

export default Block;