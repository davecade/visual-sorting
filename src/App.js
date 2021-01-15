import {React, Component } from 'react';
import './App.scss';
import Graph from './components/graph/graph.component'

class App extends Component {
  constructor(props) {
    super(props)
    // [1, 5, 16, 6, 10, 15, 13, 7, 11, 14, 5, 4 ,9, 8, 6 ,4, 3, 3, 7]
    // [1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,20,19]
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
      let i = 0;
      let finished
      
      let started = setInterval(()=> {
        
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

        this.setState({list: array, pointer: i, sortRunning: true})


        if(count===0 || (finished===true && i===0)) {
          console.log("CLEARED")
          clearInterval(started)
          this.setState({sortRunning: false})
        }

      }, 40)


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
