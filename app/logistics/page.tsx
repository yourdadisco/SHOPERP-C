"use client";

import { Card, Table, Tag, Space, Button, Input, Select } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

const { Option } = Select;

interface Logistics {
  id: string;
  trackingNumber: string;
  orderNumber: string;
  carrier: string;
  channel: string;
  status: "已发货" | "运输中" | "已送达" | "异常";
  shippedAt: string;
  estimatedDelivery: string;
  deliveredAt?: string;
}

const mockLogistics: Logistics[] = [
  {
    id: "1",
    trackingNumber: "TRACK123456",
    orderNumber: "ORD-2024-001",
    carrier: "UPS",
    channel: "快递",
    status: "运输中",
    shippedAt: "2024-04-13",
    estimatedDelivery: "2024-04-20",
  },
  {
    id: "2",
    trackingNumber: "TRACK789012",
    orderNumber: "ORD-2024-002",
    carrier: "FedEx",
    channel: "标准",
    status: "已发货",
    shippedAt: "2024-04-13",
    estimatedDelivery: "2024-04-18",
  },
  {
    id: "3",
    trackingNumber: "TRACK345678",
    orderNumber: "ORD-2024-003",
    carrier: "DHL",
    channel: "特快",
    status: "已送达",
    shippedAt: "2024-04-10",
    estimatedDelivery: "2024-04-12",
    deliveredAt: "2024-04-12",
  },
  {
    id: "4",
    trackingNumber: "TRACK901234",
    orderNumber: "ORD-2024-004",
    carrier: "顺丰",
    channel: "国际",
    status: "异常",
    shippedAt: "2024-04-05",
    estimatedDelivery: "2024-04-10",
  },
];

export default function LogisticsPage() {
  const columns: ProColumns<Logistics>[] = [
    {
      title: "物流单号",
      dataIndex: "trackingNumber",
      key: "trackingNumber",
    },
    {
      title: "订单号",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "物流商",
      dataIndex: "carrier",
      key: "carrier",
    },
    {
      title: "渠道",
      dataIndex: "channel",
      key: "channel",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap = {
          已发货: "blue",
          运输中: "processing",
          已送达: "success",
          异常: "error",
        };
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{status}</Tag>;
      },
    },
    {
      title: "发货时间",
      dataIndex: "shippedAt",
      key: "shippedAt",
    },
    {
      title: "预计送达",
      dataIndex: "estimatedDelivery",
      key: "estimatedDelivery",
    },
    {
      title: "实际送达",
      dataIndex: "deliveredAt",
      key: "deliveredAt",
      render: (date) => date || "-",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            轨迹
          </Button>
          <Button type="link" size="small">
            面单
          </Button>
          {record.status === "异常" && (
            <Button type="link" size="small" danger>
              处理
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="物流管理"
        extra={
          <Space>
            <Button icon={<SearchOutlined />}>物流查询</Button>
            <Button icon={<PlusOutlined />}>物流规则</Button>
            <Button type="primary">批量发货</Button>
          </Space>
        }
      >
        <ProTable<Logistics>
          columns={columns}
          dataSource={mockLogistics}
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