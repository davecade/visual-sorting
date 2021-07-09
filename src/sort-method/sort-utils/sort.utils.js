//import { playSortingSound, playFinishedSound } from './sound-utils/sound'

// export const checkIfSorted = () => {
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