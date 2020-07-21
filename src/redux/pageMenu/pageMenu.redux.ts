import { GET_MENU, PageMenu } from './types';
import { handleActions } from 'redux-actions';
export interface PageMenuState {
  pageMenu: PageMenu[];
}
const initialState: PageMenuState = {
  pageMenu: [],
};

const pageMenuReducer = handleActions(
  {
    [GET_MENU]: (state: PageMenuState, action) => {
      return Object.assign({}, state, {
        pageMenu: action.payload,
      });
    },
  },
  initialState
);

export default pageMenuReducer;
