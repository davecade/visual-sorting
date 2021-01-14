import {React, Component } from 'react';
import './App.scss';
import Graph from './components/graph/graph.component'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        list: [5, 3, 6, 7, 3, 2]
    }
  }

  render() {

    return (
      <div className="App">
        <h1 className="title">SORTING APP</h1>
        <Graph list={this.state.list} />
      </div>
    )
  }
}

export default App;
