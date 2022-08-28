import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'

export default class extends Route {

    constructor() {
        super()

        this.route = '/user/login'

        this.methods.push({

            method: 'post',
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                const userId = 1
                const username = 'OK'
                req.session.user = {
                    userId,
                    username
                }

                return  {
                    success: {
                        username,
                        userId
                    }
                }

            }

        })

    }

}