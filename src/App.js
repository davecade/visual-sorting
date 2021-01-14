import {React, Component } from 'react';
import './App.scss';
import Graph from './components/graph/graph.component'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        list: [1, 5, 16, 6, 10, 15, 13, 7, 11, 14, 5, 4 ,9, 8, 6 ,4, 3, 3, 7],
        pointer: 0,
        sortRunning: false
    }
  }

  bubbleSort = () => {
    if(!this.state.sortRunning) {
      let array = this.state.list
      let count = array.length-1
      let i = this.state.pointer;
      
      let started = setInterval(()=> {
        if(array[i]>array[i+1]) {
            let temp = array[i]
            array[i] = array[i+1]
            array[i+1] = temp
        }

        if(i===count) {
          i=0;
          count--;
        } else {
          i++
        }

        if(count<0) {
          this.setState({sortRunning: false})
          clearInterval(started)
        }

        this.setState({list: array, pointer: i, sortRunning: true})
      }, 50)
    }
  }


  render() {

    return (
      <div className="App">
        <h1 className="title">SORTING APP</h1>
        <Graph list={this.state.list} pointer={this.state.pointer} sortRunning={this.state.sortRunning} />
        <button className="sort-button" onClick={this.bubbleSort}>SORT</button>
      </div>
    )
  }
}

export default App;
