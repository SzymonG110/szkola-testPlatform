export interface AnswerType {
    answer: string
    correct: boolean
}

export default interface QuestionType {

    question: string
    answers: AnswerType[]
    authorId: number

}