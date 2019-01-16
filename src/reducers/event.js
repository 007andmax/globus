/**
 * Created by Макс on 29.10.2017.
 */
//import {ERROR } from "../constants/event";

const initialState = {};
const eventReducer = function(state = initialState, action) {
 /* switch (action.type) {
    case ERROR:
      return { action: ERROR, data: Object.assign({}, state, action.data) };
    default:
      return { action: "", data: initialState };
  }*/
  return state;
};
export default eventReducer;
