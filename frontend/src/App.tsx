import {useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Test from './components/Test'
import userState from './atoms/userState'
import {useCookies} from 'react-cookie'

function App() {

    const [user, setUser] = useRecoilState(userState)
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    useEffect(() => {

        (async () => {

            if (!cookies) return
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/decrypt`, {

                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: cookies.token
                })

            })
            res.status === 200 && setUser((await res.json()).username)

        })()

    }, []);

    return (
        <div className='font-montserrat'>
            <Navbar/>
            <Routes>
                {!user ? <>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                    </>
                    : <>
                        <Route path='/test' element={<Test/>}/>
                    </>
                }

                <Route path='/*' element={<Home/>}/>
            </Routes>
        </div>
    )

}

export default App
