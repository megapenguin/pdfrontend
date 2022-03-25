import { Card, Row, Col, Image, Form, Input, Button, Checkbox } from "antd";
import logo from "./parklogo.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { Cascader, Select, AutoComplete } from "antd";
import React, { useState } from "react";
import axios from "axios";

function RegistrationForm({ history }) {
  const onFinish = async (values) => {
    values["status"] = "user";
    values["profilePicture"] = "";

    try {
      axios
        .post("/api/v1/users/register", values)
        .then((res) => {
          history.push("/login");
        })

        .catch((error) => console.log(error));
      console.log("value", values);
    } catch (error) {
      console.log(error);
    }
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
          <div>
            <Link to="/register">
              <ArrowLeftOutlined width={300} height={300} />
            </Link>
          </div>
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <Image width={30} src={logo} />

            <Form
              name="basic"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 25,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                style={{ marginTop: "30px" }}
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname",
                  },
                ]}
              >
                <Input placeholder="Firstname" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname",
                  },
                ]}
              >
                <Input placeholder="Lastname" />
              </Form.Item>
              <Form.Item
                name="contactNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="Contact Number" />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname",
                  },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item wrapperCol={{}}>
                <Row>
                  <Col flex="auto">
                    <Button
                      className="RegButton"
                      type="primary"
                      htmlType="submit"
                      block
                      style={{
                        borderRadius: "25px",
                        marginTop: "10px",
                        background: "teal",
                        border: "none",
                      }}
                    >
                      SIGN UP
                    </Button>
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

export default RegistrationForm;
