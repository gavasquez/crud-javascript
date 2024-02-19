import { User } from '../models/user';
import { loadUsersByPage } from '../use-cases/load-users-by-page';

const state = {
  users: [],
  currenPage: 0,
};

const loadNextPage = async () => {
  const users = await loadUsersByPage( state.currenPage + 1 );
  if ( users.length === 0 ) return;
  state.currenPage += 1;
  state.users = users;
};

const loadPreviousPage = async () => {
  if ( state.currenPage <= 1 ) return;
  const users = await loadUsersByPage( state.currenPage - 1 );
  state.currenPage -= 1;
  state.users = users;
};

// TODO: Implementar
const onUserChanged = () => {
  throw new Error( 'No implementado' );

};

const reloadPage = async () => {
  throw new Error( 'No implementado' );

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