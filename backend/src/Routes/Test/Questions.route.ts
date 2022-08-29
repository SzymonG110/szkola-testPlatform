import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import QuestionType from '../../Types/Question.type'
import questionModel from '../../Database/Models/question.model'
import TokenUtil from '../../Utils/Token.util'

export default class extends Route {

    constructor() {
        super()

        this.route = '/test/questions'

        this.methods.push({

            method: 'get',
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                const questions: QuestionType[] = await questionModel.find()
                const drawn: QuestionType[] = []
                const number: number = 20

                while (drawn.length !== number) {
                    if (drawn.length === questions.length)
                        break

                    const random = questions[Math.floor(Math.random() * questions.length)]
                    if (!drawn.find(d => d.question === random.question)) drawn.push(random)
                }

                return {
                    success: {
                        questions,
                        drawn
                    }
                }

            }

        })

        this.methods.push({

            method: 'post',
            body: [
                '[string] question',
                '[{answer: string; correct: boolean}[]] answers'
            ],
            mustLogged: true,
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                if (await questionModel.findOne({question: req.body.question}))
                    return {
                        error: {
                            code: 409, message: 'This question is in database'
                        }
                    }

                const authorId = (await new TokenUtil().decrypt(req.body.token as string)).userId

                questionModel.create({
                    question: req.body.question,
                    answers: req.body.answers,
                    authorId
                })

                return {
                    success: {
                        question: req.body.question,
                        answers: req.body.answers,
                        authorId
                    }
                }

            }

        })

    }

}