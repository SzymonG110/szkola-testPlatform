import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import userModel from '../../Database/Models/user.model'
import UserType from '../../Types/User.type'

export default class extends Route {

    constructor() {
        super()

        this.route = '/admin/users'

        this.methods.push({

            method: 'get',
            mustLogged: true,
            admin: true,
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                const users = await userModel.find({
                    deleted: false
                }) as UserType[]

                return {
                    success: {
                        users
                    }
                }

            }

        })

    }

}