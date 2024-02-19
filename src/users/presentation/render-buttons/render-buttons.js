import userStore from '../../store/user-store';
import { renderTable } from '../render-table/render-table';
import './render-buttons.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) => {
  const nextButton = document.createElement( 'button' );
  nextButton.innerText = 'Next >';

  const prevButton = document.createElement( 'button' );
  prevButton.innerText = '< Prev';

  const currenPageLabel = document.createElement( 'span' );
  currenPageLabel.id = 'current-page';
  currenPageLabel.innerText = userStore.getCurrentPage();

  element.append( prevButton, currenPageLabel, nextButton );

  nextButton.addEventListener( 'click', async () => {
    await userStore.loadNextPage();
    currenPageLabel.innerHTML = userStore.getCurrentPage();
    renderTable( element );
  } );

  prevButton.addEventListener( 'click', async () => {
    await userStore.loadPreviousPage();
    currenPageLabel.innerHTML = userStore.getCurrentPage();
    renderTable( element );
  } );

};