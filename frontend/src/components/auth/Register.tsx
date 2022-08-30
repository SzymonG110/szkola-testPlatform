import {FormEvent, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import userState from '../../atoms/userState'
import {useCookies} from 'react-cookie'
import fetchUtil from '../../utils/fetch'

const Register = () => {

    const loginRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>('')
    const [user, setUser] = useRecoilState(userState)
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if (!loginRef.current?.value || !passwordRef.current?.value || !confirmPasswordRef.current?.value || passwordRef.current?.value !== confirmPasswordRef.current?.value) return setError('Uzupełnij pola')
        setError('')

        const res = await fetchUtil('user/register', {
            method: 'post',
            body: {
                username: loginRef.current.value,
                password: passwordRef.current.value
            }
        })

        if (res.status === 409) return setError('Użytkownik o danym loginie już istnieje')
        else if (res.status === 403) return setError('Login bądź hasło jest zbyt krótkie')
        else if (res.status !== 200) return setError('Błędne dane')
        setUser({
            username: res.json.username,
            role: res.json.role,
            userId: res.json.userId
        })
        setCookie('token', res.json.token)
        navigate('/')

    }

    return (
        <div className='flex justify-center items-center fixed h-screen w-screen'>
            <form onSubmit={handleSubmit} className='grid justify-items-center'>
                Login: <input type='text' ref={loginRef}
                              className='border border-gray-300 block bg-gray-50 rounded px-3 py-1' placeholder='Login'/>
                <br/>
                Hasło: <input type='password' ref={passwordRef}
                              className='border border-gray-300 block bg-gray-50 rounded px-3 py-1' placeholder='Hasło'/>
                <br/>
                Potwierdź hasło: <input type='password' ref={confirmPasswordRef}
                                        className='border border-gray-300 block bg-gray-50 rounded px-3 py-1'
                                        placeholder='Hasło'/>
                <br/>
                <input type='submit'
                       className='font-extrabold ml-2 bg-ownGreen hover:bg-ownGreenHover py-2 px-3 rounded-xl text-black transition-colors duration-500'/>

                {error && (<div className='font-extrabold text-red-500'>Błąd: {error}</div>)}
            </form>
        </div>
    )

}

export default Register