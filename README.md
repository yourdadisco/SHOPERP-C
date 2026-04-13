# Shopify ERP 系统

基于 Next.js 和 Ant Design Pro 的一站式跨境 ERP 系统，参考领星 ERP 交互风格，支持店铺授权、订单处理、库存同步、采购、物流、利润核算等全链路功能。

## 功能模块

1. **店铺授权中心** - Shopify 店铺授权与管理
2. **商品管理中心** - 商品列表、批量编辑、刊登同步
3. **订单履约中心** - 订单审核、发货、面单打印
4. **库存仓储中心** - 多仓管理、库存同步、盘点
5. **采购供应链中心** - 采购建议、采购单管理、供应商管理
6. **物流配送中心** - 物流商管理、面单打印、轨迹跟踪
7. **客服售后中心** - 站内信集成、退款退货管理
8. **财务利润中心** - 利润看板、成本分摊、自动对账
9. **数据报表中心** - 销售、库存、利润多维报表
10. **系统设置与权限** - 角色管理、菜单权限、操作日志

## 技术栈

- **前端**: Next.js 14 (App Router), React 19, TypeScript
- **UI 框架**: Ant Design 5, Ant Design Pro Components
- **图表**: Recharts
- **状态管理**: Zustand
- **后端**: Next.js API Routes
- **ORM**: Prisma
- **数据库**: SQLite (开发) / PostgreSQL (生产)
- **样式**: Tailwind CSS

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 数据库设置

1. 初始化数据库（使用 SQLite）：
```bash
npx prisma db push
```

2. 生成 Prisma Client：
```bash
npx prisma generate
```

### 运行开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
├── app/                    # Next.js 14 App Router
│   ├── api/               # API 路由
│   │   └── shop/          # 店铺 API
│   ├── shop/              # 店铺管理页面
│   ├── product/           # 商品管理页面
│   ├── order/             # 订单管理页面
│   ├── inventory/         # 库存管理页面
│   ├── purchase/          # 采购管理页面
│   ├── logistics/         # 物流管理页面
│   ├── after-sale/        # 售后客服页面
│   ├── finance/           # 财务管理页面
│   ├── report/            # 数据报表页面
│   ├── setting/           # 系统设置页面
│   ├── layout.tsx         # 全局布局
│   └── page.tsx           # 首页仪表板
├── components/            # 公共组件
│   └── Layout.tsx         # 主布局组件
├── prisma/                # 数据库配置
│   └── schema.prisma      # Prisma 数据模型
├── public/                # 静态资源
└── .env                   # 环境变量
```

## 数据模型

核心数据模型包含：

- `Shop` - 店铺信息
- `Product` - 商品信息
- `Sku` - 库存单元
- `Order` - 订单信息
- `OrderItem` - 订单商品
- `Warehouse` - 仓库信息
- `Inventory` - 库存记录
- `Purchase` - 采购单
- `Logistics` - 物流信息
- `Refund` - 售后记录
- `FinanceProfit` - 利润记录
- `User` - 用户信息
- `SystemLog` - 系统日志

## 后续开发建议

1. **Shopify API 集成**：实现真正的 OAuth 授权和 webhook 同步
2. **权限系统**：完善 RBAC 权限控制
3. **实时同步**：使用 WebSocket 或 Server-Sent Events 实现实时数据更新
4. **多语言**：支持国际化
5. **移动端**：开发移动端管理应用
6. **部署**：使用 Docker 容器化部署，配置 CI/CD

## 许可证

MIT
