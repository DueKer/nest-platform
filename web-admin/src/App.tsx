import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

// 懒加载组件
const Login = lazy(() => import('./pages/login/Login'));
const MainLayout = lazy(() => import('./components/layout/MainLayout'));

// 主布局中的页面组件
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const ModelsList = lazy(() => import('./pages/models/ModelsList'));
const TasksList = lazy(() => import('./pages/tasks/TasksList'));
const UsersList = lazy(() => import('./pages/users/UsersList'));
const LogsList = lazy(() => import('./pages/logs/LogsList'));
const Settings = lazy(() => import('./pages/settings/Settings'));

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Suspense fallback={<div className="loading-container"><Spin size="large" tip="加载中..." /></div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="models" element={<ModelsList />} />
              <Route path="tasks" element={<TasksList />} />
              <Route path="users" element={<UsersList />} />
              <Route path="logs" element={<LogsList />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </ConfigProvider>
  );
};

export default App;