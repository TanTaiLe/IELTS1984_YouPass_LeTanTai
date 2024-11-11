import { useEffect, useState, useRef, useCallback } from 'react'
import './App.scss'
import 'bootstrap/scss/bootstrap.scss'
import { getData } from './data'
import { motion } from "framer-motion"

function App() {
  const [data, setData] = useState()
  const [inputs, setInputs] = useState([])
  const [answers, setAnswers] = useState(Array(inputs.length).fill(null))
  const [results, setResults] = useState(Array(inputs.length).fill(null))
  const constraintsRef = useRef(null)
  const inputsRef = useRef([])

  const replaceInput = (inputs) => {
    const parts = data.paragraph.split('[_input]')
    const htmlString = parts.reduce((string, part, i) => {
      string += part
      if (i < inputs.length) {
        const { id, position, type } = inputs[i]
        string += `<input id="${id}" name="${position}" type="${type}" ref="${el => inputsRef.current[i] = el}" />`
      }
      return string
    }, '')

    return { __html: htmlString }
  }

  const handleDrop = (e, i) => {
    e.preventDefault()

    const draggedWord = e.dataTransfer.getData("text")
    e.target.value = draggedWord

    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[i] = draggedWord;
      return newAnswers;
    });
  }

  const addDropEvents = useCallback(() => {
    inputsRef.current.forEach((input, i) => {
      if (input && !input.hasEventListener) {
        input.addEventListener('drop', e => handleDrop(e, i))
        input.addEventListener('dragover', e => e.preventDefault())
        input.hasEventListener = true
      }
    })
  }, [inputs])

  const checkAnswer = () => {
    inputs.flatMap((input, i) => {
      let result = null

      if (answers[i] === undefined) {
        result = { isCorrect: false, msg: `Blank ${i + 1} is empty` }
      } else {
        if (answers[i] === input.correctAnswer) {
          result = { isCorrect: true, msg: `Blank ${i + 1} is correct` }
        } else if (answers[i] !== input.correctAnswer) {
          result = { isCorrect: false, msg: `Blank ${i + 1} is incorrect` }
        }
      }

      setResults(prev => {
        const newResults = [...prev];
        newResults[i] = result
        return newResults;
      });
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData()
        setData(res)
        setInputs(res.blanks)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (inputs.length) {
      addDropEvents()
      inputsRef.current = document.querySelectorAll('input')
    }

    fetchData();
  }, [inputs, addDropEvents])

  const DragWord = ({ word, color }) =>
    <motion.div style={{ display: 'inline-block' }} drag dragConstraints={constraintsRef}>
      <motion.span
        draggable
        style={{ color: color }}
        className='answers__item py-1 px-3'
        onDragStart={e => e.dataTransfer.setData("text", word)}
      >{word}</motion.span>
    </motion.div>

  return (
    <div className='d-flex flex-column align-items-start row-gap-3 p-3'>
      <h1>Drag the word</h1>
      {data &&
        <motion.div className='d-flex flex-column row-gap-3' ref={constraintsRef}>

          <div className="question" dangerouslySetInnerHTML={inputs.length > 0 && replaceInput(inputs)} />

          <div className="answers w-25 column-gap-2">
            {data.dragWords.map(w =>
              <DragWord key={w.id} {...w} />)}
          </div>

          <div className="result">
            <ul>
              {results.map((result, i) =>
                <li key={i} style={{ color: result.isCorrect ? 'green' : 'red' }}>
                  <strong>{result.msg}</strong>
                </li>
              )}
            </ul>
          </div>

        </motion.div>
      }
      <button className="btn btn-primary" onClick={checkAnswer}>Submit</button>
    </div>
  )
}

export default App
