import React, { useRef } from 'react';
import BaseForm from './baseForm';
import FormNdzy from './form';
const Form01 = () => {
  const form01Ref: any = useRef();
  const inputLists = [
    {
      label: 'test-select',
      keyword: 'test-select',
      type: 'selects',
      options: [
        { val: 1, name: 'test-select1' },
        { val: 2, name: 'test-select2' },
        { val: 3, name: 'test-select3' },
      ],
    },
    {
      label: 'test-select-search',
      keyword: 'test-select-search',
      showSearch: true,
      type: 'selects',
    },
    {
      label: 'test-input',
      keyword: 'test-input',
      type: 'input',
    },

    {
      label: 'test-date',
      keyword: 'test-date',
      type: 'date',
    },
    {
      label: 'test-date-range',
      keyword: 'test-date-range',
      type: 'range',
    },
  ];

  const inputLists_ = [
    {
      label: '任务ID',
      keyword: 'taskId',
      type: 'input',
    },
    {
      label: '任务描述',
      keyword: 'taskDescription',
      type: 'input',
    },
    {
      label: '任务状态',
      keyword: 'taskStatus',
      type: 'selects',
      options: [
        { val: 0, name: '开发中' },
        { val: 1, name: '需后台支持暂停开发' },
        { val: 2, name: '完成并提交' },
      ],
    },
    
    {
      label: '变更时间',
      keyword: 'changeTime',
      type: 'date',
    },
    {
      label: '创建时间',
      keyword: 'createTime',
      type: 'date',
    },
  ];
  return (
    <div>
      <BaseForm ref={form01Ref} inputLists={inputLists} />
      <FormNdzy inputLists={inputLists_}></FormNdzy>
    </div>
  );
};
export default Form01;
