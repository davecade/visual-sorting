import { React, Component } from "react";
import { connect } from "react-redux";
import {
    sound,
    playSortingSound,
    playFinishedSound,
} from "../sound-utils/sound";
import {
    generateGraph,
    toggleSortRunning,
    updateGraph,
    updateLeftPointer,
    updateRightPointer,
    stopSorting,
} from "../Redux/sort/sort.actions";

class QuickSort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: 0,
        };
    }

    updateState = (array, left, right) => {
        const { updateGraph, updateLeftPointer, updateRightPointer } =
            this.props;

        updateGraph(array);
        updateLeftPointer(left);
        updateRightPointer(right);
    };

    runQuickSort = async () => {
        const {
            list,
            updateGraph,
            graphGenerated,
            sortRunning,
            updateRightPointer,
            toggleSortRunning,
            stopSorting,
        } = this.props;

        if (!sortRunning && graphGenerated) {
            toggleSortRunning(true);
            playSortingSound();
            let array = list;

            await this.quickSortHelper(array, 0, array.length - 1);
            updateGraph(array);
            let sorted = true;

            if (sorted || this.props.stopButtonClicked) {
                playFinishedSound();
                updateRightPointer(null);
                toggleSortRunning(false);
                stopSorting(false);
            }
        }
    };

    swap = async (i, j, array) => {
        const timer = (ms) => new Promise((res) => setTimeout(res, ms));
        const { speed } = this.state;

        if (sound.sorting.currentTime === sound.sorting.duration) {
            playSortingSound();
        }

        let temp = array[j];
        array[j] = array[i];
        this.updateState(array, i, j);

        await timer(speed);
        if (this.props.stopButtonClicked) return;
        array[i] = temp;
        this.updateState(array, i, j);

        await timer(speed);
        if (this.props.stopButtonClicked) return;
    };

    quickSortHelper = async (array, startIdx, endIdx) => {
        const timer = (ms) => new Promise((res) => setTimeout(res, ms));
        const { speed } = this.state;

        if (startIdx >= endIdx) return;
        const pivotIdx = startIdx;
        let leftIdx = startIdx + 1;
        let rightIdx = endIdx;
        this.updateState(array, leftIdx, rightIdx);
        await timer(speed);
        if (this.props.stopButtonClicked) return;

        while (rightIdx >= leftIdx) {
            if (sound.sorting.currentTime === sound.sorting.duration) {
                playSortingSound();
            }

            if (this.props.stopButtonClicked) return;
            if (
                array[leftIdx] > array[pivotIdx] &&
                array[rightIdx] < array[pivotIdx]
            ) {
                if (this.props.stopButtonClicked) return;
                this.swap(leftIdx, rightIdx, array);
            }

            if (array[leftIdx] <= array[pivotIdx]) leftIdx++;
            this.updateState(array, leftIdx, rightIdx);
            await timer(speed);
            if (this.props.stopButtonClicked) return;

            if (array[rightIdx] >= array[pivotIdx]) rightIdx--;
            this.updateState(array, leftIdx, rightIdx);
            await timer(speed);
            if (this.props.stopButtonClicked) return;
        }
        this.swap(pivotIdx, rightIdx, array);
        const leftSubarrayIsSmaller =
            rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);
        if (leftSubarrayIsSmaller) {
            await this.quickSortHelper(array, startIdx, rightIdx - 1);
            if (this.props.stopButtonClicked) return;

            this.updateState(array, leftIdx, rightIdx);
            await timer(speed);

            if (this.props.stopButtonClicked) return;

            await this.quickSortHelper(array, rightIdx + 1, endIdx);
            if (this.props.stopButtonClicked) return;
            this.updateState(array, leftIdx, rightIdx);
            await timer(speed);
            if (this.props.stopButtonClicked) return;
        } else {
            await this.quickSortHelper(array, rightIdx + 1, endIdx);
            if (this.props.stopButtonClicked) return;
            this.updateState(array, leftIdx, rightIdx);
            await timer(speed);

            await this.quickSortHelper(array, startIdx, rightIdx - 1);
            if (this.props.stopButtonClicked) return;
            this.updateState(array, leftIdx, rightIdx);
            await timer(speed);
            if (this.props.stopButtonClicked) return;
        }
    };

    render() {
        return (
            <button className="button quick" onClick={this.runQuickSort}>
                QUICK SORT
            </button>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.sort.list,
    graphGenerated: state.sort.graphGenerated,
    sortRunning: state.sort.sortRunning,
    leftPointer: state.sort.leftPointer,
    rightPointer: state.sort.rightPointer,
    stopButtonClicked: state.sort.stopButtonClicked,
});

const mapDispatchToProps = (dispatch) => ({
    generateGraph: () => dispatch(generateGraph()),
    updateGraph: (array) => dispatch(updateGraph(array)),
    toggleSortRunning: (status) => dispatch(toggleSortRunning(status)),
    updateLeftPointer: (idx) => dispatch(updateLeftPointer(idx)),
    updateRightPointer: (idx) => dispatch(updateRightPointer(idx)),
    stopSorting: (status) => dispatch(stopSorting(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickSort);
