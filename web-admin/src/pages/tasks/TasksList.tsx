import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Badge, Input, Form, Typography, DatePicker, Select, message, Modal } from 'antd';
import { SearchOutlined, FileAddOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface TaskItem {
  key: string;
  name: string;
  type: string;
  status: string;
  priority: string;
  createdAt: string;
  createdBy: string;
  duration: string;
}

const initialTasks: TaskItem[] = [
  {
    key: '1',
    name: '大规模文本摘要生成',
    type: '文本生成',
    status: '已完成',
    priority: '高',
    createdAt: '2023-11-10 15:30:45',
    createdBy: '张三',
    duration: '2分钟',
  },
  {
    key: '2',
    name: '产品宣传海报生成',
    type: '图像生成',
    status: '处理中',
    priority: '中',
    createdAt: '2023-11-10 14:22:10',
    createdBy: '李四',
    duration: '5分钟',
  },
  {
    key: '3',
    name: '英文文档翻译',
    type: '翻译',
    status: '排队中',
    priority: '低',
    createdAt: '2023-11-10 14:10:20',
    createdBy: '王五',
    duration: '--',
  },
  {
    key: '4',
    name: '客户服务对话生成',
    type: '文本生成',
    status: '失败',
    priority: '高',
    createdAt: '2023-11-10 13:05:33',
    createdBy: '赵六',
    duration: '1分钟',
  },
];

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();

  const handleView = (record: TaskItem) => {
    message.info(`查看任务: ${record.name}`);
    // 这里可以展示任务详情的模态框
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除此任务记录吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setTasks(tasks.filter(item => item.key !== key));
        message.success('任务已删除');
      },
    });
  };

  const handleAddTask = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      const newTask: TaskItem = {
        key: Date.now().toString(),
        name: values.name,
        type: values.type,
        status: '排队中',
        priority: values.priority,
        createdAt: new Date().toLocaleString(),
        createdBy: '当前用户',
        duration: '--',
      };
      setTasks([newTask, ...tasks]);
      setIsModalVisible(false);
      message.success('任务已提交');
    });
  };

  const handleSearch = () => {
    const values = searchForm.getFieldsValue();
    message.info('搜索功能已触发，参数：' + JSON.stringify(values));
    // 实际应用中，这里应该调用API进行搜索
  };

  const columns = [
    {
      title: '任务名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        const color = 
          text === '文本生成' ? 'blue' :
          text === '图像生成' ? 'green' :
          text === '翻译' ? 'orange' : 'cyan';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => {
        const status = 
          text === '已完成' ? 'success' :
          text === '处理中' ? 'processing' :
          text === '排队中' ? 'warning' : 'error';
        return <Badge status={status as any} text={text} />;
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (text: string) => {
        const color = 
          text === '高' ? 'red' :
          text === '中' ? 'orange' : 'green';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '创建者',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: '执行时长',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: TaskItem) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Title level={2}>任务中心</Title>
      
      <Card style={{ marginBottom: 16 }}>
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
        >
          <Form.Item name="keyword">
            <Input placeholder="搜索任务名称" prefix={<SearchOutlined />} />
          </Form.Item>
          <Form.Item name="type">
            <Select placeholder="任务类型" style={{ width: 120 }} allowClear>
              <Option value="文本生成">文本生成</Option>
              <Option value="图像生成">图像生成</Option>
              <Option value="翻译">翻译</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status">
            <Select placeholder="任务状态" style={{ width: 120 }} allowClear>
              <Option value="已完成">已完成</Option>
              <Option value="处理中">处理中</Option>
              <Option value="排队中">排队中</Option>
              <Option value="失败">失败</Option>
            </Select>
          </Form.Item>
          <Form.Item name="dateRange">
            <RangePicker placeholder={['开始日期', '结束日期']} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">搜索</Button>
          </Form.Item>
        </Form>
      </Card>
      
      <Card>
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          onClick={handleAddTask}
          style={{ marginBottom: 16 }}
        >
          新建任务
        </Button>
        <Table columns={columns} dataSource={tasks} />
      </Card>

      <Modal
        title="新建任务"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="任务类型"
            rules={[{ required: true, message: '请选择任务类型' }]}
          >
            <Select placeholder="请选择任务类型">
              <Option value="文本生成">文本生成</Option>
              <Option value="图像生成">图像生成</Option>
              <Option value="翻译">翻译</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select placeholder="请选择优先级">
              <Option value="高">高</Option>
              <Option value="中">中</Option>
              <Option value="低">低</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="description"
            label="任务描述"
          >
            <Input.TextArea rows={4} placeholder="请输入任务描述" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TasksList; 