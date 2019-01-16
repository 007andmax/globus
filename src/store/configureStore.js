import { createStore, applyMiddleware, compose } from "redux";
import rootReducer   from "../reducers";
import {createLogger} from "redux-logger";

export default function configureStore(initialState) {
    const logger = createLogger()
    const store = createStore(
        rootReducer ,
        initialState,
   ) 
    return store
}