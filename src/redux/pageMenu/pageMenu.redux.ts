import { PageMenu } from './types';
import { createActions, handleActions } from 'redux-actions';
import http from '../../http';

export interface PageMenuState {
  pageMenu: PageMenu[];
}
const initialState: PageMenuState = {
  pageMenu: []
};

export const { getpagemenuasync } = createActions({
  GETPAGEMENUASYNC: async () => {
    const res = await http({ url: '/layout/menu', method: 'get' });
    const menu =
      res.data.data[0].children &&
      res.data.data[0].children.filter((item: PageMenu) => !item.type);
    menu.map((item: PageMenu) => {
      delete item.id;
      delete item.pId;
    });

    return menu;
  }
});

const pageMenuReducer = handleActions(
  {
    GETPAGEMENUASYNC: (state: PageMenuState, action) => {
      return Object.assign({}, state, {
        pageMenu: action.payload
      });
    }
  },
  initialState
);

export default pageMenuReducer;
