import {Link} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import userState from '../atoms/userState'
import {useCookies} from 'react-cookie'

const Navbar = () => {

    const [user, setUser] = useRecoilState(userState)
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const logout = () => {
        setUser({
            username: undefined,
            role: undefined
        })
        removeCookie('token')
    }

    return (
        <div className='flex p-3 font-semibold bg-ownBlue text-white mb-0.5'>
            <div className='flex justify-start w-full space-x-5'>
                <Link to='/' className='cursor-pointer hover:text-ownBlueHover duration-500'>Strona główna</Link>
                {user.username && (
                    <Link to='/panel'
                          className='cursor-pointer hover:text-ownBlueHover duration-500'>{user.username}</Link>
                )}
            </div>

            <div className='flex justify-end w-full'>
                {!user.username && (
                    <div className='space-x-5'>
                        <Link className='cursor-pointer hover:text-ownBlueHover duration-500' to='/register'>Zarejestruj
                            się</Link>
                        <Link className='cursor-pointer hover:text-ownBlueHover duration-500' to='/login'>Zaloguj
                            się</Link>
                    </div>
                )}
                {user.username && (
                    <div className='cursor-pointer hover:text-ownBlueHover duration-500' onClick={logout}>Wyloguj
                        się</div>)}
            </div>
        </div>
    )

}

export default Navbar