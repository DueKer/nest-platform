import React from 'react';
import { Table, Card, Space, Badge, Input, DatePicker, Button, Select, Form, Typography } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const logData = [
  {
    key: '1',
    timestamp: '2023-11-10 15:45:22',
    level: 'ERROR',
    module: '模型服务',
    message: '模型 DALL-E 3 调用失败：API超时',
    user: 'admin',
    ip: '192.168.1.100',
  },
  {
    key: '2',
    timestamp: '2023-11-10 15:30:10',
    level: 'INFO',
    module: '用户服务',
    message: '用户 operator 登录成功',
    user: 'operator',
    ip: '192.168.1.101',
  },
  {
    key: '3',
    timestamp: '2023-11-10 15:25:05',
    level: 'WARNING',
    module: '任务服务',
    message: '任务队列堆积超过阈值，当前任务数: 35',
    user: 'system',
    ip: '192.168.1.5',
  },
  {
    key: '4',
    timestamp: '2023-11-10 15:15:22',
    level: 'INFO',
    module: '模型服务',
    message: '模型 GPT-4 已成功启动',
    user: 'admin',
    ip: '192.168.1.100',
  },
  {
    key: '5',
    timestamp: '2023-11-10 14:55:30',
    level: 'ERROR',
    module: '数据库服务',
    message: '数据库连接超时，尝试重新连接',
    user: 'system',
    ip: '192.168.1.5',
  },
  {
    key: '6',
    timestamp: '2023-11-10 14:45:12',
    level: 'INFO',
    module: '系统服务',
    message: '系统定时任务启动：清理临时文件',
    user: 'system',
    ip: '192.168.1.5',
  },
];

const LogsList: React.FC = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (text: string) => {
        const status = 
          text === 'ERROR' ? 'error' :
          text === 'WARNING' ? 'warning' :
          text === 'INFO' ? 'success' : 'default';
        return <Badge status={status as any} text={text} />;
      },
    },
    {
      title: '模块',
      dataIndex: 'module',
      key: 'module',
    },
    {
      title: '消息',
      dataIndex: 'message',
      key: 'message',
      ellipsis: true,
    },
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" size="small">详情</Button>
        </Space>
      ),
    },
  ];

  const handleSearch = () => {
    console.log('搜索', form.getFieldsValue());
  };

  const handleExport = () => {
    console.log('导出日志');
  };

  return (
    <>
      <Title level={2}>日志中心</Title>
      
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item name="keyword">
            <Input placeholder="搜索关键词" prefix={<SearchOutlined />} style={{ width: 200 }} />
          </Form.Item>
          
          <Form.Item name="level">
            <Select placeholder="日志级别" style={{ width: 120 }} allowClear>
              <Option value="ERROR">ERROR</Option>
              <Option value="WARNING">WARNING</Option>
              <Option value="INFO">INFO</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="module">
            <Select placeholder="模块" style={{ width: 120 }} allowClear>
              <Option value="模型服务">模型服务</Option>
              <Option value="用户服务">用户服务</Option>
              <Option value="任务服务">任务服务</Option>
              <Option value="系统服务">系统服务</Option>
              <Option value="数据库服务">数据库服务</Option>
            </Select>
          </Form.Item>
          
          <Form.Item name="dateRange">
            <RangePicker style={{ width: 300 }} />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item>
          
          <Form.Item>
            <Button icon={<DownloadOutlined />} onClick={handleExport}>导出</Button>
          </Form.Item>
        </Form>
      </Card>
      
      <Card>
        <Table 
          columns={columns} 
          dataSource={logData}
          pagination={{
            defaultPageSize: 10,
            showTotal: (total) => `共 ${total} 条日志`,
          }}
        />
      </Card>
    </>
  );
};

export default LogsList; 