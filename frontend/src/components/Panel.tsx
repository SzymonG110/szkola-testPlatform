import {useRecoilState} from 'recoil'
import userState from '../atoms/userState'
import {useCookies} from 'react-cookie'
import {useEffect, useState} from 'react'
import AddQuestion from './AddQuestion'
import gsap from 'gsap'

const Panel = () => {

    const [user, setUser] = useRecoilState(userState)
    const [modalAddQuestionOpen, setModalAddQuestionOpen] = useState<boolean>(false)
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    useEffect(() => {

        (async () => {

            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/decrypt`, {

                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: cookies.token
                })

            })

            const json = await res.json()
            res.status === 200 && setUser({
                username: json.username,
                admin: json.admin
            })

        })()

    }, [])

    const handleModalOpen = () => {

        gsap.to('#modalAddQuestion', {display: 'grid', opacity: 1})

    }

    return (
        <div>
            <AddQuestion/>
            <div onClick={handleModalOpen}>Dodaj pytanie</div>
        </div>
    )

}

export default Panel