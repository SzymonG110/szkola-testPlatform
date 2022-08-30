import {useRecoilState} from 'recoil'
import userState from '../atoms/userState'
import {useCookies} from 'react-cookie'
import {useEffect, useState} from 'react'
import AddQuestion from './AddQuestion'
import fetchUtil from '../utils/fetch'

const Panel = () => {

    const [user, setUser] = useRecoilState(userState)
    const [modalAddQuestionOpen, setModalAddQuestionOpen] = useState<boolean>(false)
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    useEffect(() => {

        (async () => {

            const res = await fetchUtil('user/decrypt', {
                method: 'post',
                body: {
                    token: cookies.token
                }
            })

            res.status === 200 && setUser({
                username: res.json.username,
                admin: res.json.admin
            })

        })()

    }, [])

    const handleModalOpen = () => {

        document.getElementById('modalAddQuestion')?.classList.remove('hidden')

    }

    return (
        <div>
            <AddQuestion/>
            <div onClick={handleModalOpen}>Dodaj pytanie</div>
        </div>
    )

}

export default Panel