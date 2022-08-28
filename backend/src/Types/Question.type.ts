export default interface QuestionType {

    title: string
    answers: {
        answer: string
        correct: boolean
    }[]
    authorId: number

}