import React from "react";
import { Card, Row, Col, Image, Form, Input, Button, Checkbox } from "antd";
import logo from "./parklogo.png";
import { BoldOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";

function RegisterLogin() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "35px",
            }}
          >
            <Image width={200} src={logo} />

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
                <Row>
                  <Col flex="auto">
                    <Link to="/login">
                      <Button
                        className="RegButton"
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                          borderRadius: "25px",
                          marginTop: "100px",
                          background: "teal",
                          border: "none",
                        }}
                      >
                        LOGIN
                      </Button>
                    </Link>
                    <Link to="/registration">
                      <Button
                        className="RegButton"
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                          borderRadius: "25px",
                          marginTop: "15px",
                          background: "green",
                          border: "none",
                        }}
                      >
                        REGISTER
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

export default RegisterLogin;
