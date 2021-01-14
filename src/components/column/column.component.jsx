import React from 'react'
import './column.styles.scss'

const Column = ({number}) => {
    let count = new Array(number).fill(0)

    return (
        <ul className="column">
            {
                count.map(item => {
                    return <li className="block"></li>
                })
            }
        </ul>
    )
}

export default Column;