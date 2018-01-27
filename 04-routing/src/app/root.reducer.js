import { combineReducers } from 'redux';
import { ThreadsReducer } from './chat/shared/threads/threads.reducer';
import { UsersReducer } from './chat/shared/users/users.reducer';
import { router } from 'redux-ui-router';

/**
 * This is the root reducer
 **/
const rootReducer = combineReducers({
  users: UsersReducer,
  threads: ThreadsReducer,
  router
});

export default rootReducer;
