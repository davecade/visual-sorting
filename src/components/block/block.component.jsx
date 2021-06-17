import React from 'react'
import './block.styles.scss'
import { connect } from 'react-redux'

const Block = ({currentIndex, leftPointer, rightPointer, sortRunning}) => {
    
    const addHighlight = () => {
        if(sortRunning && currentIndex===leftPointer) {
            return 'pointing'
        }
        
        if(rightPointer!==null) {
            if(sortRunning && currentIndex===rightPointer){
                return 'right-pointing'
            }
        }

        
        return ''
    }

    return <li className={`${addHighlight()} block`}></li>
}

const mapStateToProps = state => ({
    sortRunning: state.sort.sortRunning,
    leftPointer: state.sort.leftPointer
})

export default connect(mapStateToProps)(Block);