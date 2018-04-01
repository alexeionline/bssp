import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import objects from "./objects";

export default combineReducers({
  routing: routerReducer,
  objects
});
