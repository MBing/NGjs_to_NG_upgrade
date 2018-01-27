import {
  ADD_THREAD,
  ADD_MESSAGE,
  SELECT_THREAD
} from './threads.actions';

const INITIAL_STATE = {

};

export const ThreadsReducer =
  function(state = INITIAL_STATE, {meta, payload, type}) {
  switch (type) {

    case ADD_THREAD: {

    }

    case ADD_MESSAGE: {

    }

    case SELECT_THREAD: {

    }

    default:
      return state;
  }
};
