import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import TokenUtil from '../../Utils/Token.util'
import userModel from '../../Database/Models/user.model'

export default class extends Route {

    constructor() {
        super()

        this.route = '/user/decrypt'

        this.methods.push({

            method: 'post',
            body: [
                '[string] token'
            ],
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                try {
                    const decrypted = await new TokenUtil().decrypt(req.body.token)
                    const data = await userModel.findOne({userId: decrypted.userId})

                    return {
                        success: {
                            userId: data?.userId,
                            username: data?.username,
                            admin: data?.admin
                        }
                    }
                } catch (e) {
                    return {
                        error: {
                            code: 422, message: 'Incorrect JWT token'
                        }
                    }
                }

            }

        })

    }

}