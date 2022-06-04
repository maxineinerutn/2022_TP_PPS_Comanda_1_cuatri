import { LoaderTypes } from './loaderReducer';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import authReducer, { AuthTypes } from './authReducer'
import loaderReducer from './loaderReducer';

export interface IStore{
    auth:AuthTypes,
    loader:LoaderTypes
}

const rootReducer = combineReducers<IStore>({
    auth: authReducer,
    loader: loaderReducer
})

export default function generateStore() {
    const store = createStore( rootReducer, compose( applyMiddleware(thunk) ) )
    return store
}