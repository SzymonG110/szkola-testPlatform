import {useEffect, useState} from 'react'
import {QuestionType} from '../interfaces/Question'

const Questions = () => {

    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() => {

        (async () => {
            setQuestions((await (await fetch(`${import.meta.env.VITE_API_URL}/test/questions`)).json()).questions)
        })()

    }, [])

    return (
        <div>
            {questions.map((q, index) => (
                <div key={index}>
                    <div className='font-semibold'>Pytanie: {q.question}</div>
                    <div>Odpowiedź: {q.answers.find(a => a.correct)?.answer}</div>
                </div>
            ))}
        </div>
    )

}

export default Questions