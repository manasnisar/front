import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import projectReducer from "./project/project-reducer";
import epicReducer from "./epic/epic-reducer";

const rootReducer = combineReducers({
  userState: userReducer,
  projectState: projectReducer,
  epicState: epicReducer
});

export default rootReducer;
