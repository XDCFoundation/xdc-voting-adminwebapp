let initialState = {
    userInfo:{}
};
export default function user(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':{

        }
        default:
            return state;
    }
}