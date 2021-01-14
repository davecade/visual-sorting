import React from 'react'
import './column.styles.scss'

const Column = ({currentIndex, number, pointer, sortRunning}) => {
    let count = new Array(number).fill(0)

    const addHighlight = () => {
        if(sortRunning && currentIndex===pointer) {
            return 'pointing'
        } else {
            return ''
        }
    }

    return (
        <ul className="column" >
            {
                count.map((item, index) => {
                    return <li key={index} className={`${addHighlight()} block`}></li>
                })
            }
        </ul>
    )
}

export default Column;