import React from 'react'; // useState
import {
  // RouteComponentProps,
  withRouter,
} from 'react-router';
import { connect } from 'react-redux';
// import { useMount } from 'ahooks';
import { Tabs } from 'antd';

import store from '../../../redux/redux';
import { setActiveKey, removePageTab } from '../../../redux/pageTab/actions';
import './appHeaderTab.scss';

const { TabPane } = Tabs;

export default withRouter(
  connect((state) => state, { setActiveKey, removePageTab })((props: any) => {
    const onTabChange = (activeKey: string) => {
      props.setActiveKey(activeKey);
      props.history.push(activeKey);
    };
    const remove = (targetKey: string) => {
      let activeKey;
      let lastIndex = -1;
      store
        .getState()
        .pageTabReducer.pageTabArr.slice()
        .forEach((item, i: number) => {
          if (item.url === targetKey) {
            lastIndex = i - 1;
          }
        });
      const panes = store
        .getState()
        .pageTabReducer.pageTabArr.slice()
        .filter((pane) => pane.url !== targetKey);

      if (panes.length) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].url;
        } else {
          activeKey = panes[0].url;
        }
      }
      props.history.push(activeKey);
      props.setActiveKey(activeKey);
      props.removePageTab(panes);
    };
    const onEdit = (
      targetKey: React.MouseEvent | React.KeyboardEvent | string
    ) => {
      remove(targetKey as string);
    };
    return (
      <div className="ant-layout-header-under">
        <Tabs
          onChange={onTabChange}
          hideAdd
          animated={false}
          activeKey={store.getState().pageTabReducer.activeKey[0]}
          defaultActiveKey={sessionStorage.getItem('router') || undefined}
          type="editable-card"
          onEdit={onEdit}
          tabBarExtraContent={
            <span
              onClick={() => {
                const { pageTabArr } = store.getState().pageTabReducer;

                const activeKey = store.getState().pageTabReducer.activeKey[0];
                const activeKeyTab = [
                  ...pageTabArr.slice().filter((pane) => pane.url == activeKey),
                ];
                props.removePageTab(activeKeyTab);
              }}
            >
              清空其他
            </span>
          }
        >
          {store
            .getState()
            .pageTabReducer.pageTabArr.slice()
            .map((item) => (
              <TabPane
                tab={item.name}
                key={item.url}
                closable={
                  store.getState().pageTabReducer.pageTabArr.slice().length > 1
                }
              ></TabPane>
            ))}
        </Tabs>
      </div>
    );
  })
);
