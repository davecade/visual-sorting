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
    let result = [8, 5, 2, 9 ,5, 6, 3]
    
    //for(let i= 0; i<size; i++) result.push(Math.floor(Math.random() * 20)+1)

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

  quickSort_proto = () => {
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
        let nullArray = array.map(item => item)
        let countLeftRightArray = 0

        //-- Need iterative quick sort
        if(!sorted) {
          let started = setInterval(()=>{
              if(right >= left) {


                  if((array[left] > array[pivot]) && (array[right] < array[pivot])) {
                      temp = array[left]
                      array[left] = array[right];
                      array[right] = temp
                      this.setState({list: array, pointer: left, rightPointer: right, sortRunning: true})
                  } else {
      
                      if(array[left] <= array[pivot]) {
                          left++
                          this.setState({pointer: left, rightIndex: right, sortRunning: true})
                          
                      }
                      
                      if(array[right] >= array[pivot]) {
                          right--
                          this.setState({pointer: left, rightIndex: right, sortRunning: true})
                      }
                  }
              } else {
                  temp = array[pivot]
                  array[pivot] = array[right]
                  array[right] = temp
                  swapped=true
                  this.setState({list: array, pointer: left, rightPointer: right, sortRunning: true})
              }

              if(swapped) {
                swapped = false
                let data = []
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

  quickSort = () => {
    if(!this.state.sortRunning && this.state.graphGenerated) {
      this.playSortingSound();

      let sorted = this.checkSorted()
      let data = []
      let array = this.state.list
      let sortedArray = this.quickSortRecursive(array, [], 0, 0, 0, data=[])
      //data = data.filter(item => item!==null)
      console.log("Array: ", array)
      console.log("Sorted: ", sortedArray)
      console.log("DATA: ", data)
      let dataCounter = 0
      let pivot = data[dataCounter][0]
      let left = data[dataCounter][1]
      let right = data[dataCounter][2]
      let temp
      let swapped

      if(!sorted) {
        let started = setInterval(()=>{
          if(right >= left) {
            if((array[left] > array[pivot]) && (array[right] < array[pivot])) {
                temp = array[left]
                array[left] = array[right];
                array[right] = temp
                this.setState({list: array, pointer: left, rightPointer: right, sortRunning: true})
            } else {

                if(array[left] <= array[pivot]) {
                    left++
                    this.setState({pointer: left, rightIndex: right, sortRunning: true})
                    
                }
                
                if(array[right] >= array[pivot]) {
                    right--
                    this.setState({pointer: left, rightIndex: right, sortRunning: true})
                }
            }
        } else {
            temp = array[pivot]
            array[pivot] = array[right]
            array[right] = temp
            swapped=true
            this.setState({list: array, pointer: left, rightPointer: right, sortRunning: true})
        }

        if(swapped) {
          swapped=false
          if(dataCounter < data.length-1) {
            dataCounter++
            
            try {
              pivot = data[dataCounter][0]
              left = data[dataCounter][1]
              right = data[dataCounter][2]
            } catch(error) {
              console.log(error)
            }

          } else {
            sorted = true
          }
        }

          if(sorted === true || this.state.stopClicked === true) {
            this.playFinishedSound();
            clearInterval(started)
            this.setState({sortRunning: false, stopClicked: false})
          }
        }, 500)
      }
    }
  }

  splittingProcess = (array, nullArray, pivot) => {
      let leftArray = array.slice(0,pivot)
      let rightArray = array.slice(pivot+1)
      this.modifyNullArray(pivot, nullArray)
      let leftArrayData = this.findLeftArrayData(pivot, leftArray.length)
      let rightArrayData = this.findRightArrayData(pivot, rightArray.length)
      console.log("NULL ARRAY: ", nullArray)
      console.log("LEFT DATA ", leftArrayData)
      console.log("RIGHT DATA ", rightArrayData)
      return [leftArrayData, rightArrayData]
  }

  addNull = (array, start, end) => {
    let result = []
    for(let i = 0; i<array.length; i++) {
      if(i < start || i > end) {
        result.push(null)
      } else {
        result.push(array[i])
      }
    }
    console.log(result)
    return result
  }

  findLeftArrayData = (pivotIdx, size) => {
    if(size===0) {
      return null
    } else {
      let right = pivotIdx-1;
      let left = pivotIdx-(size-1);
      let pivot = pivotIdx-size;
      let data = [pivot, left, right]
      return data
    }
  }

  findRightArrayData = (pivotIdx, size) => {
    if(size===0) {
      return null
    } else {
      let pivot = pivotIdx+1;
      let left = pivotIdx+2;
      let right = pivotIdx + size;
      let data = [pivot, left, right]
      return data
    }
  }

  quickSortRecursive = (array, arrayWithNull=[], Dpivot=0, Dleft = Dpivot+1, Dright = array.length-1, data=[]) => {

    let temp = null
    let pivot = 0
    let left = pivot+1
    let right = array.length-1
    
    // Only start sorting if array length > 1
    if(array.length>1) {
      while(right >= left) {
  
        if((array[left] > array[pivot]) && (array[right] < array[pivot])) {
          temp = array[left]
          array[left] = array[right];
          array[right] = temp
        } else {
  
          if(array[left] <= array[pivot]) {
            left++
          }
          
          if(array[right] >= array[pivot]) {
            right--
          }
        }
      }
      
      //swap pivot number with right
      temp = array[pivot]
      array[pivot] = array[right]
      array[right] = temp


      
      //Split arrays
      let leftArray = array.slice(0,right)
      let rightArray = array.slice(right+1)
      let leftArraySize = leftArray.length
      let rightArraySize = rightArray.length
      let leftArrayWithNull = this.addNull(array,  right-leftArraySize, right-1)
      let rightArrayWithNull = this.addNull(array, right+1, right+rightArraySize)

      //-- Need to get thee data of the NULL array
      data.push(this.findLeftArrayData(right, leftArraySize))
      data.push(this.findRightArrayData(right, rightArraySize))

      //Check left sub array and right sub array exist
      if((leftArray.length>0) && (rightArray.length>0)) {
        
          if(leftArray.length<rightArray.length) {
            //Do left first
            leftArray = this.quickSortRecursive(leftArray, leftArrayWithNull, right, right-(leftArraySize-1), right-1, data)
            rightArray = this.quickSortRecursive(rightArray, rightArrayWithNull, right, right+2, right+ rightArraySize, data)
          } else {
            //Do right first
            rightArray = this.quickSortRecursive(rightArray, right, right+2, right+ rightArraySize, data)
            leftArray = this.quickSortRecursive(leftArray, right, right-(leftArraySize-1), right-1,  data)
          }
        return [...leftArray, array[right], ...rightArray]
      } else {
        if(leftArray.length > 0) {
          //Do left
          leftArray = this.quickSortRecursive(leftArray, leftArrayWithNull, right, right-(leftArraySize-1), right-1, data)
          return [...leftArray, array[right]]
        }
        
        if(rightArray.length > 0) {
          //Do right
          rightArray = this.quickSortRecursive(rightArray, rightArrayWithNull, right, right+2, right+ rightArraySize, data)
          return [array[right], ...rightArray]
        }
      }
    }
    
    //If array length is not > 1, then just return array
    return array

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
