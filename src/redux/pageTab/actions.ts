import store from '../redux';
export const SET_ACTIVE_KEY = 'SET_ACTIVE_KEY';
export const ADD_PAGE_TAB = 'ADD_PAGE_TAB';
export const REMOVE_PAGETAB = 'REMOVE_PAGETAB';

interface SetActiveKey {
  type: typeof SET_ACTIVE_KEY;
  payload: any;
}
interface AddPageTab {
  type: typeof ADD_PAGE_TAB;
  payload: any;
}

interface RemovePageTab {
  type: typeof REMOVE_PAGETAB;
  payload: any;
}

export function setActiveKey(key: string) {
  const action: SetActiveKey = {
    type: SET_ACTIVE_KEY,
    payload: [key],
  };
  return action;
}

export function addPageTab(pageTab: any) {
  const { pageTabState } = store.getState();
  const { pageTabArr } = pageTabState;
  let newPageTabs = [];

  const isShow = pageTabArr.find((item) => item.url === pageTab.url);

  if (!isShow) {
    newPageTabs = [...pageTabArr, pageTab];
  } else {
    newPageTabs = [...pageTabArr];
  }

  // console.log(newPageTabs);
  const action: AddPageTab = {
    type: ADD_PAGE_TAB,
    payload: newPageTabs,
  };
  return action;
}

export function removePageTab(pageTabs: any) {
  const action: RemovePageTab = {
    type: REMOVE_PAGETAB,
    payload: pageTabs,
  };
  return action;
}
