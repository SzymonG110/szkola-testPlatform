import {useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import {useCookies} from 'react-cookie'
import fetchUtil from './utils/fetch'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Test from './components/test/Test'
import userState from './atoms/userState'
import Questions from './components/test/Questions'
import Panel from './components/panel/Panel'
import ManageUsers from './components/panel/ManageUsers'

function App() {

    const [user, setUser] = useRecoilState(userState)
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    useEffect(() => {

        (async () => {

            const res = await fetchUtil('user/decrypt', {
                method: 'post',
                token: cookies.token
            })

            res.status === 200 && setUser({
                username: res.json.username,
                admin: res.json.admin
            })

        })()

    }, [])

    return (
        <div className='font-montserrat'>
            <Navbar/>
            <Routes>
                {!user.username ? <>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                    </>
                    : <>
                        <Route path='/test' element={<Test/>}/>
                        {user.admin && (
                            <>
                                <Route path='/panel/users' element={<ManageUsers/>}/>
                                <Route path='/panel' element={<Panel/>}/>
                            </>
                        )}
                    </>
                }

                <Route path='/questions' element={<Questions/>}/>
                <Route path='/*' element={<Home/>}/>
            </Routes>
        </div>
    )

}

export default App
