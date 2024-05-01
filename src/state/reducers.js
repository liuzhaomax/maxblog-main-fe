import { combineReducers } from "redux"
import stats from "./reducers/stats"

const rootReducer = combineReducers({
    stats,
})

export default rootReducer