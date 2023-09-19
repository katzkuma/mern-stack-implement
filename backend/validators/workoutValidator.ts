import { Request } from "express"
import { Types } from 'mongoose';
import { workoutInterface } from "../models/workoutModel"
import { ActionContentDTO } from "../dtos/actionContentDTO"

// validate if the id of workoutRequest is valid
export const isIdValidValidator = (_id: string): boolean => {
    if (!Types.ObjectId.isValid(_id)) {
        return false
    }
    return true
}

// validate if there is an empty field
export const createWorkoutValidator = (req: Request): ActionContentDTO => {
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
    console.log(emptyFields.length)
    if(emptyFields.length == 0) {
        return {type: 'success', content: {title: "validator-passed", message: 'Validation passed', payload: null}}
    }

    return {type: 'error', content: {title: "validator-empty-fields", message: '', payload: emptyFields}}
}