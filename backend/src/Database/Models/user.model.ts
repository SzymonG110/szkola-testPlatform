import {model, Schema} from 'mongoose'
import UserType from '../../Types/User.type'

const userModel = model<UserType>('user', new Schema<UserType>({

    userId: {
        type: Number, required: true, unique: true
    },

    username: {
        type: String, required: true
    },

    password: {
        type: String, required: true
    },

    deleted: {
        type: Boolean, default: false
    },

    role: {
        type: String, default: 'user'
    }

}))

export default userModel