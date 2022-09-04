import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import statsModel from '../../Database/Models/stats.model'
import userModel from '../../Database/Models/user.model'

export default class extends Route {

    constructor() {
        super()

        this.route = '/test/stats'

        this.methods.push({

            method: 'get',
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                const sorted = await statsModel.find().sort('percent')
                const stats = await Promise.all(sorted.map(async data => {
                    return {
                        userId: data.userId,
                        percent: data.percent,
                        username: (await userModel.findOne({userId: data.userId}))?.username
                    }
                }))

                return {
                    success: {
                        stats
                    }
                }

            }

        })

        this.methods.push({

            method: 'post',
            mustLogged: true,
            body: [
                '[number] percent'
            ],
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                const userId = req.session.user?.userId
                if (await statsModel.findOne({userId}))
                    await statsModel.updateOne({userId}, {percent: req.body.percent})
                else await statsModel.create({userId, percent: req.body.percent})

                return {
                    success: {
                        percent: req.body.percent,
                        userId: req.body.userId
                    }
                }

            }

        })

    }

}