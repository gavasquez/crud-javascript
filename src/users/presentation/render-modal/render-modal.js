import modalHtml from "./render-modal.html?raw";
import './render-modal.css';
import { getUserById } from '../../use-cases/get-user-by-id';
import { User } from '../../models/user';

let modal, form = '';
let loadedUser = {};
/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} saveUserCallback
 */
export const renderModal = ( element, saveUserCallback ) => {

  if ( modal ) return;

  modal = document.createElement( 'div' );
  modal.innerHTML = modalHtml;
  modal.className = 'modal-container hide-modal';
  form = modal.querySelector( 'form' );

  modal.addEventListener( 'click', ( event ) => {
    if ( event.target.className !== 'modal-container' ) return;
    hideModal();
  } );

  form.addEventListener( 'submit', async ( event ) => {
    event.preventDefault();
    const formData = new FormData( form );
    const userLike = { ...loadedUser };
    for ( const [ key, value ] of formData ) {
      if ( key === 'balance' ) {
        userLike[ key ] = +value;
        continue;
      }
      if ( key === 'isActive' ) {
        userLike[ key ] = value === 'on' ? true : false;
        continue;
      }
      userLike[ key ] = value;
    }
    //TODO: Guardar usuarios
    await saveUserCallback( userLike );
    hideModal();
  } );

  element.append( modal );
};

/**
 * 
 * @param {String | Number} id 
 */
//Todo: Cargar usuario por id
export const showModal = async ( id ) => {
  if ( !id ) return;
  loadedUser = {};
  const user = await getUserById( id );
  setFormValue( user );
  modal?.classList.remove( 'hide-modal' );
};

/**
 * 
 * @param {User} user 
 */
const setFormValue = ( user ) => {
  form.querySelector( '[name="firstName"]' ).value = user.firstName;
  form.querySelector( '[name="lastName"]' ).value = user.lastName;
  form.querySelector( '[name="balance"]' ).value = user.balance;
  form.querySelector( '[name="isActive"]' ).checked = user.isActive;
  loadedUser = user;
};

export const hideModal = () => {
  modal?.classList.add( 'hide-modal' );
  //* Limpiar el formulario
  form?.reset();
};