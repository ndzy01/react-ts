import React from 'react';
import { Breadcrumb, Button } from 'antd';

import { createHashHistory } from 'history';
const history = createHashHistory();

export default () => {
  return (
    <h5 className="event-title">
      <Breadcrumb separator=">>">
        <Breadcrumb.Item>工作记录</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Button
            type="link"
            onClick={() => {
              history.push('/addworkRecord');
            }}
          >
            添加工作记录
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Button
            type="link"
            onClick={() => {
              history.push('/workRecords');
            }}
          >
            工作记录
          </Button>
        </Breadcrumb.Item>
      </Breadcrumb>
    </h5>
  );
};
