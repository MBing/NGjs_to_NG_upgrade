import {
    ADD_THREAD,
    ADD_MESSAGE,
    SELECT_THREAD,
    GET_MESSAGES_REQUEST,
} from './threads.actions';

const INITIAL_STATE = {
    isFetching: false,
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
                    isFetching: false,
                    ids: [...state.ids, thread.id],
                    currentThreadId: state.currentThreadId,
                    entities: Object.assign({}, state.entities, {
                        [thread.id]: thread,
                    }),
                };
            }
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
                    isFetching: false,
                    ids: state.ids,
                    currentThreadId: state.currentThreadId,
                    entities: Object.assign({}, state.entities, {
                        [thread.id]: newThread,
                    }),
                }
            }
        case SELECT_THREAD:
            {
                const thread = payload.thread;
                const oldThread = state.entities[thread.id];

                const newThread = Object.assign({}, oldThread, {
                    messages: payload.messages.filter(message => message.thread.id === thread.id ),
                    unreadCount: 0,
                });

                return {
                    isFetching: false,
                    ids: state.ids,
                    currentThreadId: thread.id,
                    entities: Object.assign({}, state.entities, {
                        [thread.id]: newThread,
                    }),
                };
            }
        case GET_MESSAGES_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
            });
        default:
            return state;
    }
};
