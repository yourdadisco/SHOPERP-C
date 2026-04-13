import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import "./globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Shopify ERP 系统",
  description: "一站式跨境ERP管理平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <ConfigProvider locale={zhCN}>
          <Layout>{children}</Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}
