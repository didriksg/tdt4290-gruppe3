import {combineReducers} from "redux";
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import caseReducer from './caseReducer';
import uiReducer from "./uiReducer";

export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    caseState: caseReducer,
    ui: uiReducer
});