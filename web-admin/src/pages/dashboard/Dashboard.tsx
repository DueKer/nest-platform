import React from 'react';
import { Row, Col, Card, Statistic, Table, Typography } from 'antd';
import {
  UserOutlined,
  RobotOutlined,
  ScheduleOutlined,
  AlertOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

// 模拟数据
const taskData = [
  {
    key: '1',
    task: '图像生成任务',
    status: '完成',
    time: '2023-11-10 10:23:45',
    user: '张三',
  },
  {
    key: '2',
    task: '文本摘要任务',
    status: '处理中',
    time: '2023-11-10 09:45:21',
    user: '李四',
  },
  {
    key: '3',
    task: '翻译任务',
    status: '等待中',
    time: '2023-11-10 09:30:00',
    user: '王五',
  },
  {
    key: '4',
    task: '语音识别任务',
    status: '完成',
    time: '2023-11-09 18:12:33',
    user: '赵六',
  },
  {
    key: '5',
    task: '情感分析任务',
    status: '失败',
    time: '2023-11-09 17:05:11',
    user: '张三',
  },
];

const columns = [
  {
    title: '任务名称',
    dataIndex: 'task',
    key: 'task',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const color = 
        status === '完成' ? 'green' :
        status === '处理中' ? 'blue' :
        status === '等待中' ? 'orange' :
        'red';
      return <span style={{ color }}>{status}</span>;
    },
  },
  {
    title: '创建时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '创建用户',
    dataIndex: 'user',
    key: 'user',
  },
];

const Dashboard: React.FC = () => {
  return (
    <>
      <Title level={2}>仪表盘</Title>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={1256}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="AI模型数"
              value={12}
              prefix={<RobotOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日任务数"
              value={152}
              prefix={<ScheduleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="系统告警"
              value={2}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Title level={4}>最近任务</Title>
        <Table dataSource={taskData} columns={columns} pagination={false} />
      </Card>
    </>
  );
};

export default Dashboard; 