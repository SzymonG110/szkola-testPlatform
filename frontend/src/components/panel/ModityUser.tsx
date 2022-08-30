import {FormEvent, useRef, useState} from 'react'
import {useCookies} from 'react-cookie'
import UserType from '../../interfaces/User'

interface Props {
    user: UserType
}

const ModifyUser = ({user}: Props) => {

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const usernameRef = useRef<HTMLInputElement>(null)

    const handleCloseModal = () => {

        document.getElementById(`modalModifyUser${user.userId}`)?.classList.add('hidden')

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError('')
        setSuccess('')

        setSuccess('Modyfikowano dane użytkownika')
    }

    return (
        <div className='hidden w-screen h-screen fixed top-0 left-0 grid place-content-center' id={`modalModifyUser${user.userId}`}>
            <div className='relative w-[28rem] min-w-max bg-amber-300 p-3 z-20'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5'
                     stroke='currentColor' className='w-8 h-8 text-red-500 absolute top-3 right-3'
                     onClick={handleCloseModal}>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12'/>
                </svg>

                <h2 className='font-bold text-2xl'>Modyfikuj dane użytkownika</h2>

                <form onSubmit={handleSubmit}>
                    <h4>Nazwa użytkownika</h4>
                    <input type='text' ref={usernameRef}
                           className='border border-gray-300 block bg-gray-50 rounded-xl px-1 my-1'
                           placeholder='Nazwa użytkownika' value={user.username}/>
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

export default ModifyUser