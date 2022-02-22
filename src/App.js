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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfThree = () => {
    for(let i=0; i< 47; i++){ //the 47 represents the 47th square in the grid
      const columnOfThree = [i, i + width, i + width * 2] 
      const decidedColor = currentColorArrangemnt[i];

      if(columnOfThree.every(square => currentColorArrangemnt[square] === decidedColor)){ //this is comparing the three squares in the column is the same as the first square => returning a boolean
        columnOfThree.forEach(square => currentColorArrangemnt[square] = '') //if the colors are a match, then replace the squares with an empty string
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfFour = () => {
    for(let i=0; i< 39; i++){ //the 39 represents the 47th square in the grid
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3] 
      const decidedColor = currentColorArrangemnt[i];

      if(columnOfFour.every(square => currentColorArrangemnt[square] === decidedColor)){ //this is comparing the fours squares in the column is the same as the first square => returning a boolean
        columnOfFour.forEach(square => currentColorArrangemnt[square] = '') //if the colors are a match, then replace the squares with an empty string
      }
    }
  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkForRowOfThree = () => {
      for(let i=0; i< 64; i++){ //the 64 represents all 64 squares in the grid
        const rowOfThree = [i, i + 1, i + 2] 
        const decidedColor = currentColorArrangemnt[i];
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64] //these are the squares in the grid that are redundant to check

        if(notValid.includes(i)) continue
  
        if(rowOfThree.every(square => currentColorArrangemnt[square] === decidedColor)){ //this is comparing the three squares in the row is the same as the first square => returning a boolean
          rowOfThree.forEach(square => currentColorArrangemnt[square] = '') //if the colors are a match, then replace the squares with an empty string
        }
      }
    }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        const checkForRowOfFour = () => {
          for(let i=0; i< 64; i++){ //the 64 represents all 64 squares in the grid
            const rowOfFour = [i, i + 1, i + 2, i + 3] 
            const decidedColor = currentColorArrangemnt[i];
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64] //these are the squares in the grid that are redundant to check
    
            if(notValid.includes(i)) continue
      
            if(rowOfFour.every(square => currentColorArrangemnt[square] === decidedColor)){ //this is comparing the three squares in the row is the same as the first square => returning a boolean
              rowOfFour.forEach(square => currentColorArrangemnt[square] = '') //if the colors are a match, then replace the squares with an empty string
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
      checkForColumnOfFour()
      checkForRowOfFour()
      checkForColumnOfThree()
      checkForRowOfThree()
      setCurrentColorArrangement([...currentColorArrangemnt]) //the three dots expands an array into individual elements and putting it back into the array
    }, 100)
    return () => clearInterval(timer)
    

  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, currentColorArrangemnt])
  
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
