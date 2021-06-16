import sortReducer from './sort/sort.reducer'
import { combineReducers } from 'redux'

export default combineReducers({
    sort: sortReducer
})