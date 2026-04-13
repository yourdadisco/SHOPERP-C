"use client";

import { useState } from "react";
import { Card, Button, Tag, Space, Modal, Form, Input, Select, InputNumber, message, Popconfirm, Table, Tabs } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined, PrinterOutlined, TruckOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

const { Option } = Select;
const { TabPane } = Tabs;

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  country: string;
  currency: string;
  totalAmount: number;
  paymentStatus: "已支付" | "未支付" | "退款";
  status: "待审核" | "待发货" | "已发货" | "已完成" | "异常";
  shippingStatus?: string;
  trackingNumber?: string;
  orderedAt: string;
  shop: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    country: "美国",
    currency: "USD",
    totalAmount: 120.0,
    paymentStatus: "已支付",
    status: "待审核",
    orderedAt: "2024-04-13 10:30:00",
    shop: "My Store",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    country: "英国",
    currency: "GBP",
    totalAmount: 89.5,
    paymentStatus: "已支付",
    status: "待发货",
    orderedAt: "2024-04-13 09:15:00",
    shop: "Fashion Shop",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customerName: "Robert Johnson",
    customerEmail: "robert@example.com",
    country: "德国",
    currency: "EUR",
    totalAmount: 245.0,
    paymentStatus: "已支付",
    status: "已发货",
    shippingStatus: "运输中",
    trackingNumber: "TRACK123456",
    orderedAt: "2024-04-12 16:45:00",
    shop: "Tech Gadgets",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customerName: "Alice Brown",
    customerEmail: "alice@example.com",
    country: "法国",
    currency: "EUR",
    totalAmount: 67.8,
    paymentStatus: "未支付",
    status: "异常",
    orderedAt: "2024-04-12 14:20:00",
    shop: "My Store",
  },
];

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = activeTab === "all"
    ? orders
    : orders.filter(order => order.status === activeTab);

  const columns: ProColumns<Order>[] = [
    {
      title: "订单号",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "客户",
      dataIndex: "customerName",
      key: "customerName",
      render: (name, record) => (
        <div>
          <div>{name}</div>
          <div style={{ fontSize: 12, color: "#999" }}>{record.customerEmail}</div>
        </div>
      ),
    },
    {
      title: "国家",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "金额",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount, record) => `${record.currency} ${amount}`,
    },
    {
      title: "支付状态",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status) => {
        const color = status === "已支付" ? "success" : status === "未支付" ? "error" : "warning";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "订单状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap: Record<string, string> = {
          "待审核": "blue",
          "待发货": "orange",
          "已发货": "processing",
          "已完成": "success",
          "异常": "error",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: "物流",
      dataIndex: "trackingNumber",
      key: "trackingNumber",
      render: (tracking, record) => (
        <div>
          {tracking ? (
            <div>
              <div>单号: {tracking}</div>
              <div style={{ fontSize: 12, color: "#999" }}>{record.shippingStatus}</div>
            </div>
          ) : (
            <span style={{ color: "#999" }}>未发货</span>
          )}
        </div>
      ),
    },
    {
      title: "下单时间",
      dataIndex: "orderedAt",
      key: "orderedAt",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          {record.status === "待审核" && (
            <Button
              type="link"
              size="small"
              onClick={() => handleApprove(record)}
            >
              审核
            </Button>
          )}
          {record.status === "待发货" && (
            <Button
              type="link"
              size="small"
              icon={<TruckOutlined />}
              onClick={() => handleShip(record)}
            >
              发货
            </Button>
          )}
          <Button
            type="link"
            size="small"
            icon={<PrinterOutlined />}
            onClick={() => handlePrint(record)}
          >
            面单
          </Button>
          <Popconfirm
            title="确定删除该订单吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleApprove = (order: Order) => {
    setOrders(
      orders.map((o) =>
        o.id === order.id ? { ...o, status: "待发货" } : o
      )
    );
    message.success("订单审核通过");
  };

  const handleShip = (order: Order) => {
    Modal.confirm({
      title: "确认发货",
      content: (
        <Form layout="vertical">
          <Form.Item label="物流单号" required>
            <Input placeholder="请输入物流单号" />
          </Form.Item>
          <Form.Item label="物流公司" required>
            <Select placeholder="请选择物流公司">
              <Option value="UPS">UPS</Option>
              <Option value="FedEx">FedEx</Option>
              <Option value="DHL">DHL</Option>
              <Option value="顺丰">顺丰</Option>
            </Select>
          </Form.Item>
        </Form>
      ),
      onOk: () => {
        setOrders(
          orders.map((o) =>
            o.id === order.id
              ? {
                  ...o,
                  status: "已发货",
                  shippingStatus: "运输中",
                  trackingNumber: "TRACK" + Date.now(),
                }
              : o
          )
        );
        message.success("发货成功");
      },
    });
  };

  const handlePrint = (order: Order) => {
    message.info("打印面单: " + order.orderNumber);
  };

  const handleDelete = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id));
    message.success("删除成功");
  };

  const handleBatchOperation = (action: string) => {
    message.info(`批量${action}操作`);
  };

  const tabItems = [
    { key: "all", label: "全部订单" },
    { key: "待审核", label: "待审核" },
    { key: "待发货", label: "待发货" },
    { key: "已发货", label: "已发货" },
    { key: "已完成", label: "已完成" },
    { key: "异常", label: "异常订单" },
  ];

  return (
    <div>
      <Card
        title="订单管理"
        extra={
          <Space>
            <Button onClick={() => handleBatchOperation("合并")}>
              合并订单
            </Button>
            <Button onClick={() => handleBatchOperation("拆分")}>
              拆分订单
            </Button>
            <Button onClick={() => handleBatchOperation("打印面单")}>
              批量打印
            </Button>
            <Button type="primary" icon={<PlusOutlined />}>
              手动创建
            </Button>
          </Space>
        }
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        <ProTable<Order>
          columns={columns}
          dataSource={filteredOrders}
          rowKey="id"
          search={{
            labelWidth: "auto",
          }}
          pagination={{ pageSize: 10 }}
          toolBarRender={false}
          rowSelection={{}}
        />
      </Card>
    </div>
  );
}