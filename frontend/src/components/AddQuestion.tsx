import {useRef, useState} from 'react'

const AddQuestion = () => {

    const [error, setError] = useState<string>('')
    const questionRef = useRef<HTMLInputElement>(null)
    const answerRef = useRef<HTMLInputElement>(null)
    const answerRef1 = useRef<HTMLInputElement>(null)
    const answerRef2 = useRef<HTMLInputElement>(null)
    const answerRef3 = useRef<HTMLInputElement>(null)
    const answerRef4 = useRef<HTMLInputElement>(null)

    const handleCloseModal = () => {

        document.getElementById('modalAddQuestion')?.classList.add('hidden')

    }

    const handleSubmit = () => {
        setError('')
        console.log(questionRef.current?.value)
        console.log(answerRef.current?.value)
        console.log(answerRef1.current?.value)
        console.log(answerRef2.current?.value)
        console.log(answerRef3.current?.value)
        console.log(answerRef4.current?.value)
    }

    return (
        <div className='hidden w-screen h-screen fixed top-0 left-0 grid place-content-center' id='modalAddQuestion'>
            <div className='relative w-96 bg-amber-300 p-3 z-20'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5'
                     stroke="currentColor" className='w-8 h-8 text-red-500 absolute top-3 right-3'
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
                    <div className='inline-flex'>
                        <input type='text' ref={answerRef1}
                               className='border border-gray-300 bg-gray-50 rounded-xl px-1 my-1'
                               placeholder='Odpowiedź'/>
                        <input type='radio' ref={answerRef} name='correctAnswer' id='answer1'
                               className='border border-gray-300 bg-gray-50 rounded-xl ml-1'/>
                    </div>

                    <div className='inline-flex'>
                        <input type='text' ref={answerRef2}
                               className='border border-gray-300 bg-gray-50 rounded-xl px-1 my-1'
                               placeholder='Odpowiedź'/>
                        <input type='radio' ref={answerRef} name='correctAnswer' id='answer2'
                               className='border border-gray-300 bg-gray-50 rounded-xl ml-1'/>
                    </div>

                    <div className='inline-flex'>
                        <input type='text' ref={answerRef3}
                               className='border border-gray-300 bg-gray-50 rounded-xl px-1 my-1'
                               placeholder='Odpowiedź'/>
                        <input type='radio' ref={answerRef} name='correctAnswer' id='answer3'
                               className='border border-gray-300 bg-gray-50 rounded-xl ml-1'/>
                    </div>

                    <div className='inline-flex'>
                        <input type='text' ref={answerRef4}
                               className='border border-gray-300 bg-gray-50 rounded-xl px-1 my-1'
                               placeholder='Odpowiedź'/>
                        <input type='radio' ref={answerRef} name='correctAnswer' id='answer4'
                               className='border border-gray-300 bg-gray-50 rounded-xl ml-1'/>
                    </div>

                    <input type='submit'
                           className='font-extrabold bg-ownGreen hover:bg-ownGreenHover py-2 px-3 rounded-xl text-black transition-colors duration-500 absolute bottom-3 right-3'/>

                    {error && (<div className='font-extrabold text-red-500'>Błąd: {error}</div>)}
                </form>
            </div>
        </div>
    )

}

export default AddQuestion