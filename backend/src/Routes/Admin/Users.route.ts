import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import userModel from '../../Database/Models/user.model'
import UserType from '../../Types/User.type'
import {hash} from 'bcrypt'

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

        this.methods.push({

            method: 'post',
            mustLogged: true,
            admin: true,
            body: [
                '?[string] username',
                '?[string] password',
                '?[boolean] deleted',
                '?[boolean] admin',
                '[string] userId'
            ],
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                let toUpdate: any = {
                    userId: req.body.userId
                }

                if (req.body.username && req.body.username.length >= 3) toUpdate['username'] = req.body.username
                if (req.body.password && req.body.password.length >= 3) toUpdate['password'] = await hash(req.body.password, 10)
                toUpdate['deleted'] = !!req.body.deleted

                const user = await userModel.findOneAndUpdate({
                    deleted: false,
                    userId: req.body.userId
                }, {
                    ...toUpdate
                }) as UserType

                return {
                    success: {
                        user
                    }
                }

            }

        })

    }

}