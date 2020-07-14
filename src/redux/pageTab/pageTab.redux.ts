import { SET_ACTIVE_KEY, ADD_PAGE_TAB, REMOVE_PAGETAB } from './actions';
export interface PageTabState {
  pageTabArr: any[];
  activeKey: string[];
}

export interface PageTabAction {
  type: string;
  payload: string;
}

const initialState: PageTabState = {
  pageTabArr: [],
  activeKey: [],
};

export function pageTabState(state = initialState, action: PageTabAction) {
  switch (action.type) {
    case SET_ACTIVE_KEY:
      return Object.assign({}, state, {
        activeKey: action.payload,
      });
    case ADD_PAGE_TAB:
      return Object.assign({}, state, {
        pageTabArr: action.payload,
      });
    case REMOVE_PAGETAB:
      return Object.assign({}, state, {
        pageTabArr: action.payload,
      });
    default:
      return state;
  }
}
