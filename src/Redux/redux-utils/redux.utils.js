export const createArray = () => {
    let size = 50;
    let result = [];

    for (let i = 0; i < size; i++) {
        let randomNum = Math.floor(Math.random() * 50) + 1;
        while (result.includes(randomNum)) {
            randomNum = Math.floor(Math.random() * 50) + 1;
        }
        result.push(randomNum);
    }
    return result;
};
