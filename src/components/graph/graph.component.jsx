import React from 'react'
import './graph.styles.scss'
import Column from '../column/column.component'

const Graph = ({list, pointer, sortRunning}) => {

    return (
        <div className="graph">  
            {
                list.map((item, index) => (
                    <Column
                        key={index}
                        currentIndex={index}
                        number={item}
                        pointer={pointer}
                        sortRunning={sortRunning}
                    />
                ))
            }
        </div>
    )
}

export default Graph;