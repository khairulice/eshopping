import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { alert } from './alert.reducer';
import {reducer as toastrReducer} from 'react-redux-toastr'


const rootReducer = combineReducers({
    loginReducer,
    alert,
    toastr: toastrReducer
});

export default rootReducer;