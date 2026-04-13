"use client";

import { Card, Row, Col, Statistic, Table, Button } from "antd";
import {
  ShoppingOutlined,
  DollarOutlined,
  ShopOutlined,
  ProductOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "1月", 销售额: 4000, 订单量: 240 },
  { month: "2月", 销售额: 3000, 订单量: 139 },
  { month: "3月", 销售额: 2000, 订单量: 980 },
  { month: "4月", 销售额: 2780, 订单量: 390 },
  { month: "5月", 销售额: 1890, 订单量: 480 },
  { month: "6月", 销售额: 2390, 订单量: 380 },
];

const columns = [
  {
    title: "订单号",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "客户",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "金额",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
  },
];

const orderData = [
  {
    key: "1",
    orderNumber: "ORD-2024-001",
    customer: "John Doe",
    amount: "$120.00",
    status: "已发货",
    time: "2024-04-13 10:30",
  },
  {
    key: "2",
    orderNumber: "ORD-2024-002",
    customer: "Jane Smith",
    amount: "$89.50",
    status: "待审核",
    time: "2024-04-13 09:15",
  },
  {
    key: "3",
    orderNumber: "ORD-2024-003",
    customer: "Robert Johnson",
    amount: "$245.00",
    status: "已完成",
    time: "2024-04-12 16:45",
  },
];

export default function DashboardPage() {
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
              title="总订单量"
              value={932}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
            <div style={{ marginTop: 8 }}>
              同比 <ArrowUpOutlined /> 8%
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="店铺数量"
              value={5}
              prefix={<ShopOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
            <div style={{ marginTop: 8 }}>
              已授权 <span style={{ color: "#52c41a" }}>3</span> 个
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="商品数量"
              value={1245}
              prefix={<ProductOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
            <div style={{ marginTop: 8 }}>
              在线 <span style={{ color: "#52c41a" }}>892</span> 个
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="销售趋势">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="销售额" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="订单量" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="快速操作" extra={<Button type="link">更多</Button>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Button type="primary" block>同步店铺订单</Button>
              <Button block>创建采购单</Button>
              <Button block>库存盘点</Button>
              <Button block>物流发货</Button>
              <Button block>财务报表</Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="最近订单" extra={<Button type="link">查看全部</Button>}>
            <Table columns={columns} dataSource={orderData} pagination={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
