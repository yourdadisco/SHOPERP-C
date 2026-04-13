"use client";

import { Card, Row, Col, Statistic, Table, Tag, Space, Button, Select } from "antd";
import { DollarOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const { Option } = Select;

const profitData = [
  { month: "1月", 销售额: 4000, 成本: 2000, 利润: 2000 },
  { month: "2月", 销售额: 3000, 成本: 1500, 利润: 1500 },
  { month: "3月", 销售额: 2000, 成本: 1200, 利润: 800 },
  { month: "4月", 销售额: 2780, 成本: 1500, 利润: 1280 },
  { month: "5月", 销售额: 1890, 成本: 1000, 利润: 890 },
  { month: "6月", 销售额: 2390, 成本: 1300, 利润: 1090 },
];

const regionProfitData = [
  { name: "北美", value: 4000, color: "#0088FE" },
  { name: "欧盟", value: 3000, color: "#00C49F" },
  { name: "英国", value: 2000, color: "#FFBB28" },
  { name: "亚太", value: 1500, color: "#FF8042" },
];

interface ProfitDetail {
  id: string;
  orderNumber: string;
  sku: string;
  salesAmount: number;
  productCost: number;
  shippingCost: number;
  platformFee: number;
  transactionFee: number;
  taxAmount: number;
  netProfit: number;
  margin: number;
}

const mockProfitDetails: ProfitDetail[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    sku: "MS001",
    salesAmount: 120.0,
    productCost: 45.0,
    shippingCost: 10.0,
    platformFee: 5.0,
    transactionFee: 3.0,
    taxAmount: 12.0,
    netProfit: 45.0,
    margin: 37.5,
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    sku: "WD002",
    salesAmount: 89.5,
    productCost: 25.0,
    shippingCost: 8.0,
    platformFee: 4.0,
    transactionFee: 2.5,
    taxAmount: 9.0,
    netProfit: 41.0,
    margin: 45.8,
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    sku: "WE003",
    salesAmount: 245.0,
    productCost: 70.0,
    shippingCost: 15.0,
    platformFee: 10.0,
    transactionFee: 7.0,
    taxAmount: 25.0,
    netProfit: 118.0,
    margin: 48.2,
  },
];

export default function FinancePage() {
  const columns: ProColumns<ProfitDetail>[] = [
    {
      title: "订单号",
      dataIndex: "orderNumber",
      key: "orderNumber",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "销售额",
      dataIndex: "salesAmount",
      key: "salesAmount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "商品成本",
      dataIndex: "productCost",
      key: "productCost",
      render: (cost) => `$${cost}`,
    },
    {
      title: "物流费",
      dataIndex: "shippingCost",
      key: "shippingCost",
      render: (cost) => `$${cost}`,
    },
    {
      title: "平台费",
      dataIndex: "platformFee",
      key: "platformFee",
      render: (fee) => `$${fee}`,
    },
    {
      title: "交易费",
      dataIndex: "transactionFee",
      key: "transactionFee",
      render: (fee) => `$${fee}`,
    },
    {
      title: "税费",
      dataIndex: "taxAmount",
      key: "taxAmount",
      render: (tax) => `$${tax}`,
    },
    {
      title: "净利润",
      dataIndex: "netProfit",
      key: "netProfit",
      render: (profit) => (
        <span style={{ color: (profit || 0) > 0 ? "#3f8600" : "#cf1322" }}>
          ${profit}
        </span>
      ),
    },
    {
      title: "毛利率",
      dataIndex: "margin",
      key: "margin",
      render: (margin) => (
        <Tag color={margin > 40 ? "success" : margin > 20 ? "warning" : "error"}>
          {margin}%
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总销售额"
              value={112893}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: "#3f8600" }}
            />
            <div style={{ marginTop: 8 }}>
              同比 <ArrowUpOutlined /> 12%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总成本"
              value={58900}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: "#cf1322" }}
            />
            <div style={{ marginTop: 8 }}>
              同比 <ArrowDownOutlined /> 5%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="总利润"
              value={53993}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: "#3f8600" }}
            />
            <div style={{ marginTop: 8 }}>
              同比 <ArrowUpOutlined /> 18%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="平均毛利率"
              value={47.8}
              suffix="%"
              valueStyle={{ color: "#3f8600" }}
            />
            <div style={{ marginTop: 8 }}>
              环比 <ArrowUpOutlined /> 3.2%
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="利润趋势">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={profitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="销售额" stroke="#8884d8" />
                <Line type="monotone" dataKey="成本" stroke="#ff7300" />
                <Line type="monotone" dataKey="利润" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="区域利润分布">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionProfitData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: $${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionProfitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card
            title="订单利润明细"
            extra={
              <Space>
                <Select defaultValue="all" style={{ width: 120 }}>
                  <Option value="all">全部店铺</Option>
                  <Option value="1">My Store</Option>
                  <Option value="2">Fashion Shop</Option>
                </Select>
                <Button>导出报表</Button>
              </Space>
            }
          >
            <ProTable<ProfitDetail>
              columns={columns}
              dataSource={mockProfitDetails}
              rowKey="id"
              search={false}
              pagination={{ pageSize: 10 }}
              toolBarRender={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}