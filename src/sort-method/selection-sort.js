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

class SelectionSort extends Component {
    constructor(props) {
      super(props)
      this.state = {
        speed: 50
      }
    }


  runSelectionSort = () => {
    const { speed } = this.state
    const {
      list,
      updateGraph,
      graphGenerated,
      sortRunning,
      updateLeftPointer,
      toggleSortRunning,
      stopSorting,
      checkIfSorted
    } = this.props
    
    if(!sortRunning && graphGenerated) {
        toggleSortRunning(true);
        playSortingSound()
        let array = list
        let smallestNumIdx = 0;
        let startingIdx = 0;
        let currentIdx
        let iterated = true;
        let readyToSwap = false
        let sorted = checkIfSorted()

        if(!sorted) {

            let started = setInterval(()=> {
                if(sound.sorting.currentTime === sound.sorting.duration) {
                    playSortingSound()
                }

                if(iterated===true) {
                    currentIdx = startingIdx
                    smallestNumIdx = startingIdx
                    iterated = false
                }

                if(currentIdx === startingIdx) {
                    currentIdx++
                } else {
                  if(currentIdx < array.length) {
                  
                      if(array[currentIdx] < array[smallestNumIdx]) {
                      smallestNumIdx = currentIdx
                      }
                      currentIdx++;

                  } else {
                      
                      if(readyToSwap) {
                      let temp = array[startingIdx];
                      array[startingIdx] = array[smallestNumIdx];
                      array[smallestNumIdx] = temp;
                      startingIdx++;
                      iterated = true
                      readyToSwap = false
                      } else {

                      readyToSwap = true
                      }
                      
                  }
                }

                updateGraph(array);
                updateLeftPointer(currentIdx);
                
                if(startingIdx===array.length || sorted || this.props.stopButtonClicked) {
                    playFinishedSound()
                    clearInterval(started)
                    toggleSortRunning(false);
                    stopSorting(false)
                }
            }, speed)
        }

    }
  }

  render() {
    return (
        <button className="button selection" onClick={this.runSelectionSort}>SELECTION SORT</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectionSort);