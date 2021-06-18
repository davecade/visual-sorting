import { connect } from 'react-redux';
import { sound, playSortingSound, playFinishedSound } from '../data/sound'
import { 
    generateGraph,
    toggleSortRunning,
    updateGraph,
    updateLeftPointer,
  } from '../Redux/sort/sort.actions'

const BubbleSort = ({stopClicked, setStopClickedToFalse, list, updateGraph, graphGenerated, sortRunning, updateLeftPointer, toggleSortRunning}) => {

  const bubbleSortAlgo = () => {

    if(!sortRunning && graphGenerated) {
      toggleSortRunning(true);
      playSortingSound()

      let array = list
      let count = array.length-1
      let i = 0;
      let finished
      
      
      let started = setInterval(()=> {

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
        console.log("STOP HERE: ", stopClicked)
        updateGraph(array);
        updateLeftPointer(i);

        if(count===0 || (finished===true && i===0) || stopClicked) {
          console.log("CLEARED")
          playFinishedSound()
          clearInterval(started)
          
          toggleSortRunning(false);
          setStopClickedToFalse()
        }

      }, 50)
    }
  }


  const bubbleSortAlgo2 = async () => {
      const timer = ms => new Promise(res => setTimeout(res, ms))
      let finished = false
      let counter = 0
      let array = list

      if(!sortRunning && graphGenerated) {
        toggleSortRunning(true);
        playSortingSound()

        while(!finished) {
          finished = true
          for(let i=0; i<array.length-1-counter; i++) {
            if(array[i]>array[i+1]) {
              let temp = array[i]
              array[i] = array[i+1]
              array[i+1] = temp
              finished = false
              await timer(50)
              updateGraph(array);
              updateLeftPointer(i+1);
            }
          }
          counter++;
        }
      }

        console.log("CLEARED")
        playFinishedSound()
        toggleSortRunning(false);
        setStopClickedToFalse()
  
  }

    return <button className="button bubble" onClick={bubbleSortAlgo2}>BUBBLE SORT</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(BubbleSort);