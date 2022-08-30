import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import userModel from '../../Database/Models/user.model'
import UserType, {roles} from '../../Types/User.type'
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
                '[string] userId',
                '?[string] username',
                '?[string] password',
                '?[boolean] deleted',
                '?[string] role'
            ],
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                // console.log(req.body)
                // console.log(req.session.user)
                // console.log(await userModel.findOne({
                //     username: req.body.username,
                //     deleted: false
                // }))

                if (await userModel.findOne({username: req.body.username, deleted: false}) &&
                    (await userModel.findOne({
                        username: req.body.username,
                        deleted: false
                    }))?.userId !== req.body.userId) return {
                    error: {
                        code: 409, message: 'Duplicated username'
                    }
                }

                let toUpdate: any = {
                    userId: req.body.userId
                }

                if (req.body.username && req.body.username.length >= 3) toUpdate['username'] = req.body.username
                if (req.body.password && req.body.password.length >= 3) toUpdate['password'] = await hash(req.body.password, 10)
                if (req.body.role && roles.includes(req.body.role)) toUpdate['role'] = req.body.role
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