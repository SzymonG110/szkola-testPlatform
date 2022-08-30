import {useRecoilState} from 'recoil'
import userState from '../../atoms/userState'
import {useCookies} from 'react-cookie'
import {useEffect} from 'react'
import AddQuestion from './AddQuestion'
import fetchUtil from '../../utils/fetch'
import {Link} from 'react-router-dom'

const Panel = () => {

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
                role: res.json.role
            })

        })()

    }, [])

    const handleModalOpen = () => {

        document.getElementById('modalAddQuestion')?.classList.remove('hidden')

    }

    return (
        <div>
            <AddQuestion/>
            <div>
                <div onClick={handleModalOpen} className='cursor-pointer hover:text-ownBlueHover duration-500'>Dodaj
                    pytanie
                </div>
                <Link to='/panel/users' className='cursor-pointer hover:text-ownBlueHover duration-500'>Zarządzaj
                    użytkownikami</Link>
            </div>
        </div>
    )

}

export default Panel