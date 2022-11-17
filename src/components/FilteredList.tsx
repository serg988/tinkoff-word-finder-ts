import { useState, useEffect } from 'react'
import words from '../utils/parser'

interface IFilteredList {
  // term: { lip: string[] ; npl: string[]; pl: string[] }
  term: any
}

const FilteredList: React.FC<IFilteredList> = ({ term }) => {
  const [wordsList, setWordsList] = useState<string[]>([])
  useEffect(() => {
    setWordsList(words)
  }, [])

  useEffect(() => {
    if (term?.npl && term?.npl.length > 0) {
      term.npl.forEach((element: string) => {
        setWordsList((prevState) =>
          prevState.filter((word) => word.indexOf(element) === -1)
        )
      })
    }

    if (term?.pl.length > 0) {
      term.pl.forEach((element: string) => {
        setWordsList((prevState) =>
          prevState.filter((word) => word.includes(element))
        )
      })
    }

    //----------------L I P------------------

    let expression = '.....'

      if (/[а-я]/.test(term?.lip)) {
      console.log("🚀 ~ file: FilteredList.tsx ~ line 37 ~ useEffect ~ term?.lip", term?.lip)
      expression = term?.lip.join('')
      console.log("🚀 ~ file: FilteredList.tsx ~ line 39 ~ useEffect ~ expression", expression)
    }
    
    

    const regexObj = new RegExp(expression)

    setWordsList((prevState) => prevState.filter((word) => regexObj.test(word)))

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
