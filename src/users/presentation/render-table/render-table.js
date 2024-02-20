import userStore from '../../store/user-store';
import { deleteUser } from '../../use-cases/delete-user-by-id';
import { showModal } from '../render-modal/render-modal';
import './render-table.css';

let table;

const createTable = () => {
  const table = document.createElement( 'table' );
  const tableHeaders = document.createElement( 'thead' );
  tableHeaders.innerHTML = `
  <tr>
    <th>ID</th>
    <th>Balance</th>
    <th>FirstName</th>
    <th>LastName</th>
    <th>Active</th>
    <th>Actions</th>
  </tr>
  `;
  const tableBody = document.createElement( 'tbody' );
  table.append( tableHeaders, tableBody );
  return table;
};


const tableSelectListener = ( event ) => {
  //* closest selecciona lo mas cerca a select-user
  const element = event.target.closest( '.select-user' );
  if ( !element ) return;
  //* Obtenemos el atributo data-id
  const id = element.getAttribute( 'data-id' );
  showModal( id );
};

const tableDeleteListener = async ( event ) => {
  //* closest selecciona lo mas cerca a select-user
  const element = event.target.closest( '.delete-user' );
  if ( !element ) return;
  //* Obtenemos el atributo data-id
  const id = element.getAttribute( 'data-id' );
  try {
    await deleteUser( id );
    await userStore.reloadPage();
    document.querySelector('#current-page').innerText = userStore.getCurrentPage();
    renderTable();
  } catch ( error ) {
    console.log( error );
    alert( 'No se pudo eliminar' );
  }
};

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderTable = ( element ) => {
  const users = userStore.getUsers();
  if ( !table ) {
    table = createTable();
    element.append( table );

    // TODO: Listeners a la Table
    table.addEventListener( 'click', ( event ) => {
      tableSelectListener( event );
      tableDeleteListener( event );
    } );
  }

  let tableHTML = '';
  users.forEach( user => {
    tableHTML += `
    <tr>
      <td>${ user.id }</td>
      <td>${ user.balance }</td>
      <td>${ user.firstName }</td>
      <td>${ user.lastName }</td>
      <td>${ user.isActive }</td>
      <td>
        <a href='#' class="select-user" data-id="${ user.id }">Select</a>
        |
        <a href='#' class="delete-user" data-id="${ user.id }">Delete</a>
      </td>
    </tr>
    `;
  } );

  table.querySelector( 'tbody' ).innerHTML = tableHTML;

};