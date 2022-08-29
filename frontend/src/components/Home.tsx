import {Link} from 'react-router-dom'

const Home = () => {

    return (
        <div className='flex flex-col'>
            <Link to='/test'>Rozpocznij test</Link>
            <Link to='/questions'>Zobacz pytania i odpowedzi</Link>
        </div>
    )

}

export default Home