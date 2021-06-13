import {React, Component } from 'react';
import './App.scss';
import Graph from './components/graph/graph.component'
import { sound } from './data/sound'

//[9, 16, 17, 14, 2, 16, 10, 16, 5, 5, 8, 14, 15, 9, 11, 4, 16, 19, 0, 9, 5, 6, 10, 18, 17],

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        list: [],
        pointer: 0,
        sortRunning: false,
        graphGenerated: false,
        stopClicked: false,
        rightPointer: null
    }
  }

  generateArray = () => {
    let size = 25
    let result = []
    
    for(let i= 0; i<size; i++) result.push(Math.floor(Math.random() * 20)+1)

    this.setState({list: result, graphGenerated: true})
  }

  playSortingSound = () => {
    sound.finished.pause()
    sound.finished.currentTime = 0
    sound.sorting.play()
  }

  playFinishedSound = () => {
    sound.sorting.pause()
    sound.sorting.currentTime = 0
    sound.finished.play()
  }

  bubbleSort = () => {

    if(!this.state.sortRunning && this.state.graphGenerated) {
      this.playSortingSound()

      let array = this.state.list
      let count = array.length-1
      let i = 0;
      let finished
      
      
      let started = setInterval(()=> {

        if(sound.sorting.currentTime === sound.sorting.duration) {
          sound.sorting.play()
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

        this.setState({list: array, pointer: i, sortRunning: true})


        if(count===0 || (finished===true && i===0) || this.state.stopClicked === true) {
          console.log("CLEARED")
          this.playFinishedSound()
          clearInterval(started)
          this.setState({sortRunning: false, stopClicked: false})
        }

      }, 50)
    }
  }

  insertionSort = () => {


    if(!this.state.sortRunning && this.state.graphGenerated) {
      this.playSortingSound();

      let array = this.state.list
      let i = 0
      let currentIdx = 0
      let timeToIterate = true
      
      let started = setInterval(()=> {
        if(sound.sorting.currentTime === sound.sorting.duration) {
          sound.sorting.play()
        }

        if(array.length>1) {
          
          if(timeToIterate) {
            i++;
            currentIdx=i;
            timeToIterate=false
          }

          if(currentIdx > 0 && (array[currentIdx] < array[currentIdx-1])) {
            let temp = array[currentIdx]
            array[currentIdx] = array[currentIdx-1]
            array[currentIdx-1] = temp
            currentIdx--;
          } else {
            timeToIterate = true
          }
        }
        this.setState({list: array, pointer: currentIdx, sortRunning: true})
        

        if(array.length===1 || i===array.length || this.state.stopClicked === true) {
          console.log("CLEARED")
          this.playFinishedSound();
          clearInterval(started)
          this.setState({sortRunning: false, stopClicked: false})
        }

      }, 50)

    }

  }

  selectionSort = () => {
    if(!this.state.sortRunning && this.state.graphGenerated) {
      this.playSortingSound();
      console.log("Started")
      let array = this.state.list
      let smallestNumIdx = 0;
      let startingIdx = 0;
      let currentIdx
      let iterated = true;
      let readyToSwap = false
      let sorted = this.checkSorted()

      if(!sorted) {
        let started = setInterval(()=> {
          if(sound.sorting.currentTime === sound.sorting.duration) {
            sound.sorting.play()
          }

          if(iterated===true) {
            currentIdx = startingIdx
            smallestNumIdx = startingIdx
            iterated = false
          }
  
          if(currentIdx === startingIdx) {
            this.setState({list: array, pointer: currentIdx, sortRunning: true})
            currentIdx++
          } else {
            if(currentIdx < array.length) {
            
              if(array[currentIdx] < array[smallestNumIdx]) {
                smallestNumIdx = currentIdx
              }
              this.setState({list: array, pointer: currentIdx, sortRunning: true})
              currentIdx++;
            } else {
              
              if(readyToSwap) {
                let temp = array[startingIdx];
                array[startingIdx] = array[smallestNumIdx];
                array[smallestNumIdx] = temp;
                startingIdx++;
                iterated = true
                this.setState({list: array, pointer: startingIdx-1, sortRunning: true})
                readyToSwap = false
              } else {
                this.setState({list: array, pointer: smallestNumIdx, sortRunning: true})
                readyToSwap = true
              }
              
            }
          }
          
          if(startingIdx===array.length || sorted === true || this.state.stopClicked === true) {
            this.playFinishedSound();
            clearInterval(started)
            this.setState({sortRunning: false, stopClicked: false})
          }
        }, 50)
      }

    }
  }

  quickSort = () => {
    if(!this.state.sortRunning && this.state.graphGenerated) {
        this.playSortingSound();
        console.log("Started")
        let sorted = this.checkSorted()
        let array = this.state.list
        let temp = null;
        let pivot = 0;
        let left = pivot+1;
        let right = array.length-1
        let swapped = false

        //-- Need iterative quick sort
        if(!sorted) {
          let started = setInterval(()=>{
              if(right >= left) {

                  if((array[left] > array[pivot]) && (array[right] < array[pivot])) {
                      temp = array[left]
                      array[left] = array[right];
                      array[right] = temp
                      swapped = true
                  } else {
      
                      if(array[left] <= array[pivot]) {
                          left++
                          this.setState({pointer: left, sortRunning: true})
                          
                      }
                      
                      if(array[right] >= array[pivot]) {
                          right--
                          this.setState({pointer: right, rightIndex: right, sortRunning: true})
                      }
                  }
              } else {
                  temp = array[pivot]
                  array[pivot] = array[right]
                  array[right] = temp
                  this.setState({list: array, pointer: left, rightPointer: right, sortRunning: true})
              }


              if(swapped) {
                //Split arrays
                let leftArray = array.slice(0,right)
                let rightArray = array.slice(right+1)

                if((leftArray.length>0) && (rightArray.length>0)) {
			
                    if(leftArray.length<rightArray.length) {
                      //Do left first
                      leftArray = quickSort(leftArray)
                      rightArray = quickSort(rightArray)
                    } else {
                      //Do right first
                      rightArray = quickSort(rightArray)
                      leftArray = quickSort(leftArray)
                    }
                  return [...leftArray, array[right], ...rightArray]
                }
              }


              if(sorted === true || this.state.stopClicked === true) {
                  this.playFinishedSound();
                  clearInterval(started)
                  this.setState({sortRunning: false, stopClicked: false})
              }
          }, 50)
        }
    }
  }

  
  checkSorted = () => {
    let array = this.state.list
    let current = 0

    for(let i = 0; i < array.length-1; i++) {
      if(array[i] > array[i+1]) {
        return false
      }
    }

    let started = setInterval(()=> {
      current++
      this.setState({list: array, pointer: current, sortRunning: true})

      if(current===array.length) {
        this.playFinishedSound();
        clearInterval(started)
        this.setState({sortRunning: false})
      }
    }, 50)
    return true
  }

  stopButton = () => {
    this.setState({stopClicked: true, rightPointer: null})
  }


  render() {

    return (
      <div className="App">
        <h1 className="title">VISUAL SORTING</h1>
        <button className="button bubble" onClick={this.bubbleSort}>BUBBLE SORT</button>
        <button className="button insertion" onClick={this.insertionSort}>INSERTION SORT</button>
        <button className="button selection" onClick={this.selectionSort}>SELECTION SORT</button>
        <button className="button quick" onClick={this.quickSort}>QUICK SORT</button>
        <Graph list={this.state.list} pointer={this.state.pointer} rightPointer={this.state.rightPointer} rightIndex={this.state.rightIndex} sortRunning={this.state.sortRunning} />
        {
          this.state.sortRunning ? <button className="button stop" onClick={this.stopButton}>STOP</button>
          :
          <button className="button generate" onClick={this.generateArray}>Generate Graph</button>
        } 
      </div>
    )
  }
}

export default App;
