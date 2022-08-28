import {Route, Routes} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
// import Register from './components/Register'
import Test from './components/Test'
import userState from './atoms/userState'

function App() {

    const [user, setUser] = useRecoilState(userState)
    console.log(user)

    return (
        <div className='font-montserrat'>
            <Navbar/>
            <div className='h-screen'>
                <Routes>
                    {!user ? <>
                            <Route path='/login' element={<Login/>}/>
                            {/*<Route path='/register' element={<Register/>}/>*/}
                        </>
                        : <>
                            <Route path='/test' element={<Test/>}/>
                        </>
                    }

                    <Route path='/*' element={<Home/>}/>
                </Routes>
            </div>
        </div>
    )

}

export default App
