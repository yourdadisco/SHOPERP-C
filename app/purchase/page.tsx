"use client";

import { Card, Table, Tag, Space, Button, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

const { Option } = Select;

interface Purchase {
  id: string;
  purchaseNumber: string;
  supplier: string;
  totalAmount: number;
  status: "待审批" | "已批准" | "已发货" | "已入库";
  expectedArrival: string;
  createdAt: string;
}

const mockPurchases: Purchase[] = [
  {
    id: "1",
    purchaseNumber: "PO-2024-001",
    supplier: "深圳电子厂",
    totalAmount: 5000,
    status: "待审批",
    expectedArrival: "2024-04-20",
    createdAt: "2024-04-13",
  },
  {
    id: "2",
    purchaseNumber: "PO-2024-002",
    supplier: "广州服装厂",
    totalAmount: 3200,
    status: "已批准",
    expectedArrival: "2024-04-18",
    createdAt: "2024-04-12",
  },
  {
    id: "3",
    purchaseNumber: "PO-2024-003",
    supplier: "义乌小商品",
    totalAmount: 1500,
    status: "已发货",
    expectedArrival: "2024-04-15",
    createdAt: "2024-04-10",
  },
  {
    id: "4",
    purchaseNumber: "PO-2024-004",
    supplier: "东莞配件",
    totalAmount: 800,
    status: "已入库",
    expectedArrival: "2024-04-13",
    createdAt: "2024-04-05",
  },
];

export default function PurchasePage() {
  const columns: ProColumns<Purchase>[] = [
    {
      title: "采购单号",
      dataIndex: "purchaseNumber",
      key: "purchaseNumber",
    },
    {
      title: "供应商",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "总金额",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `¥${amount}`,
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap = {
          待审批: "orange",
          已批准: "blue",
          已发货: "processing",
          已入库: "success",
        };
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{status}</Tag>;
      },
    },
    {
      title: "预计到货",
      dataIndex: "expectedArrival",
      key: "expectedArrival",
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
          <Button type="link" size="small">
            详情
          </Button>
          {record.status === "待审批" && (
            <Button type="link" size="small">
              审批
            </Button>
          )}
          {record.status === "已发货" && (
            <Button type="link" size="small">
              入库
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="采购管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            创建采购单
          </Button>
        }
      >
        <ProTable<Purchase>
          columns={columns}
          dataSource={mockPurchases}
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