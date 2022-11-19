import { useState, useEffect } from 'react'
import words from '../utils/parser'

interface IFilteredList {
  term: { lip: string[]; npl: string[]; pl: string[] } | undefined
  // term: any
}

const FilteredList: React.FC<IFilteredList> = ({ term }) => {
  const [wordsList, setWordsList] = useState<string[]>([])
  useEffect(() => {
    setWordsList(words)
  }, [])

  useEffect(() => {
    //----------------L I P------------------

    let expression = '.....'

    if (term?.lip) {
      if (/[а-я]/.test(term?.lip.join(''))) {
        expression = term?.lip.join('')
      }
    }

    const regexObj = new RegExp(expression)

    setWordsList((prevState) => prevState.filter((word) => regexObj.test(word)))

    // -------------PRESENTED LETTERS-------------

    if (term?.pl && term?.pl.length > 0) {
      let exp = '......'

      if (term?.pl) {
        if (/[а-я]/.test(term?.pl.join(''))) {
          exp = term?.pl.join('')
        }
      }

      const regexObj = new RegExp(exp)
      console.log(
        '🚀 ~ file: FilteredList.tsx ~ line 47 ~ useEffect ~ regexObj',
        regexObj
      )

      setWordsList((prevState) =>
        prevState.filter((word) => !regexObj.test(word))
      )
      const plWithoutDots = term.pl.filter((l) => l !== '.')
      plWithoutDots.forEach((element: string) => {
        setWordsList((prevState) =>
          prevState.filter((word) => word.includes(element))
        )
      })
    }

    // --------NOT PRESENTED LETTERS
    if (term?.npl && term?.npl.length > 0) {
      const nplWithoutDots = term.npl.filter((l) => l !== '.')
      const differencePl = nplWithoutDots.filter((x) => !term.pl.includes(x))
      const differenceLip = differencePl.filter((x) => !term.lip.includes(x))

      differenceLip.forEach((element: string) => {
        setWordsList((prevState) =>
          prevState.filter((word) => word.indexOf(element) === -1)
        )
      })
    }
    //--------------------------------------------
  }, [term])

  return (
    <div>
      {wordsList.slice(0, 200).map((w) => {
        return <span key={Math.random()}>{w}, </span>
      })}
    </div>
  )
}

export default FilteredList
