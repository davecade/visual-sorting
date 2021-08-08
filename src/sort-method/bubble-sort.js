import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sound, playSortingSound, playFinishedSound } from '../sound-utils/sound'
import { 
    generateGraph,
    toggleSortRunning,
    updateGraph,
    updateLeftPointer,
    stopSorting
  } from '../Redux/sort/sort.actions'

const BubbleSort = ({stopButtonClicked, list, updateGraph, graphGenerated, sortRunning, updateLeftPointer, toggleSortRunning, stopSorting} ) => {
  const [ speed ] = useState(50)
  const setClicked = useState(false)[1];
  
  useEffect(() => {
     setClicked(stopButtonClicked)
  }, [stopButtonClicked])

  const runBubbleSort = () => {
    
    if(!sortRunning && graphGenerated) {
      toggleSortRunning(true);
      playSortingSound()
      
      let array = list
      let count = array.length-1
      let i = 0;
      let finished
      let stopRunning

      let started = setInterval(()=> {
        
        setClicked(newState => {
          stopRunning = newState
          return newState
        })

        if(sound.sorting.currentTime === sound.sorting.duration) {
          playSortingSound()
        }
        
        if(i===0) {
          finished = true
        }
          
        if(array[i]>array[i+1]) {
            let temp = array[i]
            array[i] = array[i+1]
            array[i+1] = temp
            finished = false;
        }

        if(i===count-1) {
          i=0;
          count--;
        } else {
          i++
        }

        updateGraph(array);
        updateLeftPointer(i);
        
        if(count===0 || (finished===true && i===0) || stopRunning) {
          console.log("CLEARED")
          playFinishedSound()
          clearInterval(started)
          toggleSortRunning(false);
          stopSorting(false)
        }

      }, speed)
    }
  }

  return (
    <button className="button bubble" onClick={runBubbleSort}>BUBBLE SORT</button>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(BubbleSort);