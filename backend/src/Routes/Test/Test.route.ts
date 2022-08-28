import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'

export default class extends Route {

    constructor() {
        super()

        this.route = '/test/questions'

        this.methods.push({

            method: 'get',
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                const questions: [] = []

                return  {
                    success: {
                        questions
                    }
                }

            }

        })

    }

}