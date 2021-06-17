import React from 'react'
import './graph.styles.scss'
import Column from '../column/column.component'
import { connect } from 'react-redux'

const Graph = ({list, pointer, rightPointer}) => {

    return (
        <div className="graph">  
            {
                list.map((item, index) => (
                    <Column
                        key={index}
                        currentIndex={index}
                        number={item}
                        pointer={pointer}
                        rightPointer={rightPointer}
                    />
                ))
            }
        </div>
    )
}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps)(Graph);