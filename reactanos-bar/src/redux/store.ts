import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import authReducer, { AuthTypes } from './authReducer'

export interface IStore{
    auth:AuthTypes
}

const rootReducer = combineReducers<IStore>({
    auth: authReducer
})

export default function generateStore() {
    const store = createStore( rootReducer, compose( applyMiddleware(thunk) ) )
    return store
}