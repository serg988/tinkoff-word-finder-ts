import React, { useState } from 'react'

import './WordLine.css'
interface IWordLine {
  // tryWord: { value: string; status: number }[]
  tryWord: string[]
}

enum Status {
  'gray',
  'white',
  'yellow',
}

const WordLine: React.FC<IWordLine> = ({ tryWord }) => {
  const [color1, setColor1] = useState<number>(0)
  const [color2, setColor2] = useState<number>(0)
  const [color3, setColor3] = useState<number>(0)
  const [color4, setColor4] = useState<number>(0)
  const [color5, setColor5] = useState<number>(0)
  
  let i = 0
  const changeColor = () => {
    i = i + 1
    if (i >= 3) i = 0
    console.log('🚀 ~ file: WordLine.tsx ~ line 24 ~ changeColor ~ i', i)
    return i
  }

  // console.log('🚀 ~ file: WordLine.tsx ~ line 9 ~ tryWord', tryWord)
  return (
    <div className='container'>
      <div
        onClick={() => setColor1(changeColor())}
        className={`box ${Status[color1]}`}
      >
        {tryWord[0]}
      </div>
      <div
        onClick={() => setColor2(changeColor())}
        className={`box ${Status[color2]}`}
      >
        {tryWord[1]}
      </div>
      <div
        onClick={() => setColor3(changeColor())}
        className={`box ${Status[color3]}`}
      >
        {tryWord[2]}
      </div>
      <div
        onClick={() => setColor4(changeColor())}
        className={`box ${Status[color4]}`}
      >
        {tryWord[3]}
      </div>
      <div
        onClick={() => setColor5(changeColor())}
        className={`box ${Status[color5]}`}
      >
        {tryWord[4]}
      </div>
    </div>
  )
}
export default WordLine
