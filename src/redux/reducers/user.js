import { reduxEvent } from "../../constants";
import { sessionManager } from '../../managers/sessionManager';

const initialState = {
    isLoggedIn: localStorage.getItem(isLoggedIn),
    userInfo: localStorage.getItem(userInfo)
}
export default function user(state = initialState, action) {
    switch (action.type) {
        case reduxEvent.LOGGED_IN:
            return {
                isLoggedIn: true,
                userInfo: action.data
            }
        case reduxEvent.LOGGED_OUT:
            return {
                isLoggedIn: false,
                userInfo: ""
            }


        default:
            return state;
    }
}