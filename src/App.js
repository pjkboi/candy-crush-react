import {useEffect, useState } from 'react'
import ScoreBoard from './components/ScoreBoard'
import Black from './images/black.png'
import Blue from './images/blue.png'
import Purple from './images/purple.png'
import Red from './images/red.png'
import White from './images/white.png'
import Yellow from './images/yellow.png'
import Blank from './images/blank.png'


const width = 8
const candyColors = [
  Black, 
  Blue,
  Purple,
  Red, 
  White, 
  Yellow
]



const App = () => {
  const [currentColorArrangemnt, setCurrentColorArrangement] = useState([])
  const [ squareBeingDragged, setSquareBeingDragged] = useState(null)
  const [ squareBeingReplaced, setSquareBeingReplaced] = useState(null)
  const [scoreDisplay, setScoreDisplay] = useState(0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfThree = () => {
    for(let i=0; i<= 47; i++){ //the 47 represents the 47th square in the grid
      const columnOfThree = [i, i + width, i + width * 2] 
      const decidedColor = currentColorArrangemnt[i];
      const isBlank = currentColorArrangemnt[i] === Blank

      if(columnOfThree.every(square => currentColorArrangemnt[square] === decidedColor && !isBlank)){ //this is comparing the three squares in the column is the same as the first square => returning a boolean
        setScoreDisplay((score) => score + 3)
        columnOfThree.forEach(square => currentColorArrangemnt[square] = Blank) 
        return true
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForColumnOfFour = () => {
    for(let i=0; i<= 39; i++){ //the 39 represents the 47th square in the grid
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3] 
      const decidedColor = currentColorArrangemnt[i];
      const isBlank = currentColorArrangemnt[i] === Blank

      if(columnOfFour.every(square => currentColorArrangemnt[square] === decidedColor && !isBlank)){ //this is comparing the fours squares in the column is the same as the first square => returning a boolean
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentColorArrangemnt[square] = Blank) //if the colors are a match, then replace the squares with an empty string
        return true
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForRowOfThree = () => {
    for(let i=0; i< 64; i++){ //the 64 represents all 64 squares in the grid
      const rowOfThree = [i, i + 1, i + 2] 
      const decidedColor = currentColorArrangemnt[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64] //these are the squares in the grid that are redundant to check
      const isBlank = currentColorArrangemnt[i] === Blank

      if(notValid.includes(i)) continue

      if(rowOfThree.every(square => currentColorArrangemnt[square] === decidedColor && !isBlank)){ //this is comparing the three squares in the row is the same as the first square => returning a boolean
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach(square => currentColorArrangemnt[square] = Blank) //if the colors are a match, then replace the squares with an empty string
        return true
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForRowOfFour = () => {
    for(let i=0; i< 64; i++){ //the 64 represents all 64 squares in the grid
      const rowOfFour = [i, i + 1, i + 2, i + 3] 
      const decidedColor = currentColorArrangemnt[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64] //these are the squares in the grid that are redundant to check
      const isBlank = currentColorArrangemnt[i] === Blank

      if(notValid.includes(i)) continue

      if(rowOfFour.every(square => currentColorArrangemnt[square] === decidedColor && !isBlank)){ //this is comparing the three squares in the row is the same as the first square => returning a boolean
        setScoreDisplay((score) => score + 4)
        rowOfFour.forEach(square => currentColorArrangemnt[square] = Blank) //if the colors are a match, then replace the squares with an empty string
        return true
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveIntoSquareBelow = () => {
    for(let i = 0; i<= 55; i++){
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if(isFirstRow && currentColorArrangemnt[i] === Blank){
        let randomNumber = Math.floor(Math.random() * candyColors.length)
        currentColorArrangemnt[i] = candyColors[randomNumber]
      }

      if(currentColorArrangemnt[i + width]  === Blank){
        currentColorArrangemnt[i + width] = currentColorArrangemnt[i]
        currentColorArrangemnt[i] = Blank
      }
    }
  }

  const dragStart = (e) => {
    setSquareBeingDragged(e.target)
  }

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target)
  }
  const dragEnd = () => {

    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangemnt[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangemnt[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')



    const validMoves = [ //these are the potential valid moves in the game 
      squareBeingDraggedId - 1, 
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1, 
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplacedId) //comparing the square with our valid moves

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if(squareBeingReplacedId && validMove && (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)){
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
    } else {
      currentColorArrangemnt[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangemnt[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangemnt])
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
      moveIntoSquareBelow()
      setCurrentColorArrangement([...currentColorArrangemnt]) //the three dots expands an array into individual elements and putting it back into the array
    }, 100)
    return () => clearInterval(timer)
    

  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangemnt])
  

  return (
    <div className="App">
      <ScoreBoard score={scoreDisplay}></ScoreBoard>
      <div className="game">
        {currentColorArrangemnt.map((candyColor, index) => (
          <img 
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          ></img>
        ))}
      </div>
    </div>
  )
}

export default App;
