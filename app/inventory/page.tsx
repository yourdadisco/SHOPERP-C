"use client";

import { Card, Table, Tag, Space, Button, Input, Select } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

const { Option } = Select;

interface Inventory {
  id: string;
  sku: string;
  productName: string;
  warehouse: string;
  availableStock: number;
  reservedStock: number;
  inTransitStock: number;
  totalStock: number;
  alertThreshold: number;
  status: "充足" | "预警" | "缺货";
}

const mockInventory: Inventory[] = [
  {
    id: "1",
    sku: "MS001",
    productName: "男士运动鞋",
    warehouse: "深圳仓",
    availableStock: 120,
    reservedStock: 10,
    inTransitStock: 50,
    totalStock: 180,
    alertThreshold: 20,
    status: "充足",
  },
  {
    id: "2",
    sku: "WD002",
    productName: "女士连衣裙",
    warehouse: "上海仓",
    availableStock: 85,
    reservedStock: 5,
    inTransitStock: 30,
    totalStock: 120,
    alertThreshold: 15,
    status: "充足",
  },
  {
    id: "3",
    sku: "WE003",
    productName: "无线耳机",
    warehouse: "深圳仓",
    availableStock: 5,
    reservedStock: 2,
    inTransitStock: 0,
    totalStock: 7,
    alertThreshold: 10,
    status: "缺货",
  },
  {
    id: "4",
    sku: "KB004",
    productName: "机械键盘",
    warehouse: "上海仓",
    availableStock: 12,
    reservedStock: 3,
    inTransitStock: 20,
    totalStock: 35,
    alertThreshold: 15,
    status: "预警",
  },
];

export default function InventoryPage() {
  const columns: ProColumns<Inventory>[] = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "商品名称",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "仓库",
      dataIndex: "warehouse",
      key: "warehouse",
    },
    {
      title: "可用库存",
      dataIndex: "availableStock",
      key: "availableStock",
      render: (stock, record) => (
        <div>
          <span>{stock}</span>
          {record.status === "预警" && (
            <Tag color="warning" style={{ marginLeft: 8 }}>
              预警
            </Tag>
          )}
          {record.status === "缺货" && (
            <Tag color="error" style={{ marginLeft: 8 }}>
              缺货
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "占用库存",
      dataIndex: "reservedStock",
      key: "reservedStock",
    },
    {
      title: "在途库存",
      dataIndex: "inTransitStock",
      key: "inTransitStock",
    },
    {
      title: "总库存",
      dataIndex: "totalStock",
      key: "totalStock",
    },
    {
      title: "库存状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap = {
          充足: "success",
          预警: "warning",
          缺货: "error",
        };
        return <Tag color={colorMap[status as keyof typeof colorMap]}>{status}</Tag>;
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">
            入库
          </Button>
          <Button type="link" size="small">
            出库
          </Button>
          <Button type="link" size="small">
            盘点
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="库存管理"
        extra={
          <Space>
            <Button icon={<PlusOutlined />}>入库单</Button>
            <Button>出库单</Button>
            <Button>盘点</Button>
            <Button type="primary">库存同步</Button>
          </Space>
        }
      >
        <ProTable<Inventory>
          columns={columns}
          dataSource={mockInventory}
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