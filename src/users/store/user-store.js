import { User } from '../models/user';
import { loadUsersByPage } from '../use-cases/load-users-by-page';

const state = {
  users: [],
  currenPage: 0,
};

const loadNextPage = async () => {
  const users = await loadUsersByPage( state.currenPage + 1 );
  console.log(users.length)
  if ( users.length === 0 ) return;
  state.currenPage += 1;
  state.users = users;
};

const loadPreviousPage = async () => {
  if ( state.currenPage === 1 ) return;
  const users = await loadUsersByPage( state.currenPage - 1 );
  state.currenPage -= 1;
  state.users = users;
};

/**
 * 
 * @param {User} user 
 */
// TODO: Implementar
const onUserChanged = ( updatedUser ) => {
  state.users = state.users.map( user => {
    if ( user.id === updatedUser.id ) {
      return updatedUser;
    }
    return user;
  } );
  if ( state.users.length < 10 ) {
    state.users.push( updatedUser );
  }
};

const reloadPage = async () => {
  const users = await loadUsersByPage( state.currenPage );
  if ( users.length === 0 ) {
    await loadPreviousPage();
    return;
  };
  state.users = users;
};

export default {
  loadNextPage,
  loadPreviousPage,
  onUserChanged,
  reloadPage,
  /**
   * @returns {User[]}
   */
  getUsers: () => [ ...state.users ],
  /**
   * @returns {Number}
   */
  getCurrentPage: () => state.currenPage,
};