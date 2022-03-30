import React, { useContext } from "react";
import { Card, Row, Col, Image, Form, Input, Button, Modal } from "antd";
import logo from "./parklogo.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../GlobalContext/AuthContext";

function Login({ history }) {
  const Auth = useContext(AuthContext);
  const navigateTo = useNavigate();
  const onFinish = async (values) => {
    try {
      console.log("login", values);
      const { success, errorMessage, userData } = await Auth.authenticate(
        values
      );
      {
        success
          ? Modal.success({
              content: "Successfully Log in!",
            })
          : Modal.error({
              content: "Email or Password is incorrect!",
            });
      }
      console.log("success login", success);
      navigateTo("/main");
      // if (userData.myStatus === 1) {
      //   history.push("/admin/homepage");
      // } else {
      //   <Navigate to="/homepage" />;
      // }
    } catch (error) {
      console.log("error", error);
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
            <Link to="/">
              <ArrowLeftOutlined width={300} height={300} />
            </Link>
          </div>
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <Image width={200} src={logo} />

            <p style={{ fontWeight: "bold", marginTop: 50 }}>LOGIN</p>
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
              <Form.Item
                wrapperCol={{}}
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
              >
                <Row>
                  <Col flex="auto">
                    <Input />
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                wrapperCol={{}}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Link className="password" to={"/age"}>
                Forgot Password?
              </Link>

              <Form.Item wrapperCol={{}}>
                <Row>
                  <Col flex="auto">
                    <Button
                      className="loginButton"
                      type="primary"
                      htmlType="submit"
                      block
                      style={{ borderRadius: "25px" }}
                    >
                      LOGIN
                    </Button>
                  </Col>
                </Row>
                <Link to="/registration" className="createaccount">
                  <p type="bold" style={{ marginTop: "20px" }}>
                    Create an Account
                  </p>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default Login;
