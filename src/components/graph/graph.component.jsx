import React from 'react'
import './graph.styles.scss'
import Column from '../column/column.component'

const Graph = ({list}) => {

    return (
        <div className="graph">  
            {
                list.map(item => (
                    <Column number={item} />
                ))
            }
        </div>
    )
}

export default Graph;