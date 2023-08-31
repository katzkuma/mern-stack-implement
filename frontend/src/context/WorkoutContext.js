import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

// update data locally
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        default:
            return state
    }
}

export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer( workoutsReducer, {
        workouts: null
    })

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}