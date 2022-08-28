import ex from 'express'
import es from 'express-session'
import Handler from './Handler'
import cors from 'cors'

export class Index {

    app: ex.Express = ex()
    port: number = 8006
    secret: string = 'OIHUmouINu8JioMHEYIumbBUMuiAMmĆuyiDnuyInyuNSbiuyAuyi'

    constructor() {

        this.setup()
        new Handler(this.app)
        this.listen()

    }

    private setup(): void {

        this.app.use(ex.json())
        this.app.use(ex.urlencoded({extended: false}))
        this.app.use(es({
            secret: `${this.secret}`,
            cookie: {
                maxAge: 60 * 60 * 1000 //60 min
            },
            resave: true,
            saveUninitialized: true
        }))

        //@ts-ignore
        this.app.use(cors())

    }

    private listen(): void {

        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        })

    }

}

new Index()