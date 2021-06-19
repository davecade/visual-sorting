import {React, Component } from 'react';
import { connect } from 'react-redux';
import { sound, playSortingSound, playFinishedSound } from '../sound-utils/sound'
import { 
    generateGraph,
    toggleSortRunning,
    updateGraph,
    updateLeftPointer
  } from '../Redux/sort/sort.actions'

class BubbleSort extends Component {
    constructor({stopClicked, ...props}) {
      super(props)
      this.state = {
        stopClicked: stopClicked,
        speed: 50
      }
    }

  componentWillReceiveProps({stopClicked}) {
    this.setState({...this.state, stopClicked})
  }

  runBubbleSort = () => {
    const { speed } = this.state
    const {
      list,
      updateGraph,
      graphGenerated,
      sortRunning,
      updateLeftPointer,
      toggleSortRunning,
      setStopClickedToFalse,
    } = this.props
    
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

        updateGraph(array);
        updateLeftPointer(i);

        if(count===0 || (finished===true && i===0) || this.state.stopClicked) {
          console.log("CLEARED")
          playFinishedSound()
          clearInterval(started)
          toggleSortRunning(false);
          setStopClickedToFalse()
        }

      }, speed)
    }
  }

  render() {
    return (
      <button className="button bubble" onClick={this.runBubbleSort}>BUBBLE SORT</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(BubbleSort);