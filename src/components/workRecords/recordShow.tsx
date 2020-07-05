import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { Popover, Table, Button } from 'antd';
import timeCycle from '../timeCycle';
import { recordShow } from '../../http/api/workRecords';

export default (props: RouteComponentProps) => {
  const [record, setRecord] = useState({
    taskId: '',
    taskDescription: '',
    taskStatus: '',
    createTime: '',
  });
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const id = props.location.pathname.split('/')[
      props.location.pathname.split('/').length - 1
    ];
    recordShow('/workRecord/show', 'POST', { id }).then((res) => {
      setRecord(res.data.data[0][0]);
      setTableData(res.data.data[1]);
    });
  }, [props]);
  const columns: any = [
    {
      title: '任务ID',
      dataIndex: 'taskId',
      key: 'taskId',
    },
    {
      title: '变更描述',
      dataIndex: 'changeDescription',
      key: 'changeDescription',
      render: (text: string) => {
        if (text && text.length > 20) {
          return (
            <Popover
              placement="top"
              title={<span>变更描述</span>}
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
      title: '变更前',
      dataIndex: 'nowStatus',
      key: 'nowStatus',
      render: (text: number) => {
        if (text == 0) {
          return <span>开发中</span>;
        } else if (text == 1) {
          return <span>暂停开发</span>;
        } else if (text == 2) {
          return <span>完成并提交</span>;
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: '变更后',
      dataIndex: 'changeToStatus',
      key: 'changeToStatus',
      render: (text: number) => {
        if (text == 0) {
          return <span>开发中</span>;
        } else if (text == 1) {
          return <span>暂停开发</span>;
        } else if (text == 2) {
          return <span>完成并提交</span>;
        } else {
          return <span>-</span>;
        }
      },
    },
    {
      title: '变更时间',
      dataIndex: 'changeTime',
      key: 'changeTime',
      render: (text: string) => timeCycle(text, true),
    },
  ];

  return (
    <div>
      <div>
        {record.taskId ? (
          <p>
            <span>任务ID：</span>
            <span>{record.taskId}</span>
          </p>
        ) : null}
        {record.taskDescription ? (
          <p>
            <span>任务描述：</span>
            <span>{record.taskDescription}</span>
          </p>
        ) : null}
        {record.taskStatus !== '' ? (
          <p>
            <span>任务状态：</span>
            <span>
              {record.taskStatus == '0'
                ? '开发中'
                : record.taskStatus == '1'
                ? '暂停开发'
                : record.taskStatus == '2'
                ? '完成并提交'
                : '--'}
            </span>
          </p>
        ) : null}
        {record.createTime ? (
          <p>
            <span>创建时间：</span>
            <span>{record.createTime}</span>
          </p>
        ) : null}
      </div>
      <Table columns={columns} dataSource={tableData} />
      <Button
        type="link"
        onClick={() => {
          props.history.push({ pathname: '/workRecords' });
        }}
      >
        {' '}
        返回
      </Button>
    </div>
  );
};
