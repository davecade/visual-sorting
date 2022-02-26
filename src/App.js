import { React, Component } from "react";
import "./App.scss";
import Graph from "./components/graph/graph.component";
import BubbleSort from "./sort-method/bubble-sort";
import InsertionSort from "./sort-method/insertion-sort";
import SelectionSort from "./sort-method/selection-sort";
import QuickSort from "./sort-method/quick-sort";
import { connect } from "react-redux";
import {
    generateGraph,
    toggleSortRunning,
    updateLeftPointer,
    updateGraph,
    stopSorting,
} from "./Redux/sort/sort.actions";

//[9, 16, 17, 14, 2, 16, 10, 16, 5, 5, 8, 14, 15, 9, 11, 4, 16, 19, 0, 9, 5, 6, 10, 18, 17],

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: 1,
        };
    }

    componentDidMount() {
        const { generateGraph } = this.props;
        generateGraph();
    }

    stopSorting = () => {
        this.props.stopSorting(true);
        this.setState({ speed: 50 });
    };

    render() {
        const { generateGraph, sortRunning } = this.props;

        return (
            <div className="App">
                <h1 className="title">VISUAL SORTING</h1>
                <div className="buttons-container">
                    <BubbleSort />
                    <InsertionSort />
                    <SelectionSort />
                    <QuickSort />
                </div>
                <Graph />
                {sortRunning ? (
                    <button className="button stop" onClick={this.stopSorting}>
                        STOP
                    </button>
                ) : (
                    <button className="button generate" onClick={generateGraph}>
                        Generate Graph
                    </button>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.sort.list,
    sortRunning: state.sort.sortRunning,
    graphGenerated: state.sort.graphGenerated,
});

const mapDispatchToProps = (dispatch) => ({
    generateGraph: () => dispatch(generateGraph()),
    toggleSortRunning: (status) => dispatch(toggleSortRunning(status)),
    updateLeftPointer: (idx) => dispatch(updateLeftPointer(idx)),
    updateGraph: (array) => dispatch(updateGraph(array)),
    stopSorting: (status) => dispatch(stopSorting(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
