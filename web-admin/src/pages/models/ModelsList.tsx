import React, { useState } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Form, Input, Select, Typography, Switch, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

interface ModelItem {
  key: string;
  name: string;
  type: string;
  version: string;
  status: boolean;
  description: string;
}

const initialModels: ModelItem[] = [
  {
    key: '1',
    name: 'GPT-4',
    type: '文本生成',
    version: '4.0',
    status: true,
    description: '先进的大型语言模型，支持复杂问答和内容生成',
  },
  {
    key: '2',
    name: 'DALL-E 3',
    type: '图像生成',
    version: '3.0',
    status: true,
    description: '高质量文本到图像生成模型',
  },
  {
    key: '3',
    name: 'Whisper',
    type: '语音识别',
    version: '1.5',
    status: false,
    description: '多语言语音识别模型',
  },
  {
    key: '4',
    name: 'Codex',
    type: '代码生成',
    version: '2.1',
    status: true,
    description: '专业的代码生成和补全模型',
  },
];

const ModelsList: React.FC = () => {
  const [models, setModels] = useState<ModelItem[]>(initialModels);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingModel, setEditingModel] = useState<ModelItem | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: '模型名称',
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
          text === '语音识别' ? 'purple' : 'cyan';
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: ModelItem) => (
        <Switch
          checked={status}
          onChange={(checked) => handleStatusChange(record.key, checked)}
          checkedChildren="启用"
          unCheckedChildren="停用"
        />
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ModelItem) => (
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
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleStatusChange = (key: string, status: boolean) => {
    const newModels = models.map(item => {
      if (item.key === key) {
        return { ...item, status };
      }
      return item;
    });
    setModels(newModels);
    message.success(`模型${status ? '已启用' : '已停用'}`);
  };

  const handleAdd = () => {
    setEditingModel(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (model: ModelItem) => {
    setEditingModel(model);
    form.setFieldsValue(model);
    setIsModalVisible(true);
  };

  const handleDelete = (key: string) => {
    confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除此模型吗？此操作不可恢复。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        setModels(models.filter(item => item.key !== key));
        message.success('模型已成功删除');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingModel) {
        // 编辑模式
        const newModels = models.map(item => {
          if (item.key === editingModel.key) {
            return { ...item, ...values };
          }
          return item;
        });
        setModels(newModels);
        message.success('模型已成功更新');
      } else {
        // 添加模式
        const newModel: ModelItem = {
          key: Date.now().toString(),
          ...values,
        };
        setModels([...models, newModel]);
        message.success('模型已成功添加');
      }
      setIsModalVisible(false);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Title level={2}>模型管理</Title>
      <Card>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          style={{ marginBottom: 16 }}
        >
          添加模型
        </Button>
        <Table columns={columns} dataSource={models} />
      </Card>

      <Modal
        title={editingModel ? '编辑模型' : '添加模型'}
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
            name="name"
            label="模型名称"
            rules={[{ required: true, message: '请输入模型名称' }]}
          >
            <Input placeholder="请输入模型名称" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择模型类型' }]}
          >
            <Select placeholder="请选择模型类型">
              <Option value="文本生成">文本生成</Option>
              <Option value="图像生成">图像生成</Option>
              <Option value="语音识别">语音识别</Option>
              <Option value="代码生成">代码生成</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="version"
            label="版本"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input placeholder="请输入版本号" />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="状态"
            valuePropName="checked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="停用" />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="描述"
          >
            <TextArea rows={4} placeholder="请输入模型描述" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModelsList; 