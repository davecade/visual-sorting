import React from 'react'
import './column.styles.scss'
import Block from '../block/block.component'

const Column = ({number, currentIndex}) => {
    let columns = new Array(number).fill(0)

    return (
        <ul className="column" >
            {
                columns.map((item, index) => (
                    <Block
                        key={index}
                        currentIndex={currentIndex}
                    />
                ))
            }
        </ul>
    )
}

export default Column;