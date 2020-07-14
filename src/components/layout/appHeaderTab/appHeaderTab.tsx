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

const { TabPane } = Tabs;

export default withRouter(
  connect((state) => state, { setActiveKey, removePageTab })((props: any) => {
    const onTabChange = (activeKey: string) => {
      props.setActiveKey(activeKey);
      props.history.push(activeKey);
      // console.log(store.getState().pageTabState.activeKey);
    };
    const remove = (targetKey: any) => {
      let { activeKey } = store.getState().pageTabState;

      let lastIndex = -1;
      store
        .getState()
        .pageTabState.pageTabArr.slice()
        .forEach((item: any, i: number) => {
          if (item.url === targetKey) {
            lastIndex = i - 1;
          }
        });
      const panes = store
        .getState()
        .pageTabState.pageTabArr.slice()
        .filter((pane: any) => pane.url !== targetKey);

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
    const onEdit = (targetKey: any) => {
      remove(targetKey);
    };
    return (
      <div className="ant-layout-header-under">
        <Tabs
          onChange={onTabChange}
          hideAdd
          animated={false}
          activeKey={store.getState().pageTabState.activeKey[0]}
          type="editable-card"
          onEdit={onEdit}
          tabBarExtraContent={<div>清空</div>}
          // tabBarStyle={{
          //   width: '70px',
          //   height: '22px',
          //   fontSize: '14px',
          //   fontFamily: 'PingFangSC-Regular,PingFang SC',
          //   fontWeight: 400,
          //   color: 'rgba(120,127,133,1)',
          //   lineHeight: '22px',
          // }}
        >
          {store
            .getState()
            .pageTabState.pageTabArr.slice()
            .map((item: any) => (
              <TabPane
                tab={item.name}
                key={item.url}
                closable={
                  store.getState().pageTabState.pageTabArr.slice().length > 1
                }
              ></TabPane>
            ))}
        </Tabs>
      </div>
    );
  })
);
