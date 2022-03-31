import React, { useState, useEffect } from "react";
import parklogo from "./parklogo.png";
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
  message,
} from "antd";
import reqwest from "reqwest";
import { ArrowLeftOutlined, AudioOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

function FindParkingSpace() {
  const [parkinglot, setParkinglot] = useState([]);

  useEffect(() => {
    //get all parkinglot
    axios.get("api/v1/parkinglots/getall").then((res) => {
      let data = res.data.map((data) => {
        return {
          id: data.id,
          title: data.parkinglotname,
          description: data.parkinglotdescription,
          image: data.parkinglotimage,
        };
      });
      setParkinglot(data);
    });
  }, []);

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

  const onSearch = async (value) => {
    if (value) {
      try {
        let newdata = await axios.get(
          `api/v1/parkinglots/search_parkinglot/${value}`
        );
        let parkinglotdata = newdata.data.map((data) => {
          return {
            id: data.id,
            title: data.parkinglotname,
            description: data.parkinglotdescription,
            image: data.parkinglotimage,
          };
        });
        setParkinglot(parkinglotdata);
        console.log(newdata);
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error("Please enter the name or address of the parkinglot");
    }
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
                    </Space>
                    <List
                      itemLayout="horizontal"
                      dataSource={parkinglot}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                size={64}
                                shape="square"
                                src={
                                  item.parkinglotimage
                                    ? `/api/v1/images/${item.parkinglotimage}`
                                    : parklogo
                                }
                              />
                            }
                            title={
                              <a href="https://ant.design">{item.title}</a>
                            }
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />

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
