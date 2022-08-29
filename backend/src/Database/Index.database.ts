import {connect} from 'mongoose'

export default class IndexDatabase {

    public async connect(): Promise<void> {

        await connect('mongodb://127.0.0.1:27017/szkolaTest')
        console.log('Connected with database')

    }

}