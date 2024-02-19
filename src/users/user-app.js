import { renderAddButton } from './presentation/render-add-button/render-add-button';
import { renderButtons } from './presentation/render-buttons/render-buttons';
import { renderModal } from './presentation/render-modal/render-modal';
import { renderTable } from './presentation/render-table/render-table';
import userStore from './store/user-store';
import { saveUser } from './use-cases/save-user';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const UserApp = async ( element ) => {

  element.innerHTML = 'Loading...';

  await userStore.loadNextPage();

  element.innerHTML = '';

  renderTable( element );
  renderButtons( element );
  /* renderAddButton(element, () => console.log('desde el padre')); */
  renderAddButton(element);
  renderModal(element, async(userLike) => {
    const user = await saveUser(userLike);
    userStore.onUserChanged(user);
    renderTable();
  })

};