import {React, Component } from 'react';
import { connect } from 'react-redux';
import { sound, playSortingSound, playFinishedSound } from '../data/sound'
import { 
    generateGraph,
    toggleSortRunning,
    updateGraph,
    updateLeftPointer
  } from '../Redux/sort/sort.actions'

class SelectionSort extends Component {
    constructor({stopClicked, ...props}) {
      super(props)
      this.state = {
        stopClicked: stopClicked
      }
    }

  componentWillReceiveProps({stopClicked}) {
    this.setState({...this.state, stopClicked})
  }


  selectionSortAlgo = () => {
    const {
      list,
      updateGraph,
      graphGenerated,
      sortRunning,
      updateLeftPointer,
      toggleSortRunning,
      setStopClickedToFalse,
      checkSorted
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
        let sorted = checkSorted()

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
                    updateGraph(array);
                    updateLeftPointer(startingIdx);
                } else {
                if(currentIdx < array.length) {
                
                    if(array[currentIdx] < array[smallestNumIdx]) {
                    smallestNumIdx = currentIdx
                    }

                    currentIdx++;
                    updateGraph(array);
                    updateLeftPointer(currentIdx);
                } else {
                    
                    if(readyToSwap) {
                    let temp = array[startingIdx];
                    array[startingIdx] = array[smallestNumIdx];
                    array[smallestNumIdx] = temp;
                    startingIdx++;
                    iterated = true
                    updateGraph(array);
                    updateLeftPointer(startingIdx);
                    readyToSwap = false
                    } else {
                    updateGraph(array);
                    updateLeftPointer(currentIdx);
                    readyToSwap = true
                    }
                    
                }
                }
                
                if(startingIdx===array.length || sorted || this.state.stopClicked) {
                    playFinishedSound()
                    clearInterval(started)
                    toggleSortRunning(false);
                    setStopClickedToFalse()
                }
            }, 50)
        }

    }
  }

  render() {
    return (
        <button className="button selection" onClick={this.selectionSortAlgo}>SELECTION SORT</button>
    )
  }

}


const mapStateToProps = state => ({
    list: state.sort.list,
    graphGenerated: state.sort.graphGenerated,
    sortRunning: state.sort.sortRunning,
    leftPointer: state.sort.leftPointer,
})

const mapDispatchToProps = dispatch => ({
    generateGraph: () => dispatch(generateGraph()),
    updateGraph: array => dispatch(updateGraph(array)),
    toggleSortRunning: status => dispatch(toggleSortRunning(status)),
    updateLeftPointer: idx => dispatch(updateLeftPointer(idx)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectionSort);