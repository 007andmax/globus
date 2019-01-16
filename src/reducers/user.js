/**
 * Created by Макс on 29.10.2017.
 */
//import { ADD_USER, EDIT_USER, UPDATE_USER,REMOVE_USER } from "../constants/action-user";

const initialState = {};
const userReducer = function(state = initialState, action) {
 /* switch (action.type) {
    case ADD_USER:
      return { action: ADD_USER, data: Object.assign({}, state, action.data) };
    case EDIT_USER:
      return { action: EDIT_USER, data: Object.assign({}, state, action.data) };
      case REMOVE_USER:
      return { action: REMOVE_USER, data: Object.assign({}, state, action.data) };
    case UPDATE_USER:
      return {
        action: UPDATE_USER,
        data: Object.assign({}, state, action.data)
      };
    default:
      return { action: "", data: initialState };
  }*/
  return state;
};
export default userReducer;
