import {Link} from 'react-router-dom'

const Home = () => {

    return (
        <div className='flex justify-center items-center fixed h-screen w-screen'>
            <div className='flex flex-col bg-gray-200 p-24 text-xl font-bold text-center rounded-full'>
                <Link to='/test' className='text-2xl font-extrabold cursor-pointer hover:text-ownBlueHover duration-500'>Rozpocznij test</Link>
                <Link to='/questions' className='cursor-pointer hover:text-ownBlueHover duration-500'>Zobacz pytania i odpowedzi</Link>
                <Link to='/stats' className='cursor-pointer hover:text-ownBlueHover duration-500'>Zobacz statystyki</Link>
            </div>
        </div>
    )

}

export default Home