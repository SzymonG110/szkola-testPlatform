import {Link} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import userState from '../atoms/userState'

const Navbar = () => {

    const [user, setUser] = useRecoilState(userState)

    const logout = () => {
        setUser(undefined)
    }

    return (
        <div className='flex justify-end p-3 font-semibold bg-ownBlue text-white space-x-5'>
            {!user && (<Link className='cursor-pointer hover:text-ownBlueHover duration-500' to='/login'>Zaloguj się</Link>)}
            {user && (<div className='cursor-pointer hover:text-ownBlueHover duration-500' onClick={logout}>Wyloguj się</div>)}
        </div>
    )

}

export default Navbar