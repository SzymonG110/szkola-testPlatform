export interface QuestionType {

    title: string
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