import { createContext, useReducer, ReactNode, Dispatch } from "react";
import Workout, { createEmptyWorkout } from '../models/WorkoutModel';

export const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined)

interface WorkoutsReducerProp {
    workouts: Workout[] 
}

// declare dynamic Action type depends on type property
type Action = 
    | { type: 'SET_WORKOUTS'; payload: Workout[] }
    | { type: 'CREATE_WORKOUT'; payload: Workout }
    | { type: 'DELETE_WORKOUT'; payload: Workout };

// update data locally
export const workoutsReducer = (state: WorkoutsReducerProp, action: Action): WorkoutsReducerProp => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                // NTBT
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w: Workout) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

interface WorkoutsContextType {
    dispatch: Dispatch<Action>;
    workouts: Workout[];
  }

export const WorkoutsContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: [createEmptyWorkout()]
    }, undefined); // NTBT

    return (
        <WorkoutsContext.Provider value={{ ...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}