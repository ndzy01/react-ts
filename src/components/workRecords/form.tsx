import React, { useRef } from 'react';
import BaseForm from '../baseForm/baseForm';
import { Button } from 'antd';

export default () => {
  const formRef: any = useRef();
  const inputLists = [
    {
      label: '任务ID',
      keyword: 'taskId',
      type: 'input',
      required: true,
    },
    {
      label: '任务描述',
      keyword: 'taskDescription',
      type: 'input',
      required: true,
    },
    {
      label: '任务状态',
      keyword: 'taskStatus',
      type: 'selects',
      options: [
        { val: 0, name: '开发中' },
        { val: 1, name: '暂停开发' },
        { val: 2, name: '完成并提交' },
      ],
      defaultValue: 0,
    },
    // {
    //   label: '变更时间',
    //   keyword: 'changeTime',
    //   type: 'date',
    // },
    // {
    //   label: '创建时间',
    //   keyword: 'createTime',
    //   type: 'date',
    // },
  ];
  return (
    <div>
      <BaseForm ref={formRef} inputLists={inputLists} />
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          console.log(formRef.current.baseForm().getFieldsValue());
        }}
      >
        获取表单数据
      </Button>
      <Button
        style={{ margin: '0 8px' }}
        onClick={() => {
          formRef.current.baseForm().resetFields();
        }}
      >
        Clear
      </Button>
    </div>
  );
};
