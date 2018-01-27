import {
  ADD_THREAD,
  ADD_MESSAGE,
  SELECT_THREAD,
  GET_MESSAGES_REQUEST,
  POST_MESSAGE_REQUEST
} from './threads.actions';

const INITIAL_STATE = {
  isFetching: false,
  isPosting: false,
  ids: [],
  currentThreadId: null,
  entities: {}
};

/**
 * The `ThreadsReducer` describes how to modify the threads state given a
 * particular action.
 */
export const ThreadsReducer =
  function(state = INITIAL_STATE, {meta, payload, type}) {
  switch (type) {

    // Adds a new Thread to the list of entities
    case ADD_THREAD: {
      const thread = payload.thread;

      if (state.ids.includes(thread.id)) {
        return state;
      }

      return {
        ids: [ ...state.ids, thread.id ],
        currentThreadId: state.currentThreadId,
        entities: Object.assign({}, state.entities, {
          [thread.id]: thread
        })
      };
    }

    // Adds a new Message to a particular Thread
    case ADD_MESSAGE: {
      const thread = payload.thread;
      const newMessage = payload.message;

      // grab the old thraed from entities
      const oldThread = state.entities[thread.id];

      // create a new thread which has our newMessage
      const newThread = Object.assign({}, oldThread, {
        messages: [...(oldThread.messages || []), newMessage]
      });

      return {
        isFetching: false,
        isPosting: false,
        ids: state.ids, // unchanged
        currentThreadId: state.currentThreadId, // unchanged
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      };
    }

    // Select a particular thread in the UI
    case SELECT_THREAD: {
      const thread = payload.thread;
      const oldThread = state.entities[thread.id];

      const newThread = Object.assign({}, oldThread, {
        messages: payload.messages.filter(message => message.thread.id === thread.id),
        unreadCount: 0
      });

      return {
        isFetching: false,
        ids: state.ids,
        currentThreadId: thread.id,
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      };
    }

    case GET_MESSAGES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })

    case POST_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        isPosting: true
      })

    default:
      return state;
  }
};
