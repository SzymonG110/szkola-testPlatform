import {useEffect, useState} from 'react'
import {QuestionType} from '../../interfaces/Question'
import fetchUtil from '../../utils/fetch'
import {useCookies} from 'react-cookie'
import {useRecoilState} from 'recoil'
import userState from '../../atoms/userState'

const Questions = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [user, setUser] = useRecoilState(userState)
    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() => {

        (async () => await getQuestions())()

    }, [])

    const getQuestions = async () => {

        setQuestions((await fetchUtil('test/questions', {
            method: 'get'
        })).json.questions)

    }

    const handleDeleteQuestion = async (question: string) => {

        await fetchUtil('test/questions', {
            method: 'delete',
            token: cookies.token,
            body: {
                question
            }
        })

        await getQuestions()

    }

    return (
        <div>
            {questions.map((q, index) => (
                <div key={index}>
                    <div className='font-semibold flex m-auto'>
                        Pytanie: {q.question}
                        {user.role === 'admin' && (
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5}
                                 onClick={() => handleDeleteQuestion(q.question)}
                                 stroke='currentColor' className='w-6 h-6 inline-flex cursor-pointer text-red-500'>
                                <path strokeLinecap='round' strokeLinejoin='round'
                                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'/>
                            </svg>
                        )}
                    </div>
                    <div>Odpowiedź: {q.answers.find(a => a.correct)?.answer}</div>
                </div>
            ))}
        </div>
    )

}

export default Questions