import { GET_MENU, PageMenu } from './types';
import { createAction } from 'redux-actions';
import http from '../../http';

export const getPageMenu = createAction(GET_MENU, async () => {
  const res = await http({ url: '/layout/menu', method: 'get' });
  const menu =
    res.data.data[0].children &&
    res.data.data[0].children.filter((item: PageMenu) => !item.type);
  console.log(menu);
  menu.map((item: PageMenu) => {
    delete item.id;
    delete item.pId;
  });
  return menu;
});
