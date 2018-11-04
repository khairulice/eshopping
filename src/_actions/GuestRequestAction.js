import { guestRequestConstants, loginConstants } from '../_constants';
import { guestRequestService } from "../_services";

export const guestRequestActions = {
    list,   
    reply
};

function list(){  
  return dispatch => {
    guestRequestService.list().subscribe({
        next: requests => {
            dispatch({type:guestRequestConstants.GUEST_REQUEST_LIST,requests})
        },
        error:err => {
            dispatch(failure(err));
            //dispatch(alertActions.error(error));
        }
    });   
    
};
function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
}

function reply(id){
    return dispatch =>{
        guestRequestService.reply(id);
        dispatch({type:guestRequestConstants.GUEST_REQUEST_REPLY,id});
    }
    
}

