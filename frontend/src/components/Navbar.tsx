import {Link} from 'react-router-dom'
import {useRecoilState} from "recoil";
import userState from "../atoms/userState";

const Navbar = () => {

    const [user, setUser] = useRecoilState(userState)

    return (
        <div>
            {!user && (<Link to='/login'>Zaloguj się</Link>)}
        </div>
    )

}

export default Navbar