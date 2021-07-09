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