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
  const [open, setOpen] = useState<boolean>(false)
  const [tryWord, setTryWord] = useState<string[] | {}>([])
  const [buttonName, setButtonName] = useState('Введите случайное слово')

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

  const submitHandler = (colors: number[]) => {

    let i = -1
    let j = -1
    let k = -1
    if (Array.isArray(tryWord)) {
      const lip = tryWord.map((l) => {
        i++
        if (colors[i] === 2) {
          return l
        }
        return '.'
      })
      const pl = tryWord.map((l) => {
        j++
        if (colors[j] === 1) {
          return l
        }
        return '.'
      })
      const npl = tryWord.map((l) => {
        k++
        if (colors[k] === 0) {
          return l
        }
        return '.'
      })
      setTerm({ lip, npl, pl })
      setButtonName('Введите следующее слово')
      setOpen(true)
    }
  }

  return (
    <div>
      <h2>Выигрываем легко!</h2>
      <div>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => setOpen(true)}
        >
          {buttonName}
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth='sm'>
          <DialogTitle>
            <Typography>Попробуйте общеупотребимое слово из 5 букв, или скройте это окно и кликните по слову из списка.</Typography>
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
                  width: '30px',
                  height: '30px',
                },
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Скрыть</Button>
          </DialogActions>
        </Dialog>
      </div>

      {Array.isArray(tryWord) && tryWord.length === 5 && (
        <WordLine tryWord={tryWord} submitHandler={submitHandler} />
      )}

      <FilteredList term={term} tryWordHandler={tryWordHandler} />
    </div>
  )
}

export default MainPage
