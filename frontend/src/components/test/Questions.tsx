import {useEffect, useState} from 'react'
import {QuestionType} from '../../interfaces/Question'
import fetchUtil from '../../utils/fetch'

const Questions = () => {

    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() => {

        (async () => {

            setQuestions((await fetchUtil('test/questions', {
                method: 'get'
            })).json.questions)

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