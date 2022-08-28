import {ChangeEvent, useEffect, useState} from 'react'
import x from '../assets/x.svg'
import v from '../assets/v.svg'

interface QuestionType {

    title: string
    answers: {
        answer: string
        correct: boolean
    }[]
    authorId: number

}

interface AnswerType {
    index: number
    title: string
    answer: string
}

const Test = () => {

    const [error, setError] = useState<string>('')
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [index, setIndex] = useState<number>(0)
    const [answers, setAnswers] = useState<AnswerType[]>([])
    const [checked, setChecked] = useState<boolean | string>(false)
    const [end, setEnd] = useState<boolean>(false)

    useEffect(() => {

        (async () => {
            setQuestions((await (await fetch(`${import.meta.env.VITE_API_URL}/test/questions`)).json()).drawn)
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
                title: questions[index].title,
                answer: e.target.value
            })
            setAnswers(newAnswers)
        } else {
            const newAnswers = answers
            newAnswers.push({
                index,
                answer: e.target.value,
                title: questions[index].title
            })
            setAnswers(newAnswers)
        }

    }

    return (
        <div>
            {!end && questions.length !== 0 ? (
                <>
                    <div className='font-semibold'>Pytanie: {questions[index].title}</div>
                    {questions[index].answers.map(a => (
                        <div className=''>
                            <input type='radio' name={`answer${index}`} value={a.answer} onChange={saveAnswer}
                                   checked={typeof checked === "boolean" ? checked : checked === a.answer}/> {a.answer}
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
                        <div className='font-extrabold text-red-500'>Error: {error}</div>
                    )}
                </>
            ) : !end && (<div>Ładowanie pytań</div>)}

            {end && (
                <>
                    {questions.map(q => (
                        <>
                            <div className='font-semibold'>Pytanie: {q.title}</div>
                            <div>
                                {q.answers.map(a => (
                                    <div className='block'>
                                        {a.correct ? (
                                            <div className='text-ownGreen inline-flex'>
                                                <img src={v} alt="V" />
                                                {a.answer}
                                            </div>
                                        ) : (
                                            <div className='text-red-500 inline-flex'>
                                                <img src={x} alt="X" />
                                                {a.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <br/>
                            <br/>
                            <br/>
                        </>
                    ))}
                </>
            )}
        </div>
    )

}

export default Test