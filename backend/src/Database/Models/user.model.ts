import {model, Schema} from 'mongoose'
import UserType from '../../Types/User.type'

const userModel = model<UserType>('user', new Schema({

    userId: {
        type: Number, required: true, unique: true
    },

    username: {
        type: String, required: true, unique: true
    },

    password: {
        type: String, required: true
    },

    admin: {
        type: Boolean, default: false
    }

}))

export default userModel