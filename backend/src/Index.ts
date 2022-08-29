import ex from 'express'
import es from 'express-session'
import Handler from './Handler'
import cors from 'cors'
import IndexDatabase from './Database/Index.database'

export class Index {

    app: ex.Express = ex()
    port: number = 8006
    secret: string = 'OIHUmouINu8JioMHEYIumbBUMuiAMmĆuyiDnuyInyuNSbiuyAuyi'

    constructor() {

        new IndexDatabase().connect()
        this.setup()
        new Handler(this.app)
        this.listen()

    }

    private setup(): void {

        this.app.use(ex.json())
        this.app.use(ex.urlencoded({extended: false}))
        this.app.use(es({
            secret: this.secret,
            cookie: {
                maxAge: 60 * 60 * 1000 //60 min
            },
            resave: true,
            saveUninitialized: true
        }))
        this.app.use(cors())

        this.app.use((req, res, next) => {
            console.log(req.url)
            console.log(req.body)
            next()
        })

    }

    private listen(): void {

        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        })

    }

}

new Index()