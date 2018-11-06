import { guestRequestConstants } from '../_constants';

export function guestRequestReducer(state = { completed: 0 }, action) {
    switch (action.type) {
        case guestRequestConstants.GUEST_REQUEST_COMPLETED:
            return { completed: action.completed };
        default:
            return state
    }
}