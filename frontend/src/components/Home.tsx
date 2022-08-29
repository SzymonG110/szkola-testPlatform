import {Link} from 'react-router-dom'

const Home = () => {

    return (
        <div className='flex flex-col'>
            <Link to='/test' className='cursor-pointer hover:text-ownBlueHover duration-500'>Rozpocznij test</Link>
            <Link to='/questions' className='cursor-pointer hover:text-ownBlueHover duration-500'>Zobacz pytania i odpowedzi</Link>
        </div>
    )

}

export default Home