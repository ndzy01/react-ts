import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import pageTabReducer from './pageTab';
import menuState from './menu';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  //创建中间件logger
  const logger = createLogger({
    predicate: () => {
      return true;
    },
  });
  middlewares.push(logger);
}

const reducer = combineReducers({
  pageTabReducer,
  menuState,
});
//  window.STATE_FROM_SERVER 可以有第二个参数,表示 State 的最初状态。这通常是服务器给出的。
const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
