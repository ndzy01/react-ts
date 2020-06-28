import React, { useRef } from 'react';
import { Button } from 'antd';
import Clock from './components/clock/clock';
import Drawer from './components/drawer/drawer';

function App() {
  const appRef: any = useRef();
  return (
    <div className="App">
      <Clock></Clock>
      <Button
        type="primary"
        onClick={() => {
          appRef.current.showDrawer();
        }}
      >
        open
      </Button>
      <Drawer ref={appRef} childen={<div> 组件</div>} />
      <div style={{ height: '20px', overflowY: 'scroll' }}>
        <p>111111111111111111111111</p>
        <p>1111</p>
        <p>1111</p>
        <p>1111</p>
      </div>
    </div>
  );
}

export default App;
