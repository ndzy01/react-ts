import { combineReducers, createStore } from 'redux';
import pageTabState from './pageTab';
import menuState from './menu';

const reducer = combineReducers({ pageTabState, menuState });
//  window.STATE_FROM_SERVER 可以有第二个参数,表示 State 的最初状态。这通常是服务器给出的。
const store = createStore(reducer);

export default store;
