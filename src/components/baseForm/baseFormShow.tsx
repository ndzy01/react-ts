import React, { useRef } from 'react';
import { Button } from 'antd';
import BaseForm from './baseForm';
const BaseFormShow = () => {
  const baseFormShowRef: any = useRef();
  const inputLists = [
    {
      label: 'test-select',
      keyword: 'test-select',
      type: 'selects',
      showSearch: true,
      mode: 'multiple ',
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
      label: 'test-treeSelect-search',
      keyword: 'test-treeSelect-search',
      options: [
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
        },
      ],
      showSearch: true,
      defaultValue:"111",
      type: 'treeSelects',
    },
    {
      label: 'test-input',
      keyword: 'test-input',
      type: 'input',
      required: true,
      // defaultValue: 0,
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
      <BaseForm ref={baseFormShowRef} inputLists={inputLists} />
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => {
          console.log(baseFormShowRef.current.baseForm().getFieldsValue());
        }}
      >
        获取表单数据
      </Button>
      <Button
        style={{ margin: '0 8px' }}
        onClick={() => {
          baseFormShowRef.current.baseForm().resetFields();
        }}
      >
        Clear
      </Button>
    </div>
  );
};
export default BaseFormShow;
