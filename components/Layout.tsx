"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
    key: "/",
    icon: <DashboardOutlined />,
    label: "首页概览",
    path: "/",
  },
  {
    key: "/shop",
    icon: <ShopOutlined />,
    label: "店铺管理",
    path: "/shop",
  },
  {
    key: "/product",
    icon: <ProductOutlined />,
    label: "商品管理",
    path: "/product",
  },
  {
    key: "/order",
    icon: <ShoppingOutlined />,
    label: "订单管理",
    path: "/order",
  },
  {
    key: "/inventory",
    icon: <DatabaseOutlined />,
    label: "库存管理",
    path: "/inventory",
  },
  {
    key: "/purchase",
    icon: <ShoppingCartOutlined />,
    label: "采购管理",
    path: "/purchase",
  },
  {
    key: "/logistics",
    icon: <TruckOutlined />,
    label: "物流管理",
    path: "/logistics",
  },
  {
    key: "/after-sale",
    icon: <CustomerServiceOutlined />,
    label: "售后客服",
    path: "/after-sale",
  },
  {
    key: "/finance",
    icon: <DollarOutlined />,
    label: "财务利润",
    path: "/finance",
  },
  {
    key: "/report",
    icon: <BarChartOutlined />,
    label: "数据报表",
    path: "/report",
  },
  {
    key: "/setting",
    icon: <SettingOutlined />,
    label: "系统设置",
    path: "/setting",
  },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["/"]);
  const router = useRouter();
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 根据当前路径更新选中的菜单项
  useEffect(() => {
    const currentPath = pathname || "/";
    // 查找匹配的菜单项
    const matchedItem = menuItems.find(item => item.path === currentPath);
    if (matchedItem) {
      setSelectedKeys([matchedItem.key]);
    } else {
      // 如果没有完全匹配，尝试前缀匹配（用于嵌套路由）
      const matchedByPrefix = menuItems.find(item => currentPath.startsWith(item.path) && item.path !== "/");
      if (matchedByPrefix) {
        setSelectedKeys([matchedByPrefix.key]);
      } else {
        setSelectedKeys(["/"]);
      }
    }
  }, [pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    const menuItem = menuItems.find(item => item.key === key);
    if (menuItem) {
      router.push(menuItem.path);
    }
  };

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
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
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