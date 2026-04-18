"use client";

import { useState } from "react";
import { Card, Button, Tag, Space, Modal, Form, Input, Select, InputNumber, message, Popconfirm, Switch } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SyncOutlined, EyeOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

const { Option } = Select;

interface Product {
  id: string;
  title: string;
  sku: string;
  shop: string;
  price: number;
  costPrice: number;
  stock: number;
  alertStock: number;
  status: "上架" | "下架";
  mainImage?: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    title: "男士运动鞋",
    sku: "MS001",
    shop: "My Store",
    price: 89.99,
    costPrice: 45.0,
    stock: 120,
    alertStock: 20,
    status: "上架",
    mainImage: "https://picsum.photos/100",
  },
  {
    id: "2",
    title: "女士连衣裙",
    sku: "WD002",
    shop: "Fashion Shop",
    price: 59.99,
    costPrice: 25.0,
    stock: 85,
    alertStock: 15,
    status: "上架",
    mainImage: "https://picsum.photos/101",
  },
  {
    id: "3",
    title: "无线耳机",
    sku: "WE003",
    shop: "Tech Gadgets",
    price: 129.99,
    costPrice: 70.0,
    stock: 5,
    alertStock: 10,
    status: "下架",
    mainImage: "https://picsum.photos/102",
  },
];

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const columns: ProColumns<Product>[] = [
    {
      title: "商品图片",
      dataIndex: "mainImage",
      key: "mainImage",
      render: (image) => (
        <img
          src={(image && typeof image === 'string' ? image : "https://picsum.photos/100")}
          alt="商品"
          style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
        />
      ),
    },
    {
      title: "商品标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "店铺",
      dataIndex: "shop",
      key: "shop",
    },
    {
      title: "售价",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "成本价",
      dataIndex: "costPrice",
      key: "costPrice",
      render: (costPrice) => `$${costPrice}`,
    },
    {
      title: "库存",
      dataIndex: "stock",
      key: "stock",
      render: (stock, record) => (
        <Space>
          <span>{stock}</span>
          {Number(stock) <= Number(record.alertStock) && (
            <Tag color="warning">低库存</Tag>
          )}
        </Space>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "上架" ? "success" : "default"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            详情
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            icon={<SyncOutlined />}
            onClick={() => handleSync(record)}
          >
            同步
          </Button>
          <Popconfirm
            title="确定删除该商品吗？"
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
    setEditingProduct(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setModalVisible(true);
  };

  const handleView = (product: Product) => {
    Modal.info({
      title: "商品详情",
      content: (
        <div>
          <p>
            <strong>商品标题：</strong>
            {product.title}
          </p>
          <p>
            <strong>SKU：</strong>
            {product.sku}
          </p>
          <p>
            <strong>店铺：</strong>
            {product.shop}
          </p>
          <p>
            <strong>售价：</strong>${product.price}
          </p>
          <p>
            <strong>成本价：</strong>${product.costPrice}
          </p>
          <p>
            <strong>库存：</strong>
            {product.stock}
          </p>
          <p>
            <strong>状态：</strong>
            {product.status}
          </p>
        </div>
      ),
    });
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
    message.success("删除成功");
  };

  const handleSync = (product: Product) => {
    message.loading("同步中...", 1);
    setTimeout(() => {
      message.success("同步完成");
    }, 1000);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        // 更新
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id
              ? { ...editingProduct, ...values }
              : product
          )
        );
        message.success("更新成功");
      } else {
        // 新增
        const newProduct: Product = {
          id: Date.now().toString(),
          ...values,
        };
        setProducts([...products, newProduct]);
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

  const handleBatchOperation = (action: string) => {
    message.info(`批量${action}操作`);
  };

  return (
    <div>
      <Card
        title="商品管理"
        extra={
          <Space>
            <Button onClick={() => handleBatchOperation("改价")}>
              批量改价
            </Button>
            <Button onClick={() => handleBatchOperation("改库存")}>
              批量改库存
            </Button>
            <Button onClick={() => handleBatchOperation("上下架")}>
              批量上下架
            </Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              添加商品
            </Button>
          </Space>
        }
      >
        <ProTable<Product>
          columns={columns}
          dataSource={products}
          rowKey="id"
          search={{
            labelWidth: "auto",
          }}
          pagination={{ pageSize: 10 }}
          toolBarRender={false}
          rowSelection={{}}
        />
      </Card>

      <Modal
        title={editingProduct ? "编辑商品" : "添加商品"}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="商品标题"
            rules={[{ required: true, message: "请输入商品标题" }]}
          >
            <Input placeholder="例如：男士运动鞋" />
          </Form.Item>
          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: "请输入SKU" }]}
          >
            <Input placeholder="例如：MS001" />
          </Form.Item>
          <Form.Item
            name="shop"
            label="店铺"
            rules={[{ required: true, message: "请选择店铺" }]}
          >
            <Select placeholder="请选择店铺">
              <Option value="My Store">My Store</Option>
              <Option value="Fashion Shop">Fashion Shop</Option>
              <Option value="Tech Gadgets">Tech Gadgets</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="售价"
            rules={[{ required: true, message: "请输入售价" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="例如：89.99"
            />
          </Form.Item>
          <Form.Item
            name="costPrice"
            label="成本价"
            rules={[{ required: true, message: "请输入成本价" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="例如：45.00"
            />
          </Form.Item>
          <Form.Item
            name="stock"
            label="库存"
            rules={[{ required: true, message: "请输入库存" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="例如：120"
            />
          </Form.Item>
          <Form.Item
            name="alertStock"
            label="预警库存"
            rules={[{ required: true, message: "请输入预警库存" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="例如：20"
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select placeholder="请选择状态">
              <Option value="上架">上架</Option>
              <Option value="下架">下架</Option>
            </Select>
          </Form.Item>
          <Form.Item name="mainImage" label="商品主图">
            <Input placeholder="图片URL" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}