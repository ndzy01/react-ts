import React from 'react';
import { useRequest } from 'ahooks';
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  // message
} from 'antd';
import Breadcrumb from './breadcrumb';

import { workRecords } from '../../http/api/workRecords';
import http from '../../http';
const { TextArea } = Input;

const Option = Select.Option;
interface SelectOption {
  val: string | number;
  name: string | number;
}
interface FormInput {
  label: string;
  keyword: string;
  type: string;
  required: boolean;
  span?: number;
  mode?: any;
  options?: SelectOption[] | any;
  defaultValue?: any;
}
const inputLists: FormInput[] = [
  {
    label: '任务ID',
    keyword: 'taskId',
    type: 'input',
    required: true,
    span: 24,
    mode: undefined,
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
    required: true,
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
export default () => {
  const [baseForm] = Form.useForm();

  const onReset = () => {
    baseForm.resetFields();
  };

  const saveRequest = useRequest(
    {
      ...workRecords.save,
    },
    {
      manual: true,
      requestMethod: (param: any) => http(param),
      formatResult: (res) => res.data,
    }
  );
  const getRecordByTaskIdRequest = useRequest(
    (param) => {
      return http(param);
    },
    {
      manual: true,
      formatResult: (res) => res.data,
    }
  );

  const getFields = () => {
    const children = [];

    for (let i = 0; i < inputLists.length; i++) {
      if (inputLists[i].type === 'input') {
        children.push(
          <Col span={inputLists[i].span ? inputLists[i].span : 6}>
            <Form.Item
              name={inputLists[i].keyword}
              label={inputLists[i].label}
              initialValue={inputLists[i].defaultValue}
              rules={
                inputLists[i].required
                  ? [
                      {
                        validator: (_, value) => {
                          return new Promise((resolve, reject) => {
                            getRecordByTaskIdRequest.run({
                              ...workRecords.getRecordByTaskId,
                              data: {
                                taskId: value,
                              },
                            });
                            if (!value) {
                              reject('请输入！！');
                            } else if (
                              getRecordByTaskIdRequest.data &&
                              getRecordByTaskIdRequest.data.code === 1
                            ) {
                              console.log('111');
                              reject('该任务已存在！!');
                            } else {
                              resolve();
                            }
                          });
                        },
                      },
                    ]
                  : [
                      {
                        required: false,
                      },
                    ]
              }
            >
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
        );
      } else if (inputLists[i].type === 'textArea') {
        children.push(
          <Col span={inputLists[i].span ? inputLists[i].span : 6}>
            <Form.Item
              name={inputLists[i].keyword}
              label={inputLists[i].label}
              initialValue={inputLists[i].defaultValue}
              rules={
                inputLists[i].required
                  ? [
                      {
                        required: true,
                        message: '请输入!',
                      },
                    ]
                  : [
                      {
                        required: false,
                      },
                    ]
              }
            >
              <TextArea rows={4} placeholder="请输入!" />
            </Form.Item>
          </Col>
        );
      } else if (inputLists[i].type === 'selects') {
        children.push(
          <Col span={inputLists[i].span ? inputLists[i].span : 6}>
            <Form.Item
              name={inputLists[i].keyword}
              label={inputLists[i].label}
              initialValue={inputLists[i].defaultValue}
              rules={
                inputLists[i].required
                  ? [
                      {
                        required: true,
                        message: '请选择!',
                      },
                    ]
                  : [
                      {
                        required: false,
                      },
                    ]
              }
            >
              <Select
                mode={inputLists[i].mode}
                allowClear
                filterOption={true}
                placeholder="请选择..."
              >
                {inputLists[i].options &&
                  inputLists[i].options.length > 0 &&
                  inputLists[i].options.map((item: any, index: number) => {
                    return (
                      <Option
                        value={item.val || item.val === 0 ? item.val : item}
                        key={index}
                      >
                        {item.name || item}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Col>
        );
      }
    }
    children.push(
      <Form.Item>
        <Button disabled={saveRequest.loading} type="primary" htmlType="submit">
          {saveRequest.loading ? 'loading' : 'submit'}
        </Button>

        <Button
          style={{ margin: '0 8px' }}
          onClick={() => {
            onReset();
          }}
        >
          Clear
        </Button>
      </Form.Item>
    );

    return children;
  };
  return (
    <div>
      <Breadcrumb />
      <Form
        form={baseForm}
        name="records-input-form"
        onFinish={() => {
          saveRequest.run();
        }}
      >
        <Row>{getFields()}</Row>
      </Form>
    </div>
  );
};
