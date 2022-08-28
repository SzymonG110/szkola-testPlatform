import {readdirSync} from 'fs'
import {Application, NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from './Types/Route.type'

export default class Handler {

    constructor(private app: Application) {

        const table: (Omit<Route, 'methods'> & { filePath: string, methods: string })[] = []

        readdirSync(`${__dirname}/Routes`).filter(fileName => !fileName.startsWith('--')).forEach((category: string) => {

            if (category.endsWith('.js')) {

                const route: Route = new (require(`${__dirname}/Routes/${category}`).default)
                if (this.setupRoute(route))
                    table.push({
                        route: route.route,
                        methods: route.methods.map(method => method.method).join(', '),
                        filePath: `/${category}`
                    })

            } else {

                readdirSync(`${__dirname}/Routes/${category}`).filter(fileName => !fileName.startsWith('--') && fileName.endsWith('.js')).forEach((file: string) => {


                    const route: Route = new (require(`${__dirname}/Routes/${category}/${file}`).default)
                    if (this.setupRoute(route))
                        table.push({
                            route: route.route,
                            methods: route.methods.map(method => method.method).join(', '),
                            filePath: `/${category}/${file}`
                        })

                })

            }

        })

        console.table(table)

    }

    private setupRoute(routes: Route): boolean {

        try {

            routes.methods.forEach(route => {
                this.app[route.method](routes.route, async (req: Request, res: Response, next: NextFunction) => {

                        if (route.mustLogged && !req.session.user)
                            return res.status(401).json({message: 'Unauthorized.'})

                        const output: RouteOutput = await route.run(req, res, next)

                        if (output.success) {

                            res.send(output.success)

                        } else if (output.error) {

                            res.status(output.error.code).send(output.error)

                        } else if (output.render) {

                            res.render(output.render.file, {

                                ...output.render.data,
                                oauthUser: req.session.oauthUser,
                                user: req.session.user
                            })

                        } else if (output.redirect) {

                            res.redirect(output.redirect)

                        }

                    }
                )

            })

            return true

        } catch
            (e) {

            console.log(`Error while setting up route ${routes.route}.\n${e}`)
            return false

        }

    }

}