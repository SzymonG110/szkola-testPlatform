import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'

export default class extends Route {

    constructor() {
        super()

        this.route = '/user/decrypt'

        this.methods.push({

            method: 'post',
            mustLogged: true,
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                return {
                    success: {
                        ...req.session.user
                    }
                }

            }

        })

    }

}