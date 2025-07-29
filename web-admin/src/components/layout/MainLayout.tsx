import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/models',
      icon: <AppstoreOutlined />,
      label: '模型管理',
    },
    {
      key: '/tasks',
      icon: <UnorderedListOutlined />,
      label: '任务中心',
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: '用户管理',
    },
    {
      key: '/logs',
      icon: <FileTextOutlined />,
      label: '日志中心',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: '2',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  const handleUserMenuClick = (e: { key: string }) => {
    if (e.key === '2') {
      // 退出登录
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ color: 'white', margin: 0, fontSize: collapsed ? 14 : 20 }}>{collapsed ? 'AI' : 'AI管理系统'}</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ paddingRight: 24 }}>
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }}>
              <span style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} /> 管理员 <UserOutlined />
              </span>
            </Dropdown>
          </div>
        </Header>
        <Content className="content-container">
          <Outlet />
        </Content>
        <Layout.Footer style={{ textAlign: 'center', background: '#fff' }}>
          AI管理系统 ©{new Date().getFullYear()} 技术支持
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 