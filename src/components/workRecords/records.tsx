import React, { useState, useEffect } from 'react';
import { Table, Popover, Button } from 'antd';
import timeCycle from '../timeCycle';
import { createHashHistory } from 'history';
const history = createHashHistory();

function dateFormat(fmt: string, date?: Date) {
  const date_ = date ? date : new Date();

  const o: any = {
    'M+': date_.getMonth() + 1, //月份
    'd+': date_.getDate(), //日
    'h+': date_.getHours(), //小时
    'm+': date_.getMinutes(), //分
    's+': date_.getSeconds(), //秒
    'q+': Math.floor((date_.getMonth() + 3) / 3), //季度
    S: date_.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date_.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

function WorkRecords() {
  const [records, setRecords] = useState([]);

  // useEffect(() => {
  //   function tick() {
  //     setDate(new Date());
  //   }
  //   const timerID = setInterval(tick, 1000);

  //   return function clearTick() {
  //     clearInterval(timerID);
  //   };
  // });

  // useEffect(() => {
  //   setDateValue(dateFormat('yyyy-MM-dd hh:mm:ss', date));
  // }, [date]);
  const dataSource = [
    {
      key: '1',
      taskId: 'Mike',
      taskDescription:
        '321111111111111111111111111111111111111111111111111111111111111111',
      taskStatus: 1,
      changeTime: '1591006056404',
      createTime: '1591006056404',
      operate: { state: 2 },
    },
  ];

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
        if (text.length > 20) {
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
      title: '变更时间',
      dataIndex: 'changeTime',
      key: 'changeTime',
      render: (text: string) => timeCycle(text, true),
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

      render: (text: any) => {
        return (
          <span>
            {text.state == 2 ? (
              <a>
                <span>编辑</span>
              </a>
            ) : null}
            <a>
              <span>查看</span>
            </a>
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <div>
        <Button
          type="link"
          onClick={() => {
            history.push('/addworkRecord');
          }}
        >
          添加
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default WorkRecords;
