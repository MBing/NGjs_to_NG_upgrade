import {
    ADD_THREAD,
    ADD_MESSAGE,
    SELECT_THREAD,
} from './threads.actions';

const INITIAL_STATE = {
    ids: [],
    currentThreadId: null,
    entities: {},
};

export const ThreadsReducer = (state = INITIAL_STATE, {meta, payload, type}) => {
    switch (type) {
        case ADD_THREAD:
            {
                const thread = payload.thread;

                if (state.ids.includes(thread.id)) {
                    return state;
                }

                return {
                    ids: [...state.ids, thread.id],
                    currentThreadId: state.currentThreadId,
                    entities: Object.assign({}, state.entities, {
                        [thread.id]: thread,
                    }),
                };
            }
            break;
        case ADD_MESSAGE:
            {
                const thread = payload.thread;
                const message = payload.message;

                const isRead = (message.thread.id === state.currentThreadId) ? true : message.isRead;
                const newMessage = Object.assign({}, message, { isRead: isRead });

                const oldThread = state.entities[thread.id];

                const newThread = Object.assign({}, oldThread, {
                    messages: [...(oldThread.messages || []), newMessage]
                });

                return {
                    ids: state.ids,
                    currentThreadId: state.currentThreadId,
                    entities: Object.assign({}, state.entities, {
                        [thread.id]: newThread,
                    }),
                }
            }
            break;
        case SELECT_THREAD:
            {}
            break;
        default:
            return state;
    }
};
