import {model, Schema} from 'mongoose'
import QuestionType from '../../Types/Question.type'

const questionModel = model<QuestionType>('question', new Schema({

    question: {
        type: String, unique: true, required: true
    },

    answers: {
        type: [{answer: String, correct: Boolean}], unique: true, required: true
    },

    authorId: {
        type: Number, required: true
    }

}))

export default questionModel