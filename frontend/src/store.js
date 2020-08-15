import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import articleReducer from './reducers/articleReducer'
import usersReducer from './reducers/usersReducer'
const reducers = combineReducers({users: usersReducer, articles: articleReducer})

const store = createStore(reducers, applyMiddleware(thunk))

export default store

