import { combineReducers } from 'redux'
import moviesReducer from './moviesReducer'
import subscriptionsReducer from './subscriptionsReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({movies: moviesReducer, subscriptions: subscriptionsReducer, users: usersReducer})

export default rootReducer