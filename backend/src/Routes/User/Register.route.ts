import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import userModel from '../../Database/Models/user.model'
import {hash} from 'bcrypt'
import TokenUtil from '../../Utils/Token.util'

export default class extends Route {

    constructor() {
        super()

        this.route = '/user/register'

        this.methods.push({

            method: 'post',
            body: [
                'username string',
                'password string'
            ],
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                if (!req.session.user?.userId) {

                    if (req.body.username.length < 3 || req.body.password.length < 3) return {
                        error: {
                            code: 403, message: 'Login or password lenght is too short'
                        }
                    }

                    const data = await userModel.findOne({username: req.body.username})
                    if (data) return {
                        error: {
                            code: 409, message: 'User with this username already exists'
                        }
                    }

                    const userId = await userModel.count() + 1
                    userModel.create({
                        userId,
                        username: req.body.username,
                        password: await hash(req.body.password, 10)
                    })

                    req.session.user = {
                        userId,
                        username: req.body.username,
                        token: await new TokenUtil().generate({
                            userId: userId,
                            username: req.body.username
                        })
                    }

                }

                return {
                    success: {
                        ...req.session.user
                    }
                }

            }

        })

    }

}