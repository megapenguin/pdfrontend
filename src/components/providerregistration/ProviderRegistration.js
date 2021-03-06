import { Card, Row, Col, Image, Form, Input, Button, Checkbox } from "antd";
import logo from "./parklogo.png";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Cascader, Select, AutoComplete } from "antd";
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../GlobalContext/AuthContext";
function ProviderRegistration({ history }) {
  const Auth = useContext(AuthContext);
  const navigateTo = useNavigate();
  const [userInfo, setUserInfo] = useState(Auth.state.userData);
  const onFinish = async (values) => {
    values["userid"] = userInfo.id;
    values["parkinglotstatus"] = false;
    try {
      axios
        .post("/api/v1/parkinglots/add_parkinglot", values)
        .then((res) => {
          axios
            .put(`/api/v1/users/update_user/${userInfo.id}`, {
              providerstatus: true,
            })
            .then(() => {
              Auth.state.userData.providerstatus = true;
              navigateTo("/main");
            });
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
            <Link to="/provider">
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
            <Image width={30} src={logo} style={{ marginBottom: 30 }} />

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
                name="parkinglotcontact"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="Parking Lot Contact Number" />
              </Form.Item>
              <Form.Item
                name="parkinglotaddress"
                rules={[
                  {
                    required: true,
                    message: "Please input your Address",
                  },
                ]}
              >
                <Input placeholder="Parking Lot Address" />
              </Form.Item>
              <Form.Item
                name="parkinglotdescription"
                rules={[
                  {
                    required: true,
                    message: "Please input description",
                  },
                ]}
              >
                <Input placeholder="Parking Lot Descirption" />
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
                      Register
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

export default ProviderRegistration;
