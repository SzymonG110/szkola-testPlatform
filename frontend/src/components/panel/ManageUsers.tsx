import {useEffect, useState} from 'react'
import UserType from '../../interfaces/User'
import fetchUtil from '../../utils/fetch'
import {useCookies} from 'react-cookie'
import ManageUser from './ManageUser'

const ManageUsers = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {

        (async () => {

            const res = await fetchUtil('admin/users', {
                method: 'get',
                token: cookies.token
            })
            res.status === 200 && setUsers(res.json.users)

        })()

    }, [])

    return (
        <div>
            {users.map((user, index) => (
                <ManageUser user={user} key={index}/>
            ))}
        </div>
    )

}

export default ManageUsers