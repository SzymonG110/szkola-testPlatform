import {NextFunction, Request, Response} from 'express'
import UserType from './User.type'

export interface RouteOutput {

    success?: {

        [x: string]: any

    }

    error?: {

        code: number
        message: string

    }

    render?: {

        file: string
        data?: {

            [x: string]: any

        }

    },

    redirect?: string

}

declare module 'express-session' {

    interface SessionData {

        user: Omit<UserType, 'password'>

        [x: string]: any

    }

}

export default abstract class Route {

    route: string = '/'
    methods: {

        method: 'get' | 'post'
        permissions?: Permissions[]
        mustLogged?: boolean
        body?: string[]
        run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput>

    }[] = []

}

