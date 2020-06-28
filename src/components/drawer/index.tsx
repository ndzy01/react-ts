import React, { useRef } from 'react';
import { Button } from 'antd';
import Drawer01 from './drawer01';

function DrawerShow() {
  const drawerShowRef: any = useRef();
  return (
    <div className="App">
      <Button
        type="primary"
        onClick={() => {
          drawerShowRef.current.showDrawer();
        }}
      >
        open
      </Button>
      <Drawer01 ref={drawerShowRef} childen={<div> 组件</div>} />
    </div>
  );
}
export default DrawerShow;
