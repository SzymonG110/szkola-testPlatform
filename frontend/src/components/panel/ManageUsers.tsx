import {useEffect, useState} from 'react'
import fetchUtil from '../../utils/fetch'
import {useCookies} from 'react-cookie'
import ManageUser from './ManageUser'
import {SetterOrUpdater} from 'recoil'
import UserType from '../../interfaces/User'

export const fetchUsers = async (token: string, setUsers: SetterOrUpdater<UserType[]>) => {

    const res = await fetchUtil('admin/users', {
        method: 'get',
        token: token
    })
    res.status === 200 && setUsers(res.json.users)

}

const ManageUsers = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [users, setUsers] = useState<UserType[]>([])
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {

        (async () => {
            await fetchUsers(cookies.token, setUsers)
        })()

    }, [])

    return (
        <div>
            {success && (<div className='font-extrabold text-ownGreen'>Sukces: {success}</div>)}
            {error && (<div className='font-extrabold text-red-500'>Błąd: {error}</div>)}
            {users.map((user: UserType, index) => (
                <ManageUser user={user} key={index} setError={setError} setSuccess={setSuccess} setUsers={setUsers}/>
            ))}
        </div>
    )

}

export default ManageUsers