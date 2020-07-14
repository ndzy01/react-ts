import React, {
  Suspense,
  // useEffect,
} from 'react';
import { Provider } from 'react-redux';

import store from './redux/redux';
import { useToggle } from 'ahooks';

import {
  // BrowserRouter as Router,
  Route,
  Switch,
  HashRouter,
  Redirect,
} from 'react-router-dom';
import { Divider } from 'antd';
import { routes } from './config';
import './styles/layout/app.scss';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
// import anime from 'animejs';

import AppMenu from './components/layout/menu';
import AppHeaderTab from './components/layout/appHeaderTab';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, { toggle }] = useToggle(false);

  return (
    <Provider store={store}>
      <HashRouter>
        <Layout className="app">
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={220}
            collapsedWidth={56}
          >
            {!collapsed ? (
              <div className={!collapsed ? 'logo' : 'logo-inline-collapsed'}>
                <div
                  className={
                    !collapsed ? 'logo-info' : 'logo-inline-collapsed-info'
                  }
                >
                  <div className="logo-info-img"></div>
                  <div
                    className={
                      !collapsed ? 'logo-info-des' : 'logo-inline-collapsed-des'
                    }
                  >
                    水质实验室
                  </div>
                </div>
              </div>
            ) : (
              <div className="logo-inline-collapsed">
                <div className="logo-inline-collapsed-info"></div>
              </div>
            )}

            <AppMenu collapsed={collapsed} />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div style={{ height: '96px' }}>
                <div className="ant-layout-header-above">
                  {collapsed ? (
                    <MenuUnfoldOutlined
                      className="trigger"
                      onClick={() => {
                        toggle();
                      }}
                    />
                  ) : (
                    <MenuFoldOutlined
                      className="trigger"
                      onClick={() => {
                        toggle();
                      }}
                    />
                  )}
                </div>
                <Divider />
                <AppHeaderTab />
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              {/* fallback 加载时显示  */}
              <Suspense fallback={<span>正在加载！</span>}>
                <Switch>
                  {routes.routes.map((route, i) => {
                    return <Route key={i} {...route} />;
                  })}
                  <Redirect path="/" to={{ pathname: '/water-daily-list' }} />
                  {/* <Route component={Err404} /> */}
                </Switch>
              </Suspense>
            </Content>
          </Layout>
        </Layout>
      </HashRouter>
    </Provider>
  );
}

export default App;
