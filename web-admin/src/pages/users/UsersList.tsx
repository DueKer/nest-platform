import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, Select, Typography, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, LockOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

interface UserItem {
  key: string;
  username: string;
  name: string;
  role: string;
  department: string;
  email: string;
  status: boolean;
  lastLogin: string;
}

const initialUsers: UserItem[] = [
  {
    key: '1',
    username: 'admin',
    name: '系统管理员',
    role: '管理员',
    department: '技术部',
    email: 'admin@example.com',
    status: true,
    lastLogin: '2023-11-10 10:00:45',
  },
  {
    key: '2',
    username: 'operator',
    name: '运营专员',
    role: '运营',
    department: '运营部',
    email: 'operator@example.com',
    status: true,
    lastLogin: '2023-11-10 09:15:22',
  },
  {
    key: '3',
    username: 'viewer',
    name: '数据分析师',
    role: '观察员',
    department: '数据部',
    email: 'viewer@example.com',
    status: false,
    lastLogin: '2023-11-09 16:45:30',
  },
];

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (text: string) => {
        const color = 
          text === '管理员' ? 'red' :
          text === '运营' ? 'blue' : 'green';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: UserItem) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(record.key, checked)}
          checkedChildren="启用"
          unCheckedChildren="禁用"
        />
      ),
    },
    {
      title: '最后登录',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: UserItem) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            disabled={record.username === 'admin'}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleStatusChange = (key: string, status: boolean) => {
    if (key === '1' && !status) {
      message.error('无法禁用系统管理员账号！');
      return;
    }
    
    const newUsers = users.map(item => {
      if (item.key === key) {
        return { ...item, status };
      }
      return item;
    });
    
    setUsers(newUsers);
    message.success(`用户${status ? '已启用' : '已禁用'}`);
  };

  const handleAdd = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (user: UserItem) => {
    setEditingUser(user);
    form.setFieldsValue(user);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除此用户吗？此操作不可恢复。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setUsers(users.filter(item => item.key !== key));
        message.success('用户已成功删除');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingUser) {
        // 编辑模式
        const newUsers = users.map(item => {
          if (item.key === editingUser.key) {
            return { ...item, ...values };
          }
          return item;
        });
        setUsers(newUsers);
        message.success('用户信息已成功更新');
      } else {
        // 添加模式
        const newUser: UserItem = {
          key: Date.now().toString(),
          ...values,
          lastLogin: '--',
        };
        setUsers([...users, newUser]);
        message.success('用户已成功添加');
      }
      setIsModalVisible(false);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Title level={2}>用户管理</Title>
      <Card>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          添加用户
        </Button>
        <Table columns={columns} dataSource={users} />
      </Card>

      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: true }}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="请输入用户名" 
              disabled={editingUser !== null}
            />
          </Form.Item>
          
          {!editingUser && (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
            </Form.Item>
          )}
          
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select placeholder="请选择角色">
              <Option value="管理员">管理员</Option>
              <Option value="运营">运营</Option>
              <Option value="观察员">观察员</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              <Option value="技术部">技术部</Option>
              <Option value="运营部">运营部</Option>
              <Option value="数据部">数据部</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            valuePropName="checked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UsersList; 