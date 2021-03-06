export const ADD_THREAD = 'ADD_THREAD';
export const SELECT_THREAD = 'SELECT_THREAD';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';

export const addThread = (thread) => ({
    type: ADD_THREAD,
    payload: {
        thread,
    },
});

export const selectThread = (thread, messages) => ({
    type: SELECT_THREAD,
    payload: {
        thread,
        messages,
    },
});

export const getMessagesRequest = (thread) => ({
    type: GET_MESSAGES_REQUEST,
    payload: {
        thread
    }
});

export const postMessageRequest = (thread) => ({
    type: POST_MESSAGE_REQUEST,
    payload: {
        thread
    }
});

// export const fetchMessages = (thread) => (dispatch) => {
//     return $http.get('http://localhost:3000/messages/')
//                 .then(response => response.data)
//                 .then(data => dispatch(selectThread(thread, data)));
// };

export const addMessage = (thread, message) => ({
    type: ADD_MESSAGE,
    payload: {
        thread,
        message,
    }
});
