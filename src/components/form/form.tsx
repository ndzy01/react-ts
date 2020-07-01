import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  // Row,
  // Col,
  Input,
  Select,
  TreeSelect,
  DatePicker,
  Cascader,
} from 'antd';
import moment from 'moment';

// import './baseForm.scss';
const Option = Select.Option;
const { RangePicker } = DatePicker;
type PanelMode =
  | 'time'
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'decade';
const FormNdzy = (props: any) => {
  const [formNdzy] = Form.useForm();
  const [mode, setMode] = useState<[PanelMode, PanelMode]>(['date', 'date']); //设置日期选择范围类型
  const [devCode, setDevCode] = useState([]); //搜索条件
  const [value, setValue] = useState();

  const setMode_ = (props: any) => {
    if (props.inputLists) {
      const { inputLists } = props;
      inputLists &&
        inputLists.forEach((item: any) => {
          if (item.type === 'range' && item.mode) {
            setMode([item.mode, item.mode]);
          }
        });
    }
  };
  const getDevCode = (codeAndName: string) => {
    // TODO: 进行网络请求

    setDevCode([]); //res.data.data
  };
  const onSearch = (val: string) => {
    getDevCode(val);
  };
  const onSelectChange = (val: string) => {
    if (!val || val === '') {
      getDevCode('');
    }
  };
  // 开始时间禁用
  const disabledDate = (current: any) => {
    return current && current >= moment().endOf('day');
  };

  const handleChange = (value: any) => {
    setValue(value);
  };
  const handlePanelChange = (value: any, mode: any, name: string) => {
    props.form.setFieldsValue({
      [name]: value,
    });
    setValue(value);
  };

  const getFields = () => {
    const { inputLists } = props;
    const children = [];
    if (props.inputLists) {
      for (let i = 0; i < inputLists.length; i++) {
        if (inputLists[i].type === 'input') {
          children.push(
            <Form.Item
              name={inputLists[i].keyword}
              label={inputLists[i].label}
              initialValue={
                inputLists[i].defaultValue
                  ? inputLists[i].defaultValue
                  : undefined
              }
              rules={[
                {
                  required: true,
                  message: '请输入!',
                },
              ]}
            >
              <Input placeholder="请输入" />
            </Form.Item>
          );
        } else if (inputLists[i].type === 'selects') {
          children.push(
            <Form.Item
              name={inputLists[i].keyword}
              label={inputLists[i].label}
              initialValue={
                inputLists[i].defaultValue
                  ? inputLists[i].defaultValue
                  : undefined
              }
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
                  inputLists[i].label === '设备编号' ? onSearch : () => {}
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
                  inputLists[i].label === '设备编号' ? onSelectChange : () => {}
                }
              >
                {inputLists[i] &&
                  inputLists[i].label === '设备编号' &&
                  devCode &&
                  devCode.map((item: any, index: number) => {
                    return (
                      <Option value={item.code} key={index}>
                        {item.code}
                      </Option>
                    );
                  })}
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
          );
        } else if (inputLists[i].type === 'date') {
          children.push(
            <Form.Item
              name={inputLists[i].keyword}
              label={inputLists[i].label}
              initialValue={
                inputLists[i].defaultValue
                  ? inputLists[i].defaultValue
                  : undefined
              }
              rules={[
                {
                  required: true,
                  message: '请选择日期!',
                },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          );
        } else if (inputLists[i].type === 'range') {
          children.push(
            <Form.Item
              label={inputLists[i].label}
              name={inputLists[i].keyword}
              initialValue={
                inputLists[i].defaultValue ? inputLists[i].defaultValue : value
              }
            >
              <RangePicker
                mode={mode}
                style={{ width: '100%' }}
                format={
                  inputLists[i].mode === 'year'
                    ? 'YYYY'
                    : inputLists[i].mode === 'month'
                    ? 'YYYY/MM'
                    : 'YYYY/MM/DD'
                }
                onPanelChange={(val, mode) =>
                  handlePanelChange(val, mode, inputLists[i].keyword)
                }
                disabledDate={
                  inputLists[i].disabled ? disabledDate : () => false
                }
                onChange={handleChange}
              />
            </Form.Item>
          );
        } else if (inputLists[i].type === 'treeSelects') {
          children.push(
            <Form.Item
              label={inputLists[i].label}
              name={inputLists[i].keyword}
              initialValue={
                inputLists[i].defaultValue ? inputLists[i].defaultValue : ''
              }
            >
              <TreeSelect
                allowClear
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 350, overflow: 'auto' }}
                treeData={inputLists[i].options}
                placeholder="请选择..."
              />
            </Form.Item>
          );
        } else if (inputLists[i].type === 'dbSelects') {
          children.push(
            <Form.Item
              label={inputLists[i].label}
              name={inputLists[i].keyword}
              initialValue={
                inputLists[i].defaultValue ? inputLists[i].defaultValue : ''
              }
            >
              <Cascader
                fieldNames={{
                  label: 'name',
                  value: 'id',
                  children: 'children',
                }}
                options={inputLists[i].options}
                placeholder="请选择..."
              />
            </Form.Item>
          );
        }
      }
      children.push(
        <Form.Item>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              formNdzy.resetFields();
            }}
          >
            Clear
          </Button>
        </Form.Item>
      );
    }

    return children;
  };

  const onFinish = (values: any) => {
    return values;
  };
  useEffect(() => {
    setMode_(props);
    const { inputLists } = props;
    inputLists.forEach((item: any) => {
      if (item.label === '设备编号') {
        getDevCode('');
      }
    });
  }, [props]);
  return (
    <div>
      <Form form={formNdzy} name="formNdzy" onFinish={onFinish}>
        {getFields()}
      </Form>
    </div>
  );
};

export default FormNdzy;
