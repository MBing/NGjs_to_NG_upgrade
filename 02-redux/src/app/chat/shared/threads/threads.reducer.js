import {
  ADD_THREAD,
  ADD_MESSAGE,
  SELECT_THREAD
} from './threads.actions';

const INITIAL_STATE = {
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
      const message = payload.message;

      // special case: if the message being added is in the current thread, then
      // mark it as read
      const isRead = message.thread.id === state.currentThreadId ? true : message.isRead;
      const newMessage = Object.assign({}, message, { isRead: isRead });

      // grab the old thraed from entities
      const oldThread = state.entities[thread.id];

      // create a new thread which has our newMessage
      const newThread = Object.assign({}, oldThread, {
        messages: [...(oldThread.messages || []), newMessage]
      });

      return {
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

      // mark the messages as read
      const newMessages = (oldThread.messages || []).map(
        (message) => Object.assign({}, message, { isRead: true }));

      // give them to this new thread
      const newThread = Object.assign({}, oldThread, {
        messages: newMessages
      });

      return {
        ids: state.ids,
        currentThreadId: thread.id,
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      };
    }

    default:
      return state;
  }
};
