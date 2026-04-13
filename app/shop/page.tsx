"use client";

import { useState } from "react";
import { Card, Table, Button, Tag, Space, Modal, Form, Input, Select, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

const { Option } = Select;

interface Shop {
  id: string;
  name: string;
  shopifyDomain: string;
  region: string;
  currency: string;
  taxMode: string;
  authorized: boolean;
  syncEnabled: boolean;
  lastSyncedAt: string;
}

const mockShops: Shop[] = [
  {
    id: "1",
    name: "My Store",
    shopifyDomain: "mystore.myshopify.com",
    region: "北美",
    currency: "USD",
    taxMode: "不含税",
    authorized: true,
    syncEnabled: true,
    lastSyncedAt: "2024-04-13 10:30:00",
  },
  {
    id: "2",
    name: "Fashion Shop",
    shopifyDomain: "fashion.myshopify.com",
    region: "欧盟",
    currency: "EUR",
    taxMode: "含税",
    authorized: true,
    syncEnabled: false,
    lastSyncedAt: "2024-04-12 15:20:00",
  },
  {
    id: "3",
    name: "Tech Gadgets",
    shopifyDomain: "tech.myshopify.com",
    region: "亚太",
    currency: "JPY",
    taxMode: "不含税",
    authorized: false,
    syncEnabled: false,
    lastSyncedAt: null,
  },
];

export default function ShopPage() {
  const [shops, setShops] = useState<Shop[]>(mockShops);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [form] = Form.useForm();

  const columns: ProColumns<Shop>[] = [
    {
      title: "店铺名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Shopify域名",
      dataIndex: "shopifyDomain",
      key: "shopifyDomain",
    },
    {
      title: "区域",
      dataIndex: "region",
      key: "region",
      render: (region) => <Tag color="blue">{region}</Tag>,
    },
    {
      title: "货币",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "税率模式",
      dataIndex: "taxMode",
      key: "taxMode",
    },
    {
      title: "授权状态",
      dataIndex: "authorized",
      key: "authorized",
      render: (authorized) =>
        authorized ? (
          <Tag color="success">已授权</Tag>
        ) : (
          <Tag color="error">未授权</Tag>
        ),
    },
    {
      title: "同步状态",
      dataIndex: "syncEnabled",
      key: "syncEnabled",
      render: (syncEnabled, record) => (
        <Space>
          <Tag color={syncEnabled ? "processing" : "default"}>
            {syncEnabled ? "开启" : "关闭"}
          </Tag>
          {record.lastSyncedAt && (
            <span style={{ fontSize: 12, color: "#999" }}>
              最后同步: {record.lastSyncedAt}
            </span>
          )}
        </Space>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          {record.authorized ? (
            <Button
              type="link"
              icon={<SyncOutlined />}
              onClick={() => handleSync(record)}
            >
              同步
            </Button>
          ) : (
            <Button
              type="link"
              onClick={() => handleAuthorize(record)}
            >
              授权
            </Button>
          )}
          <Popconfirm
            title="确定删除该店铺吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingShop(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (shop: Shop) => {
    setEditingShop(shop);
    form.setFieldsValue(shop);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setShops(shops.filter((shop) => shop.id !== id));
    message.success("删除成功");
  };

  const handleAuthorize = (shop: Shop) => {
    // 模拟授权
    setShops(
      shops.map((s) =>
        s.id === shop.id ? { ...s, authorized: true } : s
      )
    );
    message.success("授权成功");
  };

  const handleSync = (shop: Shop) => {
    // 模拟同步
    message.loading("同步中...", 1);
    setTimeout(() => {
      setShops(
        shops.map((s) =>
          s.id === shop.id
            ? {
                ...s,
                lastSyncedAt: new Date().toLocaleString(),
              }
            : s
        )
      );
      message.success("同步完成");
    }, 1000);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingShop) {
        // 更新
        setShops(
          shops.map((shop) =>
            shop.id === editingShop.id ? { ...editingShop, ...values } : shop
          )
        );
        message.success("更新成功");
      } else {
        // 新增
        const newShop: Shop = {
          id: Date.now().toString(),
          ...values,
          authorized: false,
          syncEnabled: false,
          lastSyncedAt: null,
        };
        setShops([...shops, newShop]);
        message.success("添加成功");
      }
      setModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <Card
        title="店铺管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            添加店铺
          </Button>
        }
      >
        <ProTable<Shop>
          columns={columns}
          dataSource={shops}
          rowKey="id"
          search={false}
          pagination={{ pageSize: 10 }}
          toolBarRender={false}
        />
      </Card>

      <Modal
        title={editingShop ? "编辑店铺" : "添加店铺"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="店铺名称"
            rules={[{ required: true, message: "请输入店铺名称" }]}
          >
            <Input placeholder="例如：My Store" />
          </Form.Item>
          <Form.Item
            name="shopifyDomain"
            label="Shopify域名"
            rules={[{ required: true, message: "请输入Shopify域名" }]}
          >
            <Input
              placeholder="例如：mystore.myshopify.com"
              addonBefore="https://"
            />
          </Form.Item>
          <Form.Item
            name="region"
            label="区域"
            rules={[{ required: true, message: "请选择区域" }]}
          >
            <Select placeholder="请选择区域">
              <Option value="北美">北美</Option>
              <Option value="欧盟">欧盟</Option>
              <Option value="英国">英国</Option>
              <Option value="亚太">亚太</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="currency"
            label="货币"
            rules={[{ required: true, message: "请选择货币" }]}
          >
            <Select placeholder="请选择货币">
              <Option value="USD">USD</Option>
              <Option value="EUR">EUR</Option>
              <Option value="GBP">GBP</Option>
              <Option value="JPY">JPY</Option>
              <Option value="CNY">CNY</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="taxMode"
            label="税率模式"
            rules={[{ required: true, message: "请选择税率模式" }]}
          >
            <Select placeholder="请选择税率模式">
              <Option value="含税">含税</Option>
              <Option value="不含税">不含税</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}