import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Select,
  TreeSelect,
  DatePicker,
  Cascader,
  message,
} from 'antd';
import Breadcrumb from './breadcrumb';
import { save, getRecordByTaskId } from '../../http/api/workRecords';
import moment from 'moment';
// type PanelMode =
//   | 'time'
//   | 'date'
//   | 'week'
//   | 'month'
//   | 'quarter'
//   | 'year'
//   | 'decade';

const { TextArea } = Input;

const Option = Select.Option;
const { RangePicker } = DatePicker;

export default (props: any) => {
  const [baseForm] = Form.useForm();
  const [value, setValue] = useState();

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
  const { loading, run } = useRequest('/workRecord/save', {
    requestMethod: (url) => {
      return getRecordByTaskId('/workRecord/getRecordByTaskId', 'POST', {
        taskId: baseForm.getFieldsValue().taskId,
      }).then((res) => {
        if (res.data.code === 1) {
          message.warning('任务重复！');
        } else {
          save(url, 'POST', baseForm.getFieldsValue()).then(() => {
            baseForm.resetFields();
            message.success('保存成功！');
          });
        }
      });
    },
    manual: true,
  });

  const onReset = () => {
    baseForm.resetFields();
  };

  const getFields = () => {
    const { inputLists } = props;
    const children = [];
    if (props.inputLists) {
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
                  showSearch={
                    inputLists[i].showSearch ? inputLists[i].showSearch : false
                  }
                  allowClear
                  optionFilterProp={
                    inputLists[i].optionFilterProp
                      ? inputLists[i].optionFilterProp
                      : 'children'
                  }
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
        } else if (inputLists[i].type === 'treeSelects') {
          children.push(
            <Col span={inputLists[i].span ? inputLists[i].span : 6}>
              <Form.Item
                label={inputLists[i].label}
                name={inputLists[i].keyword}
                initialValue={
                  inputLists[i].defaultValue
                    ? inputLists[i].defaultValue
                    : undefined
                }
              >
                <TreeSelect
                  allowClear
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 350, overflow: 'auto' }}
                  showSearch={
                    inputLists[i].showSearch ? inputLists[i].showSearch : false
                  }
                  treeNodeFilterProp={
                    inputLists[i].treeNodeFilterProp
                      ? inputLists[i].treeNodeFilterProp
                      : 'title'
                  }
                  autoClearSearchValue
                  treeData={inputLists[i].options}
                  placeholder="请选择..."
                />
              </Form.Item>
            </Col>
          );
        } else if (inputLists[i].type === 'dbSelects') {
          children.push(
            <Col span={inputLists[i].span ? inputLists[i].span : 6}>
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
            </Col>
          );
        } else if (inputLists[i].type === 'date') {
          children.push(
            <Col span={inputLists[i].span ? inputLists[i].span : 6}>
              <Form.Item
                name={inputLists[i].keyword}
                label={inputLists[i].label}
                initialValue={
                  inputLists[i].defaultValue
                    ? inputLists[i].defaultValue
                    : undefined
                }
                rules={
                  inputLists[i].required
                    ? [
                        {
                          required: true,
                          message: '请选择日期!',
                        },
                      ]
                    : [
                        {
                          required: false,
                        },
                      ]
                }
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          );
        } else if (inputLists[i].type === 'range') {
          children.push(
            <Col span={inputLists[i].span ? inputLists[i].span : 6}>
              <Form.Item
                label={inputLists[i].label}
                name={inputLists[i].keyword}
                initialValue={
                  inputLists[i].defaultValue
                    ? inputLists[i].defaultValue
                    : value
                }
                rules={
                  inputLists[i].required
                    ? [
                        {
                          required: true,
                          message: '请选择日期!',
                        },
                      ]
                    : [
                        {
                          required: false,
                        },
                      ]
                }
              >
                <RangePicker
                  mode={
                    inputLists[i].mode ? inputLists[i].mode : ['date', 'date']
                  }
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
            </Col>
          );
        }
      }
      children.push(
        <Form.Item>
          <Button disabled={loading} type="primary" htmlType="submit">
            {loading ? 'loading' : 'submit'}
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
    }

    return children;
  };

  return (
    <div>
      <Breadcrumb />
      <Form
        form={baseForm}
        name="formNdzy"
        onFinish={() => {
          run();
        }}
      >
        <Row>{getFields()}</Row>
      </Form>
    </div>
  );
};
