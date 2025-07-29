import React, { useState } from 'react';
import { Form, Input, Button, Card, Tabs, Switch, Select, InputNumber, Radio, Space, Typography, message } from 'antd';
import { SaveOutlined, SyncOutlined, CloudServerOutlined, ApiOutlined, BellOutlined, SafetyOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const Settings: React.FC = () => {
  const [apiForm] = Form.useForm();
  const [systemForm] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [backupForm] = Form.useForm();
  
  const [loading, setLoading] = useState({
    api: false,
    system: false,
    notification: false,
    backup: false,
  });

  const handleSaveApiSettings = () => {
    setLoading({...loading, api: true});
    apiForm.validateFields().then(values => {
      // 模拟API请求
      setTimeout(() => {
        console.log('API设置保存：', values);
        message.success('API设置已保存');
        setLoading({...loading, api: false});
      }, 1000);
    });
  };
  
  const handleSaveSystemSettings = () => {
    setLoading({...loading, system: true});
    systemForm.validateFields().then(values => {
      // 模拟API请求
      setTimeout(() => {
        console.log('系统设置保存：', values);
        message.success('系统设置已保存');
        setLoading({...loading, system: false});
      }, 1000);
    });
  };
  
  const handleSaveNotificationSettings = () => {
    setLoading({...loading, notification: true});
    notificationForm.validateFields().then(values => {
      // 模拟API请求
      setTimeout(() => {
        console.log('通知设置保存：', values);
        message.success('通知设置已保存');
        setLoading({...loading, notification: false});
      }, 1000);
    });
  };
  
  const handleBackup = () => {
    setLoading({...loading, backup: true});
    backupForm.validateFields().then(values => {
      // 模拟API请求
      setTimeout(() => {
        console.log('备份设置：', values);
        message.success('备份已启动，请查看任务中心了解进度');
        setLoading({...loading, backup: false});
      }, 1000);
    });
  };

  // 定义tabs项
  const tabItems = [
    {
      key: '1',
      label: (
        <span>
          <ApiOutlined />
          API设置
        </span>
      ),
      children: (
        <Card>
          <Form
            form={apiForm}
            layout="vertical"
            initialValues={{
              apiEndpoint: 'https://api.example.com/v1',
              apiKey: '****************************************',
              timeout: 30,
              retries: 3,
              useProxy: false,
            }}
          >
            <Form.Item
              name="apiEndpoint"
              label="API服务地址"
              rules={[{ required: true, message: '请输入API服务地址' }]}
            >
              <Input placeholder="请输入API服务地址" />
            </Form.Item>
            
            <Form.Item
              name="apiKey"
              label="API密钥"
              rules={[{ required: true, message: '请输入API密钥' }]}
            >
              <Input.Password placeholder="请输入API密钥" />
            </Form.Item>
            
            <Form.Item
              name="timeout"
              label="请求超时时间(秒)"
              rules={[{ required: true, message: '请输入超时时间' }]}
            >
              <InputNumber min={1} max={300} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="retries"
              label="失败重试次数"
              rules={[{ required: true, message: '请输入重试次数' }]}
            >
              <InputNumber min={0} max={10} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="useProxy"
              label="使用代理"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSaveApiSettings}
                loading={loading.api}
              >
                保存设置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <CloudServerOutlined />
          系统参数
        </span>
      ),
      children: (
        <Card>
          <Form
            form={systemForm}
            layout="vertical"
            initialValues={{
              defaultModel: 'gpt-4',
              logLevel: 'info',
              maxTasksPerUser: 10,
              enableCache: true,
              cacheExpiry: 24,
            }}
          >
            <Form.Item
              name="defaultModel"
              label="默认AI模型"
              rules={[{ required: true, message: '请选择默认AI模型' }]}
            >
              <Select placeholder="请选择默认AI模型">
                <Option value="gpt-4">GPT-4</Option>
                <Option value="gpt-3.5-turbo">GPT-3.5-Turbo</Option>
                <Option value="dall-e-3">DALL-E 3</Option>
                <Option value="whisper">Whisper</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="logLevel"
              label="日志级别"
            >
              <Radio.Group>
                <Radio value="debug">调试</Radio>
                <Radio value="info">信息</Radio>
                <Radio value="warning">警告</Radio>
                <Radio value="error">错误</Radio>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item
              name="maxTasksPerUser"
              label="每用户最大任务数"
              rules={[{ required: true, message: '请输入最大任务数' }]}
            >
              <InputNumber min={1} max={100} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="enableCache"
              label="启用缓存"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="cacheExpiry"
              label="缓存过期时间(小时)"
              rules={[{ required: true, message: '请输入缓存过期时间' }]}
            >
              <InputNumber min={1} max={720} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSaveSystemSettings}
                loading={loading.system}
              >
                保存设置
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <BellOutlined />
          通知设置
        </span>
      ),
      children: (
        <Card>
          <Form
            form={notificationForm}
            layout="vertical"
            initialValues={{
              enableEmailNotifications: true,
              emailServer: 'smtp.example.com',
              emailPort: 587,
              emailUsername: 'notifications@example.com',
              emailFrom: 'AI系统 <notifications@example.com>',
              enableWebhook: false,
              webhookUrl: '',
            }}
          >
            <Form.Item
              name="enableEmailNotifications"
              label="启用邮件通知"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="emailServer"
              label="SMTP服务器"
              rules={[{ required: true, message: '请输入SMTP服务器' }]}
            >
              <Input placeholder="请输入SMTP服务器" />
            </Form.Item>
            
            <Form.Item
              name="emailPort"
              label="SMTP端口"
              rules={[{ required: true, message: '请输入SMTP端口' }]}
            >
              <InputNumber min={1} max={65535} style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="emailUsername"
              label="邮箱用户名"
              rules={[{ required: true, message: '请输入邮箱用户名' }]}
            >
              <Input placeholder="请输入邮箱用户名" />
            </Form.Item>
            
            <Form.Item
              name="emailPassword"
              label="邮箱密码"
              rules={[{ required: true, message: '请输入邮箱密码' }]}
            >
              <Input.Password placeholder="请输入邮箱密码" />
            </Form.Item>
            
            <Form.Item
              name="emailFrom"
              label="发件人"
              rules={[{ required: true, message: '请输入发件人' }]}
            >
              <Input placeholder="请输入发件人" />
            </Form.Item>
            
            <Form.Item
              name="enableWebhook"
              label="启用Webhook通知"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            
            <Form.Item
              name="webhookUrl"
              label="Webhook URL"
            >
              <Input placeholder="请输入Webhook URL" />
            </Form.Item>
            
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveNotificationSettings}
                  loading={loading.notification}
                >
                  保存设置
                </Button>
                <Button type="default">
                  发送测试通知
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: '4',
      label: (
        <span>
          <SafetyOutlined />
          备份与恢复
        </span>
      ),
      children: (
        <Card>
          <Form
            form={backupForm}
            layout="vertical"
            initialValues={{
              backupTarget: 'local',
              backupContent: ['database', 'config', 'logs'],
              compressionLevel: 'medium',
            }}
          >
            <Form.Item
              name="backupTarget"
              label="备份目标位置"
              rules={[{ required: true, message: '请选择备份目标位置' }]}
            >
              <Radio.Group>
                <Radio value="local">本地磁盘</Radio>
                <Radio value="cloud">云存储</Radio>
                <Radio value="ftp">FTP服务器</Radio>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item
              name="backupContent"
              label="备份内容"
              rules={[{ required: true, message: '请选择备份内容' }]}
            >
              <Select mode="multiple" placeholder="请选择备份内容">
                <Option value="database">数据库</Option>
                <Option value="config">配置文件</Option>
                <Option value="logs">日志文件</Option>
                <Option value="uploads">上传文件</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="compressionLevel"
              label="压缩级别"
              rules={[{ required: true, message: '请选择压缩级别' }]}
            >
              <Radio.Group>
                <Radio value="none">不压缩</Radio>
                <Radio value="low">低压缩</Radio>
                <Radio value="medium">中压缩</Radio>
                <Radio value="high">高压缩</Radio>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item
              name="backupDesc"
              label="备份描述"
            >
              <TextArea rows={4} placeholder="请输入备份描述" />
            </Form.Item>
            
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  icon={<SyncOutlined />}
                  onClick={handleBackup}
                  loading={loading.backup}
                >
                  开始备份
                </Button>
                <Button>
                  恢复备份
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <>
      <Title level={2}>系统设置</Title>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </>
  );
};

export default Settings; 