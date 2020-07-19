import { SET_ACTIVE_KEY, ADD_PAGE_TAB, REMOVE_PAGETAB, PageTab } from './types';
import { handleActions } from 'redux-actions';
export interface PageTabState {
  pageTabArr: PageTab[];
  activeKey: string[];
}
const initialState: PageTabState = {
  pageTabArr: [],
  activeKey: [],
};

const pageTabReducer = handleActions(
  {
    [SET_ACTIVE_KEY]: (state: PageTabState, action) => {
      return Object.assign({}, state, {
        activeKey: action.payload,
      });
    },
    [ADD_PAGE_TAB]: (state: PageTabState, action) => {
      const { pageTabArr } = state;
      const pageTab = action.payload;
      let newPageTabs = [];

      const isShow = pageTabArr.find(
        (item) => item.url === (pageTab as any).url
      );

      if (!isShow) {
        newPageTabs = [...pageTabArr, pageTab];
      } else {
        newPageTabs = [...pageTabArr];
      }
      return Object.assign({}, state, {
        pageTabArr: newPageTabs,
      });
    },
    [REMOVE_PAGETAB]: (state: PageTabState, action) => {
      return Object.assign({}, state, {
        pageTabArr: action.payload,
      });
    },
  },
  initialState
);

export default pageTabReducer;
