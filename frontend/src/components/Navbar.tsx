import {Link} from 'react-router-dom'
import {useRecoilState} from 'recoil'
import userState from '../atoms/userState'

const Navbar = () => {

    const [user, setUser] = useRecoilState(userState)

    const logout = () => {
        setUser(undefined)
    }

    return (
        <div className='flex p-3 font-semibold bg-ownBlue text-white space-x-5 mb-0.5'>
            <div className='flex justify-start w-full'>
                {user && (<Link to='/' className='cursor-pointer hover:text-ownBlueHover duration-500'>{user}</Link>)}
            </div>

            <div className='flex justify-end w-full'>
                {!user && (<Link className='cursor-pointer hover:text-ownBlueHover duration-500' to='/login'>Zaloguj
                    się</Link>)}
                {user && (<div className='cursor-pointer hover:text-ownBlueHover duration-500' onClick={logout}>Wyloguj
                    się</div>)}
            </div>
        </div>
    )

}

export default Navbar