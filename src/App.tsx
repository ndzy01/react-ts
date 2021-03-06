import React, { Suspense, useRef } from 'react';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from 'react-router-dom';
import { Button } from 'antd';
import Drawer01 from './components/drawer/drawer01';
import { routes } from './config';
import './App.scss';
import { createHashHistory } from 'history';
const history = createHashHistory();

function App() {
  const appRef: any = useRef();
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-body">
          <div className="app-header-body-logo">
            <Button
              type="primary"
              onClick={() => {
                appRef.current.showDrawer();
              }}
            >
              open
            </Button>
          </div>
        </div>
      </header>
      <div className="app-body">
        <Drawer01
          ref={appRef}
          childen={
            <ul>
              {routes.map((item: any) => {
                return (
                  <li>
                    <span
                      className="app-span"
                      onClick={() => history.push(item.path)}
                    >
                      {item.view ? item.view : item.components}
                    </span>
                  </li>
                );
              })}
            </ul>
          }
        />
        <div className="app-body-main">
          <div className="app-body-main-content">
            <HashRouter>
              {/* fallback 加载时显示  */}
              <Suspense fallback={<span>正在加载！</span>}>
                <Switch>
                  {routes.map((route, i) => {
                    return <Route key={i} {...route} />;
                  })}
                  <Redirect path="/" to={{ pathname: '/home' }} />
                  {/* <Route component={Err404} /> */}
                </Switch>
              </Suspense>
            </HashRouter>
          </div>
          <footer className="app-footer">
            <h1>ndzy</h1>
          </footer>
        </div>
      </div>
    </div>
    // <div className="App">
    //   <HashRouter>
    //     {/* fallback 加载时显示  */}
    //     <Suspense fallback={<span>正在加载！</span>}>
    //       <Switch>
    //         {routes.map((route, i) => {
    //           return <Route key={i} {...route} />;
    //         })}
    //         <Redirect path="/" to={{ pathname: '/home' }} />
    //         {/* <Route component={Err404} /> */}
    //       </Switch>
    //     </Suspense>
    //   </HashRouter>

    //   <Clock />
    //   <DrawerShow />
    //   <div style={{ height: '20px', overflowY: 'scroll' }}>
    //     <p>111111111111111111111111</p>
    //     <p>1111</p>
    //     <p>1111</p>
    //     <p>1111</p>
    //   </div>
    // </div>
  );
}

export default App;
