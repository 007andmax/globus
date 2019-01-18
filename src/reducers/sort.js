
 import {SET_SORT } from "../constants/menu";

 const initialState = {};
 const sortReducer = function(state = initialState, action) {
   switch (action.type) {
     case SET_SORT:
       return { action: SET_SORT, sort: action.sort };
     default:
       return { action: "", data: initialState };
   }
   return state;
 };
 export default sortReducer;
 