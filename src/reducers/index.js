/**
 * Created by Макс on 29.10.2017.
 */
import { combineReducers } from "redux";
import user from "./user";
import event from "./event";
import { routerReducer } from "react-router-redux";
var reducers = combineReducers({
    userState: user,
    eventState: event,
    routing: routerReducer,
});

export default reducers;
