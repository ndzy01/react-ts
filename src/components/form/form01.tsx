import React, { useRef } from 'react';
import BaseForm from './baseForm';
const Form01 = () => {
  const form01Ref: any = useRef();
  const inputLists = [
    {
      label: '申请状态',
      keyword: 'status',
      type: 'selects',
      options: [
        { val: 1, name: '未审核' },
        { val: 2, name: '同意' },
        { val: 3, name: '不同意' },
      ],
    },
    {
      label: '申请单编号',
      keyword: 'applySn',
      type: 'input',
    },
    {
      label: '申请时间',
      keyword: 'createAt',
      type: 'range',
    },
  ];
  return (
    <div>
      <BaseForm ref={form01Ref} inputLists={inputLists} />
    </div>
  );
};
export default Form01;
