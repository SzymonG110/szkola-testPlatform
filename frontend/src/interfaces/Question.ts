export interface QuestionType {

    question: string
    answers: {
        answer: string
        correct: boolean
    }[]
    authorId: number

}

export interface AnswerType {
    index: number
    title: string
    answer: string
}