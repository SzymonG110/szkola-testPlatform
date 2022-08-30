import {FormEvent, useRef, useState} from 'react'
import {useCookies} from 'react-cookie'
import fetchUtil from '../../utils/fetch'

const AddQuestion = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const questionRef = useRef<HTMLInputElement>(null)
    const correctAnswerRef1 = useRef<HTMLInputElement>(null)
    const correctAnswerRef2 = useRef<HTMLInputElement>(null)
    const correctAnswerRef3 = useRef<HTMLInputElement>(null)
    const correctAnswerRef4 = useRef<HTMLInputElement>(null)
    const answerRef1 = useRef<HTMLInputElement>(null)
    const answerRef2 = useRef<HTMLInputElement>(null)
    const answerRef3 = useRef<HTMLInputElement>(null)
    const answerRef4 = useRef<HTMLInputElement>(null)

    const handleCloseModal = () => {

        document.getElementById('modalAddQuestion')?.classList.add('hidden')

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError('')
        setSuccess('')

        const question = questionRef.current?.value as string
        const answers = [
            {
                answer: answerRef1.current?.value!,
                correct: correctAnswerRef1.current?.checked
            },
            {
                answer: answerRef2.current?.value!,
                correct: correctAnswerRef2.current?.checked
            },
            {
                answer: answerRef3.current?.value!,
                correct: correctAnswerRef3.current?.checked
            },
            {
                answer: answerRef4.current?.value!,
                correct: correctAnswerRef4.current?.checked
            }
        ]

        if (questionRef.current?.value.length! < 3 || answerRef1.current?.value.length! < 3 || answerRef2.current?.value.length! < 3 || answerRef3.current?.value.length! < 3 || answerRef4.current?.value.length! < 3) return setError('Odpowiedzi jak i pytanie musi mieć minimum 3 znaki')
        if (!correctAnswerRef1.current?.checked && !correctAnswerRef2.current?.checked && !correctAnswerRef3.current?.checked && !correctAnswerRef4.current?.checked) return setError('Nie zaznaczyłeś poprawnej odpowiedzi')

        const res = await fetchUtil('test/questions', {
            method: 'post',
            token: cookies.token,
            body: {
                question,
                answers
            }
        })

        if (res.status === 409) return setError('Podane pytanie znajduje się już w bazie')
        if (res.status !== 200) return setError(res.json.message)

        setSuccess('Pytanie dodano do bazy')
    }

    return (
        <div className='hidden w-screen h-screen fixed top-0 left-0 grid place-content-center' id='modalAddQuestion'>
            <div className='relative w-96 min-w-max bg-amber-300 p-3 z-20'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5'
                     stroke='currentColor' className='w-8 h-8 text-red-500 absolute top-3 right-3'
                     onClick={handleCloseModal}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/>
                </svg>

                <h2 className='font-bold text-2xl'>Dodaj pytanie</h2>

                <form onSubmit={handleSubmit}>
                    <h4>Pytanie:</h4>
                    <input type='text' ref={questionRef}
                           className='border border-gray-300 block bg-gray-50 rounded-xl px-1 my-1'
                           placeholder='Pytanie'/>

                    <h4>Odpowiedzi:</h4>
                    <div>
                        <input type='text' ref={answerRef1}
                               className='border border-gray-300 bg-gray-50 rounded-xl px-1 my-1'
                               placeholder='Odpowiedź'/>
                        <input type='radio' ref={correctAnswerRef1} name='correctAnswer' id='answer1'
                               className='border border-gray-300 bg-gray-50 rounded-xl ml-1'/>
                    </div>

                    <div>
                        <input type='text' ref={answerRef2}
                               className='border border-gray-300 bg-gray-50 rounded-xl px-1 my-1'
                               placeholder='Odpowiedź'/>
                        <input type='radio' ref={correctAnswerRef2} name='correctAnswer' id='answer2'
                               className='border border-gray-300 bg-gray-50 rounded-xl ml-1'/>
                    </div>

                    <div>
                        <input type='text' ref={answerRef3}
                               className='border border-gray-300 bg-gray-50 rounded-xl px-1 my-1'
                               placeholder='Odpowiedź'/>
                        <input type='radio' ref={correctAnswerRef3} name='correctAnswer' id='answer3'
                               className='border border-gray-300 bg-gray-50 rounded-xl ml-1'/>
                    </div>

                    <div>
                        <input type='text' ref={answerRef4}
                               className='border border-gray-300 bg-gray-50 rounded-xl px-1 my-1'
                               placeholder='Odpowiedź'/>
                        <input type='radio' ref={correctAnswerRef4} name='correctAnswer' id='answer4'
                               className='border border-gray-300 bg-gray-50 rounded-xl ml-1'/>
                    </div>

                    <input type='submit'
                           className='font-extrabold bg-ownGreen hover:bg-ownGreenHover py-2 px-3 rounded-xl text-black transition-colors duration-500 absolute bottom-3 right-3'/>

                    {error && (
                        <>
                            <div className='font-extrabold text-red-500'>Błąd: {error}</div>
                            <br/>
                            <br/>
                        </>
                    )}

                    {success && (
                        <>
                            <div className='font-extrabold text-ownGreen'>Sukces: {success}</div>
                            <br/>
                            <br/>
                        </>
                    )}
                </form>
            </div>
        </div>
    )

}

export default AddQuestion