import React, { useState } from "react";
import "./AdminLayout.css";
import { Layout, Menu, Image } from "antd";
import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import logo from "./parklogo.png";
const { Header, Content, Footer, Sider } = Layout;

function AdminLayout() {
	return (
		<div>
			<Layout>
				<Sider
					style={{ height: "100vh" }}
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoint={(broken) => {
						console.log(broken);
					}}
					onCollapse={(collapsed, type) => {
						console.log(collapsed, type);
					}}
				>
					<div className="logo" />
					<div style={{ textAlign: "center", margin: "20px" }}>
						<Image
							preview={false}
							style={{
								width: "130.43px",
								height: "86.95px",
								backgroundColor: "white",
							}}
							src={logo}
						/>
					</div>

					<Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
						<Menu.Item key="1" icon={<UserOutlined />}>
							nav 1
						</Menu.Item>
						<Menu.Item key="2" icon={<VideoCameraOutlined />}>
							nav 2
						</Menu.Item>
						<Menu.Item key="3" icon={<UploadOutlined />}>
							nav 3
						</Menu.Item>
						<Menu.Item key="4" icon={<UserOutlined />}>
							nav 4
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout>
					<Header
						className="site-layout-sub-header-background"
						style={{ padding: 0 }}
					/>
					<Content style={{ margin: "24px 16px 0" }}>
						<div
							className="site-layout-background"
							style={{ padding: 24, minHeight: 360 }}
						>
							content
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>
						Ant Design ©2018 Created by Ant UED
					</Footer>
				</Layout>
			</Layout>
		</div>
	);
}

export default AdminLayout;
