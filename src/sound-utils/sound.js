export const sound = {
    sorting: new Audio('https://raw.githubusercontent.com/davecade/sort-algorithm-display/master/src/media/laser.mp3'),
    finished: new Audio('https://raw.githubusercontent.com/davecade/sort-algorithm-display/master/src/media/ding.mp3')
}


export const playSortingSound = () => {
    sound.sorting.volume = 0.3
    sound.finished.pause()
    sound.finished.currentTime = 0
    sound.sorting.play()
  }

export const playFinishedSound = () => {
    sound.sorting.pause()
    sound.sorting.currentTime = 0
    sound.finished.play()
  }