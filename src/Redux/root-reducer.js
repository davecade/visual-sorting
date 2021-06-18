import sortReducer from './sort/sort.reducer'
import stopReducer from './stop/stop.reducer'
import { combineReducers } from 'redux'

export default combineReducers({
    sort: sortReducer,
    stop: stopReducer
})