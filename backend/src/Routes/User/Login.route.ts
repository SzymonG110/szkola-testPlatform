import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import userModel from '../../Database/Models/user.model'
import {compare} from 'bcrypt'
import TokenUtil from '../../Utils/Token.util'

export default class extends Route {

    constructor() {
        super()

        this.route = '/user/login'

        this.methods.push({

            method: 'post',
            body: [
                'username string',
                'password string'
            ],
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                if (!req.session.user?.userId) {

                    const data = await userModel.findOne({username: req.body.username})
                    if (!data || !await compare(req.body.password, data.password)) return {
                        error: {
                            code: 403, message: 'Incorrect login or password'
                        }
                    }

                    req.session.user = {
                        userId: data.userId,
                        username: req.body.username,
                        token: await new TokenUtil().generate({
                            userId: data.userId,
                            username: data.username
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