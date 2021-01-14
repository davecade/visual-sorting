import {React, Component } from 'react';
import './App.scss';
import Graph from './components/graph/graph.component'

class App extends Component {
  constructor(props) {
    super(props)
    // [1, 5, 16, 6, 10, 15, 13, 7, 11, 14, 5, 4 ,9, 8, 6 ,4, 3, 3, 7]
    this.state = {
        list: [1,2,3,4,5,6,7,2,9,10],
        pointer: 0,
        sortRunning: false
    }
  }

  bubbleSort = () => {
    if(!this.state.sortRunning) {
      let array = this.state.list
      let count = array.length-1
      let i = this.state.pointer;
      let finished = true
      
      let started = setInterval(()=> {
        if(array[i]>array[i+1]) {
            let temp = array[i]
            array[i] = array[i+1]
            array[i+1] = temp
            finished = false;
        }

        if(i===count) {
          i=0;
          count--;
        } else {
          i++
        }

        this.setState({list: array, pointer: i, sortRunning: true})

        if(count<0 || (finished===true && i===count)) {
          clearInterval(started)
          this.setState({sortRunning: false})
        }
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
