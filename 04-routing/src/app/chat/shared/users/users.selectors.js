import { createSelector } from 'reselect';

/**
 * Selectors are like queries for your central state. The Users selectors pull
 * out views of the users structure
 */

export const getUsersState = (state) => state.users;

export const getCurrentUser = createSelector(
  getUsersState,
  (state) => state.currentUser 
);
