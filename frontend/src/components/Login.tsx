import {FormEvent, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import userState from '../atoms/userState'
import {useCookies} from 'react-cookie'
import fetchUtil from '../utils/fetch'

const Login = () => {

    const loginRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string>('')
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [user, setUser] = useRecoilState(userState)
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if (!loginRef.current?.value || !passwordRef.current?.value) return setError('Uzupełnij pola')
        setError('')

        const res = await fetchUtil('user/login', {
            method: 'post',
            body: {
                username: loginRef.current.value,
                password: passwordRef.current.value
            }
        })

        if (res.status !== 200) return setError('Błędne dane')
        setUser({
            username: res.json.username,
            admin: res.json.admin
        })
        setCookie('token', res.json.token)
        navigate('/')

    }

    return (
        <div className='flex justify-center'>
            <form onSubmit={handleSubmit} className='grid justify-items-center'>
                Login: <input type='text' ref={loginRef}
                              className='border border-gray-300 block bg-gray-50 rounded-xl px-1' placeholder='Login'/>
                <br/>
                Hasło: <input type='password' ref={passwordRef}
                              className='border border-gray-300 block bg-gray-50 rounded-xl px-1' placeholder='Hasło'/>
                <br/>
                <input type='submit'
                       className='font-extrabold ml-2 bg-ownGreen hover:bg-ownGreenHover py-2 px-3 rounded-xl text-black transition-colors duration-500'/>

                {error && (<div className='font-extrabold text-red-500'>Błąd: {error}</div>)}
            </form>
        </div>
    )

}

export default Login