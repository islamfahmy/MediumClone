import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import articleReducer from './reducers/articleReducer'
const reducers = combineReducers({})

const store = createStore(articleReducer, applyMiddleware(thunk))

export default store

