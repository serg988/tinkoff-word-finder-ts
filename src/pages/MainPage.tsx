import { useState } from 'react'
import RICIBs from 'react-individual-character-input-boxes'
import FilteredList from '../components/FilteredList'
import WordLine from '../components/WordLine'
import './MainPage.css'

const MainPage: React.FC = () => {
  // const [tryWord, setTryWord] = useState<{ value: string; status: Status }[]>([
  //   { value: '', status: Status.G },
  //   { value: '', status: Status.G },
  //   { value: '', status: Status.G },
  //   { value: '', status: Status.G },
  //   { value: '', status: Status.G },
  // ])
  const [tryWord, setTryWord] = useState<string[]>([])
  // const [notPresentLetters, setNotPresentLetters] = useState<string[]>([])
  // const [presentLetters, setPresentLetters] = useState<string[]>([])
  // const [term, setTerm] = useState<{
  //   lip: string[]
  //   npl: string[]
  //   pl: string[]
  // }>()

  const tryWordHandler = (string: string) => {
    if (/[а-я, А-Я]/.test(string)) {
      const res = string.toLowerCase().split('')

      setTryWord(res)
    }
  }

  // const notPresentLettersHandler = (string: string) => {
  //   const res = string.toLowerCase().split('')
  //   setNotPresentLetters(res)
  // }

  // const presentLettersHandler = (string: string) => {
  //   const res = string.toLowerCase().split('')
  //   setPresentLetters(res)
  // }

  // const submitHandler = () => {
  //   setTerm({
  //     lip: lettersInPlace,
  //     npl: notPresentLetters,
  //     pl: presentLetters,
  //   })
  //   console.log('TERM', term)
  // }

  // const resetHandler = () => {
  //   setLettersInPlace([
  //     { value: '.' },
  //     { value: '.' },
  //     { value: '.' },
  //     { value: '.' },
  //     { value: '.' },
  //   ])
  //   setPresentLetters([])
  //   setNotPresentLetters([])
  //   setTerm({
  //     lip: [],
  //     npl: [],
  //     pl: [],
  //   })
  // }

  return (
    <div>
      <h2>Попробовать слово</h2>
      <RICIBs
        amount={5}
        autoFocus
        handleOutputString={tryWordHandler}
        // inputProps={tryWord}
        inputRegExp={/^[а-я А-Я .]$/}
      />
      {tryWord.length === 5 && <WordLine tryWord={tryWord} />}

      {/* <button className='resetButton' onClick={resetHandler}>
        Сброс
      </button> */}

      {/* <button className='submitButton' onClick={submitHandler}>
        Искать
      </button> */}
      {/* <FilteredList term={term} /> */}
    </div>
  )
}

export default MainPage
