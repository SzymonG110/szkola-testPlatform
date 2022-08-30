export const roles: UserType['role'][] = ['user', 'admin']

export default interface UserType {

    userId: number
    username: string
    password: string
    deleted: boolean
    role: 'user' | 'admin'

}