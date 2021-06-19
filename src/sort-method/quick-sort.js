import {React, Component } from 'react';
import { connect } from 'react-redux';
import { sound, playSortingSound, playFinishedSound } from '../sound-utils/sound'
import { 
    generateGraph,
    toggleSortRunning,
    updateGraph,
    updateLeftPointer,
    updateRightPointer
  } from '../Redux/sort/sort.actions'

class QuickSort extends Component {
    constructor({stopClicked, ...props}) {
      super(props)
      this.state = {
        stopClicked: stopClicked,
        speed: 30
      }
    }

  componentWillReceiveProps({stopClicked}) {
    this.setState({...this.state, stopClicked})
  }

  updateState = (array, left, right) => {
    const {
      updateGraph,
      updateLeftPointer,
      updateRightPointer,
    } = this.props

    updateGraph(array);
    updateLeftPointer(left);
    updateRightPointer(right);
  }

  runQuickSort = async () => {
      const {
          list,
          updateGraph,
          graphGenerated,
          sortRunning,
          updateRightPointer,
          toggleSortRunning,
          setStopClickedToFalse,
          checkIfSorted
      } = this.props

      if(!sortRunning && graphGenerated) {
          toggleSortRunning(true);
          playSortingSound()
          let array = list
          let sorted = checkIfSorted()


          if(!sorted) {
              await this.quickSortHelper(array, 0, array.length-1)
              updateGraph(array);
              sorted=true

              if(sorted || this.state.stopClicked) {
                  playFinishedSound()
                  updateRightPointer(null)
                  toggleSortRunning(false);
                  setStopClickedToFalse()
              }
          }
      }
  }

  swap = async (i, j, array) => {
      const timer = ms => new Promise(res => setTimeout(res, ms))
      const { speed } = this.state

      if(sound.sorting.currentTime === sound.sorting.duration) {
          playSortingSound()
      }

      let temp = array[j];
      array[j] = array[i];
      this.updateState(array, i, j)

      await timer(speed);
      if(this.state.stopClicked) return
      array[i] = temp
      this.updateState(array, i, j)

      await timer(speed);
      if(this.state.stopClicked) return
  }

  quickSortHelper = async (array, startIdx, endIdx) => {
      const timer = ms => new Promise(res => setTimeout(res, ms))
      const { speed } = this.state

      if(startIdx >= endIdx) return;
      const pivotIdx = startIdx;
      let leftIdx = startIdx+1;
      let rightIdx = endIdx;
      this.updateState(array, leftIdx, rightIdx)
      await timer(speed);
      if(this.state.stopClicked) return

      while(rightIdx >= leftIdx) {

        if(sound.sorting.currentTime === sound.sorting.duration) {
            playSortingSound()
        }

        if(this.state.stopClicked) return
        if(array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
          if(this.state.stopClicked) return
          this.swap(leftIdx, rightIdx, array)
        }

        if(array[leftIdx] <= array[pivotIdx]) leftIdx++;
        this.updateState(array, leftIdx, rightIdx)
        await timer(speed);
        if(this.state.stopClicked) return

        if(array[rightIdx]>= array[pivotIdx]) rightIdx--;
        this.updateState(array, leftIdx, rightIdx)
        await timer(speed);
        if(this.state.stopClicked) return
      }
      this.swap(pivotIdx, rightIdx, array);
      const leftSubarrayIsSmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
      if(leftSubarrayIsSmaller) {
        await this.quickSortHelper(array, startIdx, rightIdx-1);
        if(this.state.stopClicked) return

        this.updateState(array, leftIdx, rightIdx)
        await timer(speed);

        if(this.state.stopClicked) return

        await this.quickSortHelper(array, rightIdx + 1, endIdx);
        if(this.state.stopClicked) return
        this.updateState(array, leftIdx, rightIdx)
        await timer(speed);
        if(this.state.stopClicked) return

      } else {
        await this.quickSortHelper(array, rightIdx+1, endIdx);
        if(this.state.stopClicked) return
        this.updateState(array, leftIdx, rightIdx)
        await timer(speed);

        await this.quickSortHelper(array, startIdx, rightIdx-1);
        if(this.state.stopClicked) return
        this.updateState(array, leftIdx, rightIdx)
        await timer(speed);
        if(this.state.stopClicked) return
      }
  }

  render() {
    return (
        <button className="button quick" onClick={this.runQuickSort}>QUICK SORT</button>
    )
  }

}


const mapStateToProps = state => ({
    list: state.sort.list,
    graphGenerated: state.sort.graphGenerated,
    sortRunning: state.sort.sortRunning,
    leftPointer: state.sort.leftPointer,
    rightPointer: state.sort.rightPointer
})

const mapDispatchToProps = dispatch => ({
    generateGraph: () => dispatch(generateGraph()),
    updateGraph: array => dispatch(updateGraph(array)),
    toggleSortRunning: status => dispatch(toggleSortRunning(status)),
    updateLeftPointer: idx => dispatch(updateLeftPointer(idx)),
    updateRightPointer: idx => dispatch(updateRightPointer(idx))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuickSort);