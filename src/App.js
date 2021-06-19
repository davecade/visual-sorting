import {React, Component } from 'react';
import './App.scss';
import Graph from './components/graph/graph.component'
import BubbleSort from './sort-method/bubble-sort'
import InsertionSort from './sort-method/insertion-sort'
import SelectionSort from './sort-method/selection-sort';
import QuickSort from './sort-method/quick-sort';
import { connect } from 'react-redux'
import { playSortingSound, playFinishedSound } from './sound-utils/sound'
import {
  generateGraph,
  toggleSortRunning,
  updateLeftPointer,
  updateGraph
} from './Redux/sort/sort.actions'

//[9, 16, 17, 14, 2, 16, 10, 16, 5, 5, 8, 14, 15, 9, 11, 4, 16, 19, 0, 9, 5, 6, 10, 18, 17],

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stopClicked: false
    }
  }

  checkSorted = () => {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    const { list } = this.props
    let array = list
    let current = 0

    for(let i = 0; i < array.length-1; i++) {
      if(array[i] > array[i+1]) {
        return false
      }
    }

    toggleSortRunning(true)
    playSortingSound()

    let started = setInterval(()=> {
      current++
      updateLeftPointer(current)
      updateGraph(array)

      if(current===array.length) {
        playFinishedSound()
        clearInterval(started)
        toggleSortRunning(false)
        this.setStopClickedToFalse()
      }
    }, 50)
    return true
  }

  stopButton = () => {
    this.setState({stopClicked: true})
  }

  setStopClickedToFalse = () => {
    this.setState({stopClicked: false})
  }


  render() {

    const { generateGraph, sortRunning } = this.props

    return (
      <div className="App">
        <h1 className="title">VISUAL SORTING</h1>
        <BubbleSort stopClicked={this.state.stopClicked} setStopClickedToFalse={this.setStopClickedToFalse}/>
        <InsertionSort stopClicked={this.state.stopClicked} setStopClickedToFalse={this.setStopClickedToFalse}/>
        <SelectionSort stopClicked={this.state.stopClicked} setStopClickedToFalse={this.setStopClickedToFalse} checkSorted={this.checkSorted}/>
        <QuickSort stopClicked={this.state.stopClicked} setStopClickedToFalse={this.setStopClickedToFalse} checkSorted={this.checkSorted}/>
        <Graph rightPointer={this.state.rightPointer} />
        {
          sortRunning ? <button className="button stop" onClick={this.stopButton}>STOP</button>
          :
          <button className="button generate" onClick={generateGraph}>Generate Graph</button>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.sort.list,
  sortRunning: state.sort.sortRunning,
})

const mapDispatchToProps = dispatch => ({
  generateGraph: () => dispatch(generateGraph()),
  toggleSortRunning: status => dispatch(toggleSortRunning(status)),
  updateLeftPointer: idx => dispatch(updateLeftPointer(idx)),
  updateGraph: array => dispatch(updateGraph(array)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
