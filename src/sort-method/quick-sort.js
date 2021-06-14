// quickSort = () => {
//     if(!this.state.sortRunning && this.state.graphGenerated) {
//         this.playSortingSound();
//         console.log("Started")
//         let sorted = this.checkSorted()
//         let array = this.state.list
//         let temp = null;
//         let pivot = 0;
//         let left = pivot+1;
//         let right = array.length-1
//         let swapped = false
//         let nullArray = array.map(item => item)
//         let countLeftRightArray = 0

//         //-- Need iterative quick sort
//         if(!sorted) {
//           let started = setInterval(()=>{
//               if(right >= left) {


//                   if((array[left] > array[pivot]) && (array[right] < array[pivot])) {
//                       temp = array[left]
//                       array[left] = array[right];
//                       array[right] = temp
//                       this.setState({list: array, pointer: left, rightPointer: right, sortRunning: true})
//                   } else {
      
//                       if(array[left] <= array[pivot]) {
//                           left++
//                           this.setState({pointer: left, rightIndex: right, sortRunning: true})
                          
//                       }
                      
//                       if(array[right] >= array[pivot]) {
//                           right--
//                           this.setState({pointer: left, rightIndex: right, sortRunning: true})
//                       }
//                   }
//               } else {
//                   temp = array[pivot]
//                   array[pivot] = array[right]
//                   array[right] = temp
//                   swapped=true
//                   this.setState({list: array, pointer: left, rightPointer: right, sortRunning: true})
//               }

//               if(swapped) {
//                 swapped = false
//                 let data = []
//               }


//               if(sorted === true || this.state.stopClicked === true) {
//                   this.playFinishedSound();
//                   clearInterval(started)
//                   this.setState({sortRunning: false, stopClicked: false})
//               }
//           }, 50)
//         }
//     }
//   }