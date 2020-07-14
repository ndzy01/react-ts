import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import {
  setActiveKey,
  removePageTab,
  addPageTab,
} from '../../redux/pageTab/actions';

export default connect(
  (state) => state,

  {
    setActiveKey,
    removePageTab,
    addPageTab,
  }
)((props: any) => {
  useEffect(() => {
    props.setActiveKey('/aaaa');
    console.log(props);
  }, []);

  return (
    <div>
      <p>{props.pageTabState.activeKey}</p>
      <p>{JSON.stringify(props.menuState)}</p>
    </div>
  );
});
