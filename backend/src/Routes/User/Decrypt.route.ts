import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import TokenUtil from '../../Utils/Token.util'

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
                    return {
                        success: {
                            ...await new TokenUtil().decrypt(req.body.token)
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