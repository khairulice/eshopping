import { guestRequestConstants } from '../_constants';

export const guestRequestActions = {
    updateCompletedNumber
}

function updateCompletedNumber(length){
    return dispatch =>{       
        dispatch({ type: guestRequestConstants.GUEST_REQUEST_COMPLETED, completed: length });
    }
    
}

