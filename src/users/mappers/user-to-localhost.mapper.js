import { User } from '../models/user';

/**
 * 
 * @param {User} user 
 */
export const userModelToLocalhost = ( user ) => {

  const {
    avatar,
    balance,
    firstName,
    gender,
    isActive,
    lastName,
    id
  } = user;

  return {
    avatar,
    balance,
    first_name: firstName,
    gender,
    isActive,
    last_name: lastName,
    id
  };

};