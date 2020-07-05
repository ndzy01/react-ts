import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Drawer } from 'antd';

const Drawer01 = (props: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  useImperativeHandle(ref, () => {
    return {
      showDrawer,
    };
  });
  const onClose = () => {
    props._close && props._close();
    setVisible(false);
  };
  return (
    <div>
      <Drawer
        title={props.title || 'drawer组件'}
        placement={props.placement || 'right'}
        closable={false}
        onClose={onClose}
        visible={visible}
        mask={props.mask || true}
        getContainer={props.getContainer || document.body}
        destroyOnClose={props.destroyOnClose || true}
        maskClosable={props.maskClosable || true}
      >
        {(props.childen && props.childen) || '暂无数据'}
      </Drawer>
    </div>
  );
};

export default forwardRef(Drawer01);
