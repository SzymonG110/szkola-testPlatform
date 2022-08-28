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

    }

    const checkIfAnswer = () => {

        setError('')
        if (answers.filter(a => a.index === index).length === 0) {
            setError('Zaznacz odpowiedź')
            return false
        }

        return true

    }

    const saveAnswer = (e: ChangeEvent<HTMLInputElement>) => {

        if (answers.filter(a => a.index === index).length === 1) {
            const newAnswers = answers.filter(a => a.index !== index)
            newAnswers.push({
                index,
                answer: e.target.value,
                title: questions[index].title
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
            {questions.length !== 0 ? (
                <>
                    <div>{questions[index].title}</div>
                    {questions[index].answers.map(a => (
                        <div>
                            <input type='radio' name={`answer${index}`} value={a.answer} onChange={saveAnswer}/>
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
            ) : (
                <div>Ładowanie pytań</div>
            )}
        </div>
    )

}

export default Test