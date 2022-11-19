import { useState } from 'react'
import RICIBs from 'react-individual-character-input-boxes'
import FilteredList from '../components/FilteredList'
import WordLine from '../components/WordLine'
import './MainPage.css'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'

const MainPage: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [tryWord, setTryWord] = useState<string[] | {}>([])

  const [term, setTerm] = useState<{
    lip: string[]
    npl: string[]
    pl: string[]
  }>()

  const tryWordHandler = (string: string) => {
    if (/[а-я, А-Я]/.test(string)) {
      const res = string.toLowerCase().split('')

      setTryWord(res)
    }
  }

  const submitHandler = (colors: any) => {
    const colorArr = Object.values(colors)

    let i = -1
    let j = -1
    let k = -1
    if (Array.isArray(tryWord)) {
      const lip = tryWord.map((l) => {
        i++
        if (colorArr[i] === 2) {
          return l
        }
        return '.'
      })
      const pl = tryWord.map((l) => {
        j++
        if (colorArr[j] === 1) {
          return l
        }
        return '.'
      })
      const npl = tryWord.map((l) => {
        k++
        if (colorArr[k] === 0) {
          return l
        }
        return '.'
      })
      setTerm({ lip, npl, pl })
      // resetHandler()
    }
  }

  const resetHandler = () => {
    setTryWord([
      {}
    ])
    setTerm({
      lip: [],
      npl: [],
      pl: [],
    })
  }

  return (
    <div>
      <h2>Выигрываем легко!</h2>
      <div>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setOpen(true)}
        >
          Введите слово
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth='xl'>
          <DialogTitle>
            <Typography >Попробуйте слово</Typography>
          </DialogTitle>
          <DialogContent dividers>
            <RICIBs
              amount={5}
              autoFocus
              inputRegExp={/^[а-я А-Я]$/}
              handleOutputString={tryWordHandler}
              inputProps={{
                style: {
                  border: 'none',
                  borderRadius: 0,
                  borderBottom: '3px solid #3f50b5',
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Да</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <RICIBs
        amount={5}
        autoFocus
        handleOutputString={tryWordHandler}
        // inputProps={tryWord}
        inputRegExp={/^[а-я А-Я]$/}
      /> */}
      {Array.isArray(tryWord) && tryWord.length === 5 && (
        <WordLine tryWord={tryWord} submitHandler={submitHandler} />
      )}

      {/* <button className='resetButton' onClick={resetHandler}>
        Сброс
      </button> */}

      {/* <button className='submitButton' onClick={submitHandler}>
        Искать
      </button> */}
      <FilteredList term={term} />
    </div>
  )
}

export default MainPage
