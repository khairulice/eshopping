import { guestRequestConstants } from '../_constants';

export function guestRequestReducer(state = {}, action) {
    switch (action.type) {
        case guestRequestConstants.GUEST_REQUEST_LIST:
            return {requests: action.requests};
            case guestRequestConstants.GUEST_REQUEST_REPLY:
            return state.map(r=> r.id===action.id ? {...r, status:"Serving"}:r);
        default:
            return state
    }
}