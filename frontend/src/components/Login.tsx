import {useRef, useState, SyntheticEvent, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import userState from '../atoms/userState'

const Login = () => {

    const loginRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState('')
    const [user, setUser] = useRecoilState(userState)
    const navigate = useNavigate()

    const handleSubmit = async (e: SyntheticEvent) => {

        e.preventDefault()

        if (!loginRef.current?.value || !passwordRef.current?.value) return setError('Uzupełnij pola')
        setError('')

        const res = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {

            method: 'post',
            body: JSON.stringify({
                usernam: passwordRef.current.value,
                password: passwordRef.current.value
            })

        })

        if (res.status != 200) return setError('Błędne dane')
        setUser((await res.json()).username)
        navigate('/')

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Login: <input type='text' ref={loginRef}/> <br />
                Hasło: <input type='password' ref={passwordRef}/> <br />
                <input type='submit'/>
                {error && (
                    <div>Błąd: {error}</div>
                )}
            </form>
        </div>
    )

}

export default Login