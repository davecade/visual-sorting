import { connect } from 'react-redux'

export const createArray = () => {
    let size = 25
    let result = []

    for(let i= 0; i<size; i++) {
      let randomNum = Math.floor(Math.random() * 25)+1
      while(result.includes(randomNum)) {
        randomNum = Math.floor(Math.random() * 25)+1
      }
      result.push(randomNum)
    }
    return result
}


// const checkIfSorted = () => {
//   const { speed } = this.state
//   const {
//     list,
//     sortRunning,
//     graphGenerated,
//     toggleSortRunning,
//     updateLeftPointer
//   } = this.props
//   let array = list
//   let current = 0
  

//   for(let i = 0; i < array.length-1; i++) {
//     if(array[i] > array[i+1]) {
//       return false
//     }
//   }

//   if(!sortRunning && graphGenerated) {
//     toggleSortRunning(true)
//     playSortingSound()

//     let started = setInterval(()=> {
//       current++
//       updateLeftPointer(current)
//       updateGraph(array)

//       if(current===array.length || this.state.stopClicked) {
//         playFinishedSound()
//         clearInterval(started)
//         toggleSortRunning(false)
//         this.setStopClickedToFalse()
//       }
//     }, speed)
//   }

//   return true
// }