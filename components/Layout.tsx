"use client";

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  ProductOutlined,
  ShoppingOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  CustomerServiceOutlined,
  DollarOutlined,
  BarChartOutlined,
  SettingOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Avatar, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";

const { Header, Sider, Content } = Layout;

const menuItems = [
  {
    key: "dashboard",
    icon: <DashboardOutlined />,
    label: "首页概览",
  },
  {
    key: "shop",
    icon: <ShopOutlined />,
    label: "店铺管理",
  },
  {
    key: "product",
    icon: <ProductOutlined />,
    label: "商品管理",
  },
  {
    key: "order",
    icon: <ShoppingOutlined />,
    label: "订单管理",
  },
  {
    key: "inventory",
    icon: <DatabaseOutlined />,
    label: "库存管理",
  },
  {
    key: "purchase",
    icon: <ShoppingCartOutlined />,
    label: "采购管理",
  },
  {
    key: "logistics",
    icon: <TruckOutlined />,
    label: "物流管理",
  },
  {
    key: "afterSale",
    icon: <CustomerServiceOutlined />,
    label: "售后客服",
  },
  {
    key: "finance",
    icon: <DollarOutlined />,
    label: "财务利润",
  },
  {
    key: "report",
    icon: <BarChartOutlined />,
    label: "数据报表",
  },
  {
    key: "setting",
    icon: <SettingOutlined />,
    label: "系统设置",
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "个人资料",
    },
    {
      key: "logout",
      label: "退出登录",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            height: 64,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: collapsed ? 16 : 20,
            fontWeight: "bold",
          }}
        >
          {collapsed ? "ERP" : "Shopify ERP"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Space>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Avatar
                style={{ backgroundColor: "#7265e6", cursor: "pointer" }}
                size="default"
              >
                管理员
              </Avatar>
            </Dropdown>
          </Space>
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}