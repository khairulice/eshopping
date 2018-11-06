import { guestRequestConstants, loginConstants } from '../_constants';
import { guestRequestService } from "../_services";

export const guestRequestActions = {
    updateCompletedNumber
}


function updateCompletedNumber(length){
    return dispatch =>{       
        dispatch({ type: guestRequestConstants.GUEST_REQUEST_COMPLETED, completed: length });
    }
    
}

