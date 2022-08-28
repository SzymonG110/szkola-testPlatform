import {ChangeEvent, useEffect, useState} from 'react'

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
        showAnswers()

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

    const showAnswers = () => {

        const userAnswers = answers

    }

    return (
        <div>
            {!end && questions.length !== 0 ? (
                <>
                    <div>{questions[index].title}</div>
                    {questions[index].answers.map(a => (
                        <div>
                            <input type='radio' name={`answer${index}`} value={a.answer} onChange={saveAnswer}
                                   checked={typeof checked === "boolean" ? checked : checked === a.answer}/>
                            <div>{a.answer}</div>
                        </div>
                    ))}

                    {questions.length - 1 === index ? (
                        <button onClick={handleEndTest}>Zakończ test</button>
                    ) : (
                        <button onClick={handleNextQuestion}>Następne pytanie</button>
                    )}

                    {error && (
                        <div>Error: {error}</div>
                    )}
                </>
            ) : !end && (
                <div>Ładowanie pytań</div>
            )}

            {end && (
                <>
                    {questions.map(q => (
                        <>
                            <h2>{q.title}</h2>
                            <div>
                                {q.answers.map(a => (
                                    <>
                                        <div>{a.answer}</div>
                                        <div>{a.correct ? 'Dobra' : 'Zła'}</div>
                                    </>
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