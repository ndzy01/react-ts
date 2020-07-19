import { SET_ACTIVE_KEY, ADD_PAGE_TAB, REMOVE_PAGETAB, PageTab } from './types';
import { createAction } from 'redux-actions';

export const setActiveKey = createAction(SET_ACTIVE_KEY, (key: string) => [
  key,
]);
export const addPageTab = createAction(ADD_PAGE_TAB, (pageTab: PageTab) => {
  return pageTab;
});
export const removePageTab = createAction(
  REMOVE_PAGETAB,
  (pageTabs: PageTab[]) => {
    return pageTabs;
  }
);
