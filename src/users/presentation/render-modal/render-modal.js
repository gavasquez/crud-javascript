import modalHtml from "./render-modal.html?raw";
import './render-modal.css';

let modal, form = '';
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
    const userLike = {};
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

//Todo: Cargar usuario por id
export const showModal = () => {
  modal?.classList.remove( 'hide-modal' );
};

export const hideModal = () => {
  modal?.classList.add( 'hide-modal' );
  //* Limpiar el formulario
  form?.reset();
};