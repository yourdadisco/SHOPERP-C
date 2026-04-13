"use client";

import { Card, Row, Col, Tabs, Select, DatePicker, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

const salesData = [
  { date: "04-01", 销售额: 4000, 订单量: 40 },
  { date: "04-02", 销售额: 3000, 订单量: 30 },
  { date: "04-03", 销售额: 2000, 订单量: 20 },
  { date: "04-04", 销售额: 2780, 订单量: 28 },
  { date: "04-05", 销售额: 1890, 订单量: 18 },
  { date: "04-06", 销售额: 2390, 订单量: 24 },
  { date: "04-07", 销售额: 3490, 订单量: 35 },
];

const regionData = [
  { name: "北美", value: 4000, color: "#0088FE" },
  { name: "欧盟", value: 3000, color: "#00C49F" },
  { name: "英国", value: 2000, color: "#FFBB28" },
  { name: "亚太", value: 1500, color: "#FF8042" },
];

const topProducts = [
  { name: "男士运动鞋", 销量: 120, 销售额: 10799 },
  { name: "女士连衣裙", 销量: 85, 销售额: 5099 },
  { name: "无线耳机", 销量: 45, 销售额: 5849 },
  { name: "机械键盘", 销量: 32, 销售额: 3199 },
  { name: "智能手表", 销量: 28, 销售额: 4199 },
];

export default function ReportPage() {
  return (
    <div>
      <Card
        title="数据报表"
        extra={
          <Row gutter={8} align="middle">
            <Col>
              <RangePicker />
            </Col>
            <Col>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Option value="all">全部店铺</Option>
                <Option value="1">My Store</Option>
                <Option value="2">Fashion Shop</Option>
              </Select>
            </Col>
            <Col>
              <Button type="primary" icon={<DownloadOutlined />}>
                导出报表
              </Button>
            </Col>
          </Row>
        }
      >
        <Tabs defaultActiveKey="sales">
          <TabPane tab="销售报表" key="sales">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card title="销售趋势">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="销售额" stroke="#8884d8" />
                      <Line type="monotone" dataKey="订单量" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="区域销售分布">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: $${entry.value}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="商品销量排行">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topProducts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="销量" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="库存报表" key="inventory">
            <Card title="库存健康度">
              <div style={{ textAlign: "center", padding: 40 }}>
                <h3>库存报表功能开发中...</h3>
                <p>将显示库存周转率、库龄分析、滞销商品等数据。</p>
              </div>
            </Card>
          </TabPane>
          <TabPane tab="利润报表" key="profit">
            <Card title="利润分析">
              <div style={{ textAlign: "center", padding: 40 }}>
                <h3>利润报表功能开发中...</h3>
                <p>将显示SKU利润、区域利润、店铺利润等深度分析。</p>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}