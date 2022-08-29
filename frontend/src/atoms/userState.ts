import {atom} from 'recoil'

export default atom({
    key: 'userState',
    default: {
        username: undefined,
        admin: false
    }
})