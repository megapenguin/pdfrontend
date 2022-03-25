import React from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Form,
  Input,
  Button,
  Checkbox,
  Space,
  List,
  Avatar,
  Skeleton,
  Drawer,
  Divider,
} from "antd";
import reqwest from "reqwest";
import { ArrowLeftOutlined, AudioOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";

function FindParkingSpace() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const onSearch = (value) => console.log(value);

  return (
    <Row justify="center">
      <Col>
        <Card
          bordered={true}
          style={{
            width: 300,
            marginTop: 50,
            boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
          }}
        >
          <div>
            <Link to="/register">
              <ArrowLeftOutlined width={300} height={300} />
            </Link>
          </div>
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "5px",
            }}
          >
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item wrapperCol={{}}>
                <Row justify="center">
                  <Col>
                    <p
                      style={{
                        fontSize: 15,
                        marginTop: 5,
                        color: "teal",
                        fontFamily: "fantasy",
                      }}
                    >
                      Find Parking Space
                    </p>
                    <Space direction="vertical">
                      <Search
                        placeholder="Search Parking Space"
                        onSearch={onSearch}
                        enterButton
                      />
                      <p>shana</p>
                    </Space>
                    <p
                      style={{
                        fontSize: 12,
                        marginTop: 50,
                        color: "#4B6587",
                        fontFamily: "fantasy",
                        textAlign: "left",
                      }}
                    >
                      Near You
                    </p>
                    <p
                      style={{
                        fontSize: 12,
                        marginTop: 100,
                        color: "#4B6587",
                        fontFamily: "fantasy",
                        textAlign: "left",
                      }}
                    >
                      Popular
                    </p>

                    <Link to="/login">
                      <Button
                        className="loginButton"
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                          borderRadius: "25px",
                          background: "red",
                          border: "none",
                          marginTop: 100,
                        }}
                      >
                        LOGOUT
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default FindParkingSpace;
