import {useEffect, useState } from 'react'

const width = 8
const candyColors = [
  'blue', 
  'green',
  'orange',
  'purple', 
  'red', 
  'yellow'
]


const App = () => {
  const [currentColorArrangemnt, setCurrentColorArrangement] = useState([])

  const checkForColumnOfThree = () => {
    for(let i=0; i< 47; i++){ //the 47 represents the 47th square in the grid
      const columnOfThree = [i, i + width, i + width * 2] 
      const decidedColor = currentColorArrangemnt[i];

      if(columnOfThree.every(square => currentColorArrangemnt[square] === decidedColor)){ //this is comparing the three squares in the column is the same as the first square => returning a boolean
        columnOfThree.forEach(square => currentColorArrangemnt[square] = '') //if the colors are a match, then replace the squares with an empty string
      }
    }
  }


  const createBoard = () => {
    const randomColorArrangement = []
    for(let i=0; i < width * width; i++){
      const randomNumberFrom0to5 = Math.floor(Math.random() * candyColors.length)
      const randomColor = candyColors[randomNumberFrom0to5]
      randomColorArrangement.push(randomColor)
    }
    setCurrentColorArrangement(randomColorArrangement)
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree()
      setCurrentColorArrangement([...currentColorArrangemnt]) //the three dots expands an array into individual elements and putting it back into the array
    }, 100)
    return () => clearInterval(timer)
    

  }, [checkForColumnOfThree, currentColorArrangemnt])
  
  console.log(currentColorArrangemnt)

  return (
    <div className="App">
      <div className="game">
        {currentColorArrangemnt.map((candyColor, index) => (
          <img 
            key={index}
            style={{backgroundColor: candyColor}}
            alt={candyColor}
          ></img>
        ))}
      </div>
    </div>
  )
}

export default App;
