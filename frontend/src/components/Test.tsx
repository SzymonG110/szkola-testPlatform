import {ChangeEvent, useEffect, useState} from 'react'
import {AnswerType, QuestionType} from '../interfaces/Question'
import fetchUtil from '../utils/fetch'

const Test = () => {

    const [error, setError] = useState<string>('')
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [index, setIndex] = useState<number>(0)
    const [answers, setAnswers] = useState<AnswerType[]>([])
    const [checked, setChecked] = useState<boolean | string>(false)
    const [end, setEnd] = useState<boolean>(false)

    useEffect(() => {

        (async () => {

            setQuestions((await fetchUtil('test/questions', {
                method: 'get'
            })).json.drawn)

        })()

    }, [])

    const handleNextQuestion = () => {

        if (!checkIfAnswer()) return
        setIndex(prev => ++prev)

    }

    const handleEndTest = () => {

        if (!checkIfAnswer()) return

        setEnd(true)

    }

    const checkIfAnswer = () => {

        setError('')
        setChecked(false)
        if (answers.filter(a => a.index === index).length === 0) {
            setError('Zaznacz odpowiedź')
            return false
        }

        return true

    }

    const saveAnswer = (e: ChangeEvent<HTMLInputElement>) => {

        setChecked(e.target.value)
        if (answers.filter(a => a.index === index).length === 1) {
            const newAnswers = answers.filter(a => a.index !== index)
            newAnswers.push({
                index,
                title: questions[index].question,
                answer: e.target.value
            })
            setAnswers(newAnswers)
        } else {
            const newAnswers = answers
            newAnswers.push({
                index,
                answer: e.target.value,
                title: questions[index].question
            })
            setAnswers(newAnswers)
        }

    }

    return (
        <div>
            {!end && questions.length !== 0 ? (
                <>
                    <div className='font-semibold'>Pytanie: {questions[index].question}</div>
                    {questions[index].answers.map((a, mapIndex) => (
                        <div key={mapIndex}>
                            <input type='radio' name={`answer${index}`} value={a.answer} onChange={saveAnswer}
                                   checked={typeof checked === 'boolean' ? checked : checked === a.answer}/> {a.answer}
                        </div>
                    ))}

                    {questions.length - 1 === index ? (
                        <button onClick={handleEndTest}
                                className='cursor-pointer bg-ownGreen hover:bg-ownGreenHover duration-500 rounded-2xl py-2 px-3 hover:text-white'>Zakończ
                            test</button>
                    ) : (
                        <button onClick={handleNextQuestion}
                                className='cursor-pointer bg-ownGreen hover:bg-ownGreenHover duration-500 rounded-2xl py-2 px-3 hover:text-white'>Następne
                            pytanie</button>
                    )}

                    {error && (
                        <div className='font-extrabold text-red-500'>Błąd: {error}</div>
                    )}
                </>
            ) : !end && (<div>Ładowanie pytań</div>)}

            {end && (
                <>
                    <div>Odpowiedzi poprawne: <div
                        className={(answers.filter((a, filterIndex) => a.answer === questions[filterIndex].answers.find(a => a.correct)?.answer).length / questions.length * 100 >= 50 ? 'text-ownGreen' : 'text-red-500') + ' inline font-semibold'}>{answers.filter((a, filterIndex) => a.answer === questions[filterIndex].answers.find(a => a.correct)?.answer).length}/{questions.length}</div>
                    </div>
                    {questions.map((q, mapIndex) => (
                        <div key={mapIndex}>
                            <div className='font-semibold'>Pytanie: {q.question}</div>
                            <div>
                                {q.answers.map((a, i) => (
                                    <div className='block' key={i}>
                                        {a.correct ? (
                                            <div className='text-ownGreen inline-flex'>
                                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                                     strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                                                    <path strokeLinecap='round' strokeLinejoin='round'
                                                          d='M4.5 12.75l6 6 9-13.5'/>
                                                </svg>
                                                {a.answer}
                                            </div>
                                        ) : answers[mapIndex].answer !== questions[mapIndex].answers.find(a => a.correct)?.answer ? (
                                            <div className='text-red-500 inline-flex'>
                                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                                     strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                                                    <path strokeLinecap='round' strokeLinejoin='round'
                                                          d='M6 18L18 6M6 6l12 12'/>
                                                </svg>
                                                {a.answer}
                                            </div>
                                        ) : (
                                            <div className='inline-flex'>
                                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'
                                                     strokeWidth='1.5' stroke='currentColor'
                                                     className='w-6 h-6 text-red-500   '>
                                                    <path strokeLinecap='round' strokeLinejoin='round'
                                                          d='M6 18L18 6M6 6l12 12'/>
                                                </svg>
                                                {a.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )

}

export default Test