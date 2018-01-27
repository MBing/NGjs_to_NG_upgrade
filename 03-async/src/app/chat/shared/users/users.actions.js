/**
 * users.actions specifies _action creators_ (i.e. objects that describe
 * changes to the reducers) that are concerned with Users
 */

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: {
    user
  }
});
