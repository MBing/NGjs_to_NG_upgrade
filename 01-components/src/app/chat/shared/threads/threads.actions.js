import { uuid } from './utilities/util';

export const ADD_THREAD = 'ADD_THREAD';
export const SELECT_THREAD = 'SELECT_THREAD';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addThread = (thread) => {
    type: ADD_THREAD,
    payload: {
        thread,
    },
};

export const selectThread = (thread) => {
    type: SELECT_THREAD,
        payload: {
        thread,
    },
};

export const addMessage = (thread, messageArgs) => {
    const defaults = {
        id: uuid(),
        sentAt: new Date(),
        isRead: false,
        thread: thread,
    };
    const message = Object.assign({}, defaults, messageArgs);

    return {
        type: ADD_MESSAGE,
        payload: {
            thread,
            message,
        },
    };
};
