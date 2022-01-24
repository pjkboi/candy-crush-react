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
  
  console.log(currentColorArrangemnt)

  return (
    <div className="App">
      <div className="game">
        {currentColorArrangemnt.map((candyColor, index) => (
          // eslint-disable-next-line jsx-a11y/alt-text
          <img 
            key={index}
            style={{backgroundColor: candyColor}}
          ></img>
        ))}
      </div>
    </div>
  )
}

export default App;
