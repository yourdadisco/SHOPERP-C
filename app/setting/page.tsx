"use client";

import { useState } from "react";
import { Card, Tabs, Table, Tag, Space, Button, Modal, Form, Input, Select, Switch, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";

const { Option } = Select;
const { TabPane } = Tabs;

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
  description: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "超级管理员",
    role: "超级管理员",
    isActive: true,
    lastLogin: "2024-04-13 10:30:00",
  },
  {
    id: "2",
    email: "ops@example.com",
    name: "运营张三",
    role: "运营",
    isActive: true,
    lastLogin: "2024-04-13 09:15:00",
  },
  {
    id: "3",
    email: "warehouse@example.com",
    name: "仓储李四",
    role: "仓储管理员",
    isActive: true,
    lastLogin: "2024-04-12 16:45:00",
  },
  {
    id: "4",
    email: "finance@example.com",
    name: "财务王五",
    role: "财务",
    isActive: false,
    lastLogin: "2024-04-10 14:20:00",
  },
];

const mockRoles: Role[] = [
  {
    id: "1",
    name: "超级管理员",
    permissions: ["所有权限"],
    description: "系统最高权限",
  },
  {
    id: "2",
    name: "运营",
    permissions: ["商品管理", "订单管理", "售后管理"],
    description: "负责日常运营",
  },
  {
    id: "3",
    name: "仓储管理员",
    permissions: ["库存管理", "采购管理", "物流管理"],
    description: "负责仓储物流",
  },
  {
    id: "4",
    name: "财务",
    permissions: ["财务管理", "报表查看"],
    description: "负责财务对账",
  },
];

const permissions = [
  "店铺管理",
  "商品管理",
  "订单管理",
  "库存管理",
  "采购管理",
  "物流管理",
  "售后管理",
  "财务管理",
  "报表查看",
  "系统设置",
];

export default function SettingPage() {
  const [userForm] = Form.useForm();
  const [roleForm] = Form.useForm();
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [roles, setRoles] = useState<Role[]>(mockRoles);

  const userColumns: ProColumns<User>[] = [
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "状态",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "success" : "error"}>
          {isActive ? "激活" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "最后登录",
      dataIndex: "lastLogin",
      key: "lastLogin",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const roleColumns: ProColumns<Role>[] = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "权限",
      dataIndex: "permissions",
      key: "permissions",
      render: (perms) => (
        <Space wrap>
          {Array.isArray(perms) ? perms.map((perm: string) => (
            <Tag key={perm} color="blue">
              {perm}
            </Tag>
          )) : null}
        </Space>
      ),
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditRole(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRole(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddUser = () => {
    setEditingUser(null);
    userForm.resetFields();
    setUserModalVisible(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    userForm.setFieldsValue(user);
    setUserModalVisible(true);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
    message.success("删除成功");
  };

  const handleUserModalOk = () => {
    userForm.validateFields().then((values) => {
      if (editingUser) {
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? { ...editingUser, ...values } : user
          )
        );
        message.success("更新成功");
      } else {
        const newUser: User = {
          id: Date.now().toString(),
          ...values,
          lastLogin: new Date().toLocaleString(),
        };
        setUsers([...users, newUser]);
        message.success("添加成功");
      }
      setUserModalVisible(false);
      userForm.resetFields();
    });
  };

  const handleAddRole = () => {
    setEditingRole(null);
    roleForm.resetFields();
    setRoleModalVisible(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    roleForm.setFieldsValue(role);
    setRoleModalVisible(true);
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id));
    message.success("删除成功");
  };

  const handleRoleModalOk = () => {
    roleForm.validateFields().then((values) => {
      if (editingRole) {
        setRoles(
          roles.map((role) =>
            role.id === editingRole.id ? { ...editingRole, ...values } : role
          )
        );
        message.success("更新成功");
      } else {
        const newRole: Role = {
          id: Date.now().toString(),
          ...values,
        };
        setRoles([...roles, newRole]);
        message.success("添加成功");
      }
      setRoleModalVisible(false);
      roleForm.resetFields();
    });
  };

  return (
    <div>
      <Card title="系统设置">
        <Tabs defaultActiveKey="user">
          <TabPane tab="用户管理" key="user">
            <ProTable<User>
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              search={false}
              pagination={{ pageSize: 10 }}
              toolBarRender={() => [
                <Button
                  key="add"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddUser}
                >
                  添加用户
                </Button>,
              ]}
            />
          </TabPane>
          <TabPane tab="角色管理" key="role">
            <ProTable<Role>
              columns={roleColumns}
              dataSource={roles}
              rowKey="id"
              search={false}
              pagination={{ pageSize: 10 }}
              toolBarRender={() => [
                <Button
                  key="add"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddRole}
                >
                  添加角色
                </Button>,
              ]}
            />
          </TabPane>
          <TabPane tab="权限设置" key="permission">
            <Card title="权限列表">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                {permissions.map((perm) => (
                  <Card key={perm} size="small">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>{perm}</span>
                      <Switch defaultChecked />
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabPane>
          <TabPane tab="系统日志" key="log">
            <Card>
              <div style={{ textAlign: "center", padding: 40 }}>
                <h3>系统日志功能开发中...</h3>
                <p>将显示用户操作日志、系统错误日志等。</p>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={editingUser ? "编辑用户" : "添加用户"}
        open={userModalVisible}
        onOk={handleUserModalOk}
        onCancel={() => {
          setUserModalVisible(false);
          userForm.resetFields();
        }}
        width={500}
      >
        <Form form={userForm} layout="vertical">
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: "请输入邮箱" },
              { type: "email", message: "邮箱格式不正确" },
            ]}
          >
            <Input placeholder="example@domain.com" />
          </Form.Item>
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="张三" />
          </Form.Item>
          <Form.Item
            name="role"
            label="角色"
            rules={[{ required: true, message: "请选择角色" }]}
          >
            <Select placeholder="请选择角色">
              <Option value="超级管理员">超级管理员</Option>
              <Option value="运营">运营</Option>
              <Option value="仓储管理员">仓储管理员</Option>
              <Option value="采购员">采购员</Option>
              <Option value="财务">财务</Option>
              <Option value="客服">客服</Option>
            </Select>
          </Form.Item>
          <Form.Item name="isActive" label="状态" valuePropName="checked">
            <Switch checkedChildren="激活" unCheckedChildren="禁用" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingRole ? "编辑角色" : "添加角色"}
        open={roleModalVisible}
        onOk={handleRoleModalOk}
        onCancel={() => {
          setRoleModalVisible(false);
          roleForm.resetFields();
        }}
        width={600}
      >
        <Form form={roleForm} layout="vertical">
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: "请输入角色名称" }]}
          >
            <Input placeholder="例如：运营" />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="权限"
            rules={[{ required: true, message: "请选择权限" }]}
          >
            <Select mode="multiple" placeholder="请选择权限">
              {permissions.map((perm) => (
                <Option key={perm} value={perm}>
                  {perm}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: "请输入描述" }]}
          >
            <Input.TextArea placeholder="角色描述" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}