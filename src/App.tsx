import React from 'react';
import Clock from './components/clock/clock';
import DrawerShow from './components/drawer';

function App() {
  return (
    <div className="App">
      <Clock />
      <DrawerShow />
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
