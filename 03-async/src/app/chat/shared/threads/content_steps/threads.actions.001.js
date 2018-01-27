/**
 * threads.actions specifies _action creators_ (i.e. objects that describe
 * changes to the reducers) that are concerned with Threads and Messages
 */

export const ADD_THREAD = 'ADD_THREAD';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const SELECT_THREAD = 'SELECT_THREAD';

export const addThread = (thread) => ({
    type: ADD_THREAD,
    payload: {
      thread
    }
  });

export const addMessage = (thread, message) => ({
  type: ADD_MESSAGE,
  payload: {
    thread,
    message
  }
});

export const selectThread = (thread, messages) => ({
  type: SELECT_THREAD,
  payload: {
    thread,
    messages
  }
});

export const fetchMessages = (thread) => dispatch => {
  return $http.get(`http://localhost:3000/messages/`)
    .then(response => response.data)
    .then(data => dispatch(selectThread(thread, data)));
}
