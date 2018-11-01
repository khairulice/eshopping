import { combineReducers } from 'redux';
import { loginReducer } from './LoginReducer';
import { alert } from './AlertReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'


const rootReducer = combineReducers({
    loginReducer,
    alert,
    toastr: toastrReducer
});

export default rootReducer;