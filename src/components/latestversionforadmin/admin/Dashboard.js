import React from "react";
import { Image, Card, Row, Col, Divider } from "antd";
import car from "./icons/car.png";
import history from "./icons/history.png";
import request from "./icons/request.png";
import user from "./icons/user.png";

const { Meta } = Card;
function Dashboard() {
	return (
		<div>
			<Row justify="space-around" style={{ marginTop: "20px" }}>
				<Col span={4}>
					<Card
						hoverable
						style={{ width: 240, padding: "15px" }}
						cover={<img src={user} />}
					>
						<div style={{ textAlign: "center" }}>
							<Meta title="USERS" />
						</div>
					</Card>
				</Col>
				<Col span={4}>
					<Card
						hoverable
						style={{ width: 240, padding: "15px" }}
						cover={<img src={car} />}
					>
						<div style={{ textAlign: "center" }}>
							<Meta title="PROVIDERS" />
						</div>
					</Card>
				</Col>
				<Col span={4}>
					<Card
						hoverable
						style={{ width: 240, padding: "15px" }}
						cover={<img src={request} />}
					>
						<div style={{ textAlign: "center" }}>
							<Meta title="REQUESTS" />
						</div>
					</Card>
				</Col>
				<Col span={4}>
					<Card
						hoverable
						style={{ width: 240, padding: "15px" }}
						cover={<img src={history} />}
					>
						<div style={{ textAlign: "center" }}>
							<Meta title="HISTORY" />
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default Dashboard;
