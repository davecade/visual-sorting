import React from 'react'
import './graph.styles.scss'
import Column from '../column/column.component'

const Graph = ({list}) => {


    return (
        <div className="graph">  
            {
                list.map((number, index) => (
                    <div className="block">
                        <Column key={index} number={number} />
                    </div>
                ))
            }         
        </div>
    )
}

export default Graph;