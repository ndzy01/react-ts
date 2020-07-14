import { SET_OPEN_KEY, SAVE_MENUS } from './actions';

export interface MenuState {
  openKey: string;
  menus: any[];
}

export interface MenuAction {
  type: string;
  payload: any;
}

const initialState: MenuState = {
  openKey: '',
  menus: [],
};

export function menuState(state = initialState, action: MenuAction) {
  switch (action.type) {
    case SET_OPEN_KEY:
      return Object.assign({}, state, {
        openKey: action.payload,
      });
    case SAVE_MENUS:
      return Object.assign({}, state, {
        menus: action.payload,
      });
    default:
      return state;
  }
}
