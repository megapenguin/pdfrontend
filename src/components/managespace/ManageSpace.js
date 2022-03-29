import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Form,
  Input,
  Button,
  Checkbox,
  Modal,
  List,
  Avatar,
} from "antd";
import logo from "./parklogo.png";
import { BoldOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { AuthContext } from "../../GlobalContext/AuthContext";
import axios from "axios";

function ManageSpace({ history }) {
  const Auth = useContext(AuthContext);
  const [parkinglot, setParkinglot] = useState([]);
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  const [userInfo, setUserInfo] = useState(Auth.state.userData);
  const gotoProviderPage = () => {
    if (userInfo.status === 1) {
      console.log("click");
      history.push("/provider");
    } else {
      Modal.error({
        content: "You are not a verified user!",
      });
    }
  };
  const gotoAddParkingLot = () => {
    history.push("/addparkinglot");
  };
  useEffect(() => {
    axios
      .post("/api/v1/providers/findprovider", { value: userInfo.id })
      .then((res) => {
        let data = res.data[0];
        axios
          .post("/api/v1/parkinglots/findparkinglot", { value: data.id })
          .then((res) => {
            console.log("parkinglot", res.data);
            let data = res.data.map((data) => {
              return {
                title: data.parkinglotName,
                parkinglotPicture: data.parkinglotPicture,
              };
            });
            setParkinglot(data);
          });

        console.log("provider", res.data);
      })

      .catch((error) => console.log(error));
  }, []);
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
            <Link to="/main">
              <ArrowLeftOutlined style={{ marginBottom: "10px" }} />
            </Link>
          </div>
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "35px",
            }}
          >
            <Image width={100} src={logo} />
            <p
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 35,
                color: "teal",
              }}
            >
              My Parking Lots
            </p>
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
                        src={`/api/v1/images/${item.parkinglotimage}`}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                  />
                </List.Item>
              )}
            />

            <Row justify="center">
              <Button
                className="loginButton"
                type="primary"
                onClick={() => {
                  gotoAddParkingLot();
                }}
                block
                style={{
                  borderRadius: "25px",
                  background: "green",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                Add Parking Space
              </Button>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default ManageSpace;
