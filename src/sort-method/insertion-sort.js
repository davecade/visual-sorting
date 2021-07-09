import {React, Component } from 'react';
import { connect } from 'react-redux';
import { sound, playSortingSound, playFinishedSound } from '../sound-utils/sound'
import { 
    generateGraph,
    toggleSortRunning,
    updateGraph,
    updateLeftPointer,
    stopSorting
  } from '../Redux/sort/sort.actions'

class InsertionSort extends Component {
    constructor(props) {
      super(props)
      this.state = {
        speed: 50
      }
    }


  runInsertionSort = () => {
    const { speed } = this.state
    const {
        list,
        updateGraph,
        graphGenerated,
        sortRunning,
        updateLeftPointer,
        toggleSortRunning,
        stopSorting,
      } = this.props

    if(!sortRunning && graphGenerated) {
        toggleSortRunning(true);
        playSortingSound()

        let array = list
        let i = 0
        let currentIdx = 0
        let timeToIterate = true
        
        let started = setInterval(()=> {
            if(sound.sorting.currentTime === sound.sorting.duration) {
                playSortingSound();
            }

            if(array.length>1) {
            
            if(timeToIterate) {
                i++;
                currentIdx=i;
                timeToIterate=false
            }

            if(currentIdx > 0 && (array[currentIdx] < array[currentIdx-1])) {
                let temp = array[currentIdx]
                array[currentIdx] = array[currentIdx-1]
                array[currentIdx-1] = temp
                currentIdx--;
            } else {
                timeToIterate = true
            }
            }
            updateGraph(array);
            updateLeftPointer(currentIdx);
            

            if(array.length===1 || i===array.length || this.props.stopButtonClicked) {
                playFinishedSound()
                clearInterval(started)
                toggleSortRunning(false);
                stopSorting(false)
            }

        }, speed)

    }

  }


  

  render() {
    return (
        <button className="button insertion" onClick={this.runInsertionSort}>INSERTION SORT</button>
    )
  }

}


const mapStateToProps = state => ({
    list: state.sort.list,
    graphGenerated: state.sort.graphGenerated,
    sortRunning: state.sort.sortRunning,
    leftPointer: state.sort.leftPointer,
    stopButtonClicked: state.sort.stopButtonClicked
})

const mapDispatchToProps = dispatch => ({
    generateGraph: () => dispatch(generateGraph()),
    updateGraph: array => dispatch(updateGraph(array)),
    toggleSortRunning: status => dispatch(toggleSortRunning(status)),
    updateLeftPointer: idx => dispatch(updateLeftPointer(idx)),
    stopSorting: status => dispatch(stopSorting(status))
})

export default connect(mapStateToProps, mapDispatchToProps)(InsertionSort);