import {NextFunction, Request, Response} from 'express'
import Route, {RouteOutput} from '../../Types/Route.type'
import QuestionType from '../../Types/Question.type'

export default class extends Route {

    constructor() {
        super()

        this.route = '/test/questions'

        this.methods.push({

            method: 'get',
            async run(req: Request, res: Response, next: NextFunction): Promise<RouteOutput> {

                const questions: QuestionType[] = [
                    {
                        title: 'Test1',
                        answers: [
                            {
                                answer: 'test1',
                                correct: false
                            },
                            {
                                answer: 'test2',
                                correct: true
                            }
                        ],
                        authorId: 1
                    },
                    {
                        title: 'Test2',
                        answers: [
                            {
                                answer: 'test1',
                                correct: false
                            },
                            {
                                answer: 'test2',
                                correct: true
                            }
                        ],
                        authorId: 1
                    }
                ]

                const drawn: QuestionType[] = []
                const number: number = 20

                while (drawn.length !== number) {
                    if (drawn.length === questions.length)
                        break

                    const random = questions[Math.floor(Math.random() * questions.length)]
                    if (!drawn.find(d => d.title === random.title)) drawn.push(random)
                }

                return {
                    success: {
                        questions,
                        drawn
                    }
                }

            }

        })

    }

}