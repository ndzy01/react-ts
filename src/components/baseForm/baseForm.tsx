import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
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
} from 'antd';
import moment from 'moment';
const { TextArea } = Input;

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

const BaseForm = (props: any, ref: any) => {
  const [baseForm] = Form.useForm();
  const [devCode, setDevCode] = useState([]); //搜索条件
  const [value, setValue] = useState();

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
          <Button type="primary" htmlType="submit">
            submit
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
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    baseForm.resetFields();
  };
  useEffect(() => {
    const { inputLists } = props;
    inputLists.forEach((item: any) => {
      if (item.label === '设备编号') {
        getDevCode('');
      }
    });
  }, [props]);
  useImperativeHandle(ref, () => {
    return {
      baseForm: () => baseForm,
    };
  });
  return (
    <div>
      <Form form={baseForm} name="formNdzy" onFinish={onFinish}>
        <Row>{getFields()}</Row>
      </Form>
    </div>
  );
};

export default forwardRef(BaseForm);
