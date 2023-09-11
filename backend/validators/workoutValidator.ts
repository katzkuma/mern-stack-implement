import { Request } from "express"
import { workoutInterface } from "../models/workoutModel"
import { ActionContentDTO } from "../dtos/actionContentDTO"

// validate if there is an empty field
export const workoutValidator = (req: Request): ActionContentDTO => {
    const {title, load, reps}: workoutInterface = req.body

    let emptyFields: string[] = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length = 0) {
        return {type: 'success', content: {title: "validator-passed", message: 'Validation passed', payload: null}}
    }

    return {type: 'error', content: {title: "validator-empty-fields", message: '', payload: emptyFields}}
}