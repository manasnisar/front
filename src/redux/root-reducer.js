import {combineReducers} from 'redux'
import authReducer from './auth/auth-reducer'



const rootReducer = combineReducers({
    authState : authReducer,
})

export default rootReducer