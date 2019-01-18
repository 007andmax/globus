
 import {SHOW_ALERT } from "../constants/alert";

const initialState = {};
const alertReducer = function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT:
      return { action: SHOW_ALERT, head: action.head,content: action.content };
    default:
      return { action: "", data: initialState };
  }
  return state;
};
export default alertReducer;
