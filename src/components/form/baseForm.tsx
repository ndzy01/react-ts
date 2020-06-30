import React, { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  // TreeSelect,
  DatePicker,
  // Cascader,
} from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './baseForm.scss';
const Option = Select.Option;
const BaseForm = (props: any, ref: any) => {
  const [expand, setExpand] = useState(false);
  const [baseForm] = Form.useForm();
  useImperativeHandle(ref, () => {
    return {};
  });
  const getFields = () => {
    console.log(props);

    const { inputLists } = props;
    const children = [];
    if (props.inputLists) {
      for (let i = 0; i < inputLists.length; i++) {
        if (inputLists[i].type === 'input') {
          children.push(
            <Col span={8} key={i}>
              <Form.Item
                name={inputLists[i].keyword}
                label={inputLists[i].label}
                rules={[
                  {
                    required: true,
                    message: '请输入!',
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          );
        } else if (inputLists[i].type === 'selects') {
          children.push(
            <Col span={8} key={i}>
              <Form.Item
                name={inputLists[i].keyword}
                label={inputLists[i].label}
                rules={[
                  {
                    required: true,
                    message: '请选择!',
                  },
                ]}
              >
                <Select
                  mode={inputLists[i].mode}
                  showSearch={
                    inputLists[i].showSearch ? inputLists[i].showSearch : false
                  }
                  allowClear
                  onSearch={
                    // TODO:
                    inputLists[i].label === '设备编号' ? () => {} : () => {}
                  }
                  optionFilterProp={
                    inputLists[i].optionFilterProp
                      ? inputLists[i].optionFilterProp
                      : 'value'
                  }
                  filterOption={
                    inputLists[i].label === '设备编号'
                      ? false
                      : (input, option: any) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="请选择..."
                  onChange={
                    // TODO:
                    inputLists[i].label === '设备编号' ? () => {} : () => {}
                  }
                >
                  {/* { inputLists[i] &&
                     inputLists[i].label === '设备编号' &&
                    devCode &&
                    devCode.map((item: any, index: number) => {
                      return (
                        <Option value={item.code} key={index}>
                          {item.code}
                        </Option>
                      );
                    })
                  } */}
                  {inputLists[i].label !== '设备编号' &&
                    inputLists[i].options &&
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
        } else if (inputLists[i].type === 'date') {
          children.push(
            <Col key={i} span={6}>
              <Form.Item
                name={inputLists[i].keyword}
                label={inputLists[i].label}
                rules={[
                  {
                    required: true,
                    message: '请选择!',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          );
        }
      }
    }

    return children;
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <Form
        form={baseForm}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                baseForm.resetFields();
              }}
            >
              Clear
            </Button>
            <span
              className="base-form-span"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? <UpOutlined /> : <DownOutlined />} Collapse
            </span>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default forwardRef(BaseForm);
