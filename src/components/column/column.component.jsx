import React from 'react'
import './column.styles.scss'

const Column = ({number}) => {

    let blocks = new Array(number).fill(1)

    console.log(blocks)

    return (
        <div className="column" >
            {blocks}
        </div>
    )
}

export default Column;