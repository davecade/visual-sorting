// const bubbleSort = () => {

//     const { list, updateGraph, graphGenerated } = this.props

//     if(!this.state.sortRunning && graphGenerated) {
//       this.playSortingSound()

//       let array = list
//       let count = array.length-1
//       let i = 0;
//       let finished
      
      
//       let started = setInterval(()=> {

//         if(sound.sorting.currentTime === sound.sorting.duration) {
//           sound.sorting.play()
//         }
        
//         if(i===0) {
//           finished = true
//         }
          
//         if(array[i]>array[i+1]) {
//             let temp = array[i]
//             array[i] = array[i+1]
//             array[i+1] = temp
//             finished = false;
//         }

//         if(i===count-1) {
//           i=0;
//           count--;
//         } else {
//           i++
//         }

//         updateGraph(array)
//         this.setState({pointer: i, sortRunning: true})


//         if(count===0 || (finished===true && i===0) || this.state.stopClicked === true) {
//           console.log("CLEARED")
//           this.playFinishedSound()
//           clearInterval(started)
//           this.setState({sortRunning: false, stopClicked: false})
//         }

//       }, 50)
//     }
// }
// export default bubbleSort;