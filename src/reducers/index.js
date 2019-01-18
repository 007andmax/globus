/**
 * Created by Макс on 29.10.2017.
 */
import { combineReducers } from "redux";
import alert from "./alert";
import sort from "./sort";
import { routerReducer } from "react-router-redux";
var reducers = combineReducers({
    alertState: alert,
    sortState: sort,
    routing: routerReducer,
});

export default reducers;
