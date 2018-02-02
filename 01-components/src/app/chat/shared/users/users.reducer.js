import {
    SET_CURRENT_USER,
} from './users.actions';

const INITIAL_STATE = {
    currentUser: null
};

export const UsersReducer = (state = INITIAL_STATE, {meta, payload, type}) => {
    switch (type) {
        case SET_CURRENT_USER:
            const user = payload.user;
            return {
                currentUser: user,
            };
        default:
            return state;
    }
};
