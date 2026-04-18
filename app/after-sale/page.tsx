"use client";

import { Card, Table, Tag, Space, Button, Input, Select } from "antd";
import { PlusOutlined, MessageOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

const { Option } = Select;

interface AfterSale {
  id: string;
  orderNumber: string;
  customerName: string;
  type: "退款" | "退货" | "换货";
  reason: string;
  amount: number;
  status: "待处理" | "处理中" | "已完成" | "已关闭";
  createdAt: string;
}

const mockAfterSales: AfterSale[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customerName: "John Doe",
    type: "退款",
    reason: "商品损坏",
    amount: 120.0,
    status: "待处理",
    createdAt: "2024-04-13",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customerName: "Jane Smith",
    type: "退货",
    reason: "尺寸不合适",
    amount: 89.5,
    status: "处理中",
    createdAt: "2024-04-12",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customerName: "Robert Johnson",
    type: "换货",
    reason: "颜色错误",
    amount: 245.0,
    status: "已完成",
    createdAt: "2024-04-10",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customerName: "Alice Brown",
    type: "退款",
    reason: "未收到货",
    amount: 67.8,
    status: "已关闭",
    createdAt: "2024-04-08",
  },
];

export default function AfterSalePage() {
  const columns: ProColumns<AfterSale>[] = [
    {
      title: "订单号",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "客户",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "售后类型",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        const colorMap = {
          退款: "orange",
          退货: "blue",
          换货: "purple",
        };
        return <Tag color={colorMap[type as keyof typeof colorMap]}>{type}</Tag>;
      },
    },
    {
      title: "原因",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "金额",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap = {
          待处理: "error",
          处理中: "processing",
          已完成: "success",
          已关闭: "default",
        };
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{status}</Tag>;
      },
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<MessageOutlined />}>
            回复
          </Button>
          {record.status === "待处理" && (
            <Button type="link" size="small">
              处理
            </Button>
          )}
          <Button type="link" size="small">
            详情
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="售后客服"
        extra={
          <Space>
            <Button icon={<MessageOutlined />}>站内信</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              创建售后
            </Button>
          </Space>
        }
      >
        <ProTable<AfterSale>
          columns={columns}
          dataSource={mockAfterSales}
          rowKey="id"
          search={{
            labelWidth: "auto",
          }}
          pagination={{ pageSize: 10 }}
          toolBarRender={false}
        />
      </Card>
    </div>
  );
}