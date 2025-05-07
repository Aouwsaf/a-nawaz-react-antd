// src/components/MainLayout.jsx
import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: "/", label: "Todo App" },
    { key: "/two-sum", label: "Two Sum Solver" },
    { key: "/mongo-code", label: "Mongo Code" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff" }}>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          
        />
      </Header>
      <Content style={{ padding: "24px" }}>
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
