import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

import {
  Modal,
  Button,
  Col,
  Form,
  Input,
  Row,
  Table,
  Select,
  DatePicker,
  Popover,
  message,
} from 'antd';
import moment from 'moment';

import { useAntdTable } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import timeCycle from '../timeCycle';
import Breadcrumb from './breadcrumb';
import { search, change } from '../../http/api/workRecords';
const { TextArea } = Input;

const { Option } = Select;

interface Item {
  taskId: string;
  taskDescription: string;
  taskStatus: '开发中' | '暂停开发' | '完成并提交';
  createTime: string;
}

interface Result {
  total: number;
  list: Item[];
}

interface RequestData {
  taskId: string;
  taskDescription: string;
  taskStatus: '开发中' | '暂停开发' | '完成并提交';
  createTime: string;
  page: number;
  size: number;
}

const getTableData = (
  { current, pageSize }: PaginatedParams[0],
  formData: Item
): Promise<Result> => {
  const formData_: RequestData = { ...formData, page: current, size: pageSize };
  formData_.createTime = moment(formData_.createTime).format('YYYY-MM-DD');
  return search('/workRecord/search', 'POST', formData_).then((res) => {
    return {
      total: res.data.data ? res.data.data.length : 0,
      list: res.data.data,
    };
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (props: RouteComponentProps) => {
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({
    id: '',
    taskId: '',
    nowStatus: '',
  });

  const { tableProps, search } = useAntdTable(getTableData, {
    defaultPageSize: 6,
    form,
  });

  const { type, changeType, submit, reset } = search;
  const hideModal = () => {
    modalForm
      .validateFields()
      .then((values) => {
        const requestData = {
          ...record,
          ...values,
        };
        change('/workRecord/change', 'POST', requestData)
          .then(() => {
            submit();
            setVisible(false);
          })
          .catch(() => {
            setVisible(false);
          });
      })
      .catch(() => {
        message.warning('请按要求填写表单数据！');
      });
  };

  const hideCancel = () => {
    setVisible(false);
  };

  const columns: any = [
    {
      title: '任务ID',
      dataIndex: 'taskId',
      key: 'taskId',
    },
    {
      title: '任务描述',
      dataIndex: 'taskDescription',
      key: 'taskDescription',
      render: (text: string) => {
        if (text && text.length > 20) {
          return (
            <Popover
              placement="top"
              title={<span>任务描述</span>}
              content={text}
              trigger="click"
            >
              <span>{text.slice(20) + '......'}</span>
            </Popover>
          );
        }
        return <span>{text}</span>;
      },
    },

    {
      title: '任务状态',
      dataIndex: 'taskStatus',
      key: 'taskStatus',
      render: (text: number) => {
        if (text === 0) {
          return <span>开发中</span>;
        } else if (text === 1) {
          return <span>暂停开发</span>;
        } else if (text === 2) {
          return <span>完成并提交</span>;
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text: string) => timeCycle(text, true),
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      align: 'center',
      fixed: 'right',
      width: 120,

      render: (text: any, obj: any) => {
        return (
          <div style={{ display: 'flex' }}>
            <Button
              type="link"
              onClick={() => {
                setRecord({
                  id: obj.id,
                  taskId: obj.taskId,
                  nowStatus: obj.taskStatus,
                });
                setVisible(true);
              }}
            >
              变更
            </Button>
            <Button
              type="link"
              onClick={() => {
                props.history.push({ pathname: '/workRecordShow/' + obj.id });
              }}
            >
              查看
            </Button>
          </div>
        );
      },
    },
  ];

  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item label="任务ID" name="taskId">
              <Input placeholder="任务ID" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="任务描述" name="taskDescription">
              <Input placeholder="任务描述" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="任务状态" name="taskStatus">
              <Select placeholder="任务状态">
                <Option value={0} key={0}>
                  开发中
                </Option>
                <Option value={1} key={1}>
                  暂停开发
                </Option>
                <Option value={2} key={2}>
                  完成并提交
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="创建时间" name="createTime">
              <DatePicker placeholder="创建时间" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" onClick={submit}>
              Search
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              Reset
            </Button>
            <Button type="link" onClick={changeType}>
              Simple Search
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );

  const searchFrom = (
    <div style={{ marginBottom: 16 }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item name="taskId">
          <Input.Search
            placeholder="enter taskId"
            style={{ width: 240 }}
            onSearch={submit}
          />
        </Form.Item>
        <Button type="link" onClick={changeType}>
          Advanced Search
        </Button>
      </Form>
    </div>
  );

  return (
    <div>
      <Modal
        title="变更"
        visible={visible}
        onOk={hideModal}
        onCancel={hideCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={modalForm}>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="变更状态"
                name="changeToStatus"
                rules={[
                  {
                    required: true,
                    message: '选择!',
                  },
                ]}
              >
                <Select placeholder="任务状态">
                  <Option value={0} key={0}>
                    开发中
                  </Option>
                  <Option value={1} key={1}>
                    暂停开发
                  </Option>
                  <Option value={2} key={2}>
                    完成并提交
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="变更理由"
                name="changeDescription"
                rules={[
                  {
                    required: true,
                    message: '请输入!',
                  },
                ]}
              >
                <TextArea rows={2} placeholder="变更理由描述" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Breadcrumb />
      {type === 'simple' ? searchFrom : advanceSearchForm}
      <Table columns={columns} {...tableProps} />
    </div>
  );
};
