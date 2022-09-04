import {model, Schema} from 'mongoose'
import StatsType from '../../Types/Stats.type'

const statsModel = model<StatsType>('stats', new Schema<StatsType>({

    userId: {
        type: Number, required: true, unique: true
    },

    percent: {
        type: Number, required: true, unique: true
    }

}))

export default statsModel