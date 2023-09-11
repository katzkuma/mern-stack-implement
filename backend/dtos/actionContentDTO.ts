
import { Document } from 'mongoose';

export type ActionContentDTO = 
| {
    type: 'success',
    content: {
        title: '',
        message: string,
        payload: Document | Document[] | null
    }
}
| {
    type: 'error',
    content: {
        title: '',
        message: string,
        payload: string | null
    }
}
| {
    type: 'success',
    content: {
        title: 'validator-passed',
        message: string,
        payload: null
    }
}
| {
    type: 'error',
    content: {
        title: 'validator-empty-fields'
        message: string,
        payload: string[]
    }
}