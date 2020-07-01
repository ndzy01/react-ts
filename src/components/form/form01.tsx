import React, { useRef } from 'react';
import BaseForm from './baseForm';
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
  return (
    <div>
      <BaseForm ref={form01Ref} inputLists={inputLists} />
    </div>
  );
};
export default Form01;
