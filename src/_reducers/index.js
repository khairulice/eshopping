import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { alert } from './alert.reducer';


const rootReducer = combineReducers({
    loginReducer,
    alert
});

export default rootReducer;