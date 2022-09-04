import {useEffect, useState} from 'react'
import fetchUtil from '../../utils/fetch'
import MapStats from './MapStats'

const Stats = () => {

    const [stats, setStats] = useState([]);

    useEffect(() => {

        (async () => setStats((await fetchUtil('test/stats', {method: 'get'})).json.stats))()

    }, [])

    return (
        <div>
            {stats.length > 0 && stats.map((userData: any, index) => (
                <MapStats username={userData.username} percent={userData.percent} key={index}/>
            ))}
        </div>
    )

}

export default Stats