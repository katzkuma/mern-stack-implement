import { useState, FormEvent } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import Workout, { createEmptyWorkout } from '../models/WorkoutModel';

const WorkoutForm = () => {
    const[workout, setWorkout] = useState<Workout>(createEmptyWorkout())
    const[error, setError] = useState<string | null>('')
    const[emptyFields, setEmptyFields] = useState<string[]>([])

    const { dispatch } = useWorkoutsContext()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // const workout = { title, load, reps }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.content)
        }

        if(response.ok) {
            setWorkout({
                _id: '', 
                title: '',
                load: 0,
                reps: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            setError(null)
            setEmptyFields([])
            console.log('new workout added')
            dispatch({ type: "CREATE_WORKOUT", payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Excersize Title:</label>
            <input 
                type="text"
                onChange={(e) => setWorkout({...workout, title: e.target.value})}
                value={ workout.title }
                className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={(e) => setWorkout({...workout, load: parseFloat(e.target.value)})}
                value={ workout.load }
                className={emptyFields.includes('load') ? 'error' : ''}
            />
            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setWorkout({...workout, reps: parseFloat(e.target.value)})}
                value={workout.reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm