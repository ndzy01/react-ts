import React, { useRef } from 'react';
import BaseForm from './baseForm';

export default () => {
  const formRef: any = useRef();
  const inputLists = [
    {
      label: '任务ID',
      keyword: 'taskId',
      type: 'input',
      required: true,
      span: 24,
    },
    {
      label: '任务描述',
      keyword: 'taskDescription',
      type: 'textArea',
      required: true,
      span: 24,
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
      span: 24,
    },
  ];
  return (
    <div>
      <BaseForm ref={formRef} inputLists={inputLists} />
    </div>
  );
};
