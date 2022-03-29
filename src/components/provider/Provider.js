import React, { useContext, useState } from "react";
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
} from "antd";
import logo from "./parklogo.png";
import { BoldOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../GlobalContext/AuthContext";

function Provider({ history }) {
  const Auth = useContext(AuthContext);
  const navigateTo = useNavigate();

  const [userInfo, setUserInfo] = useState(Auth.state.userData);
  const gotoProviderPage = () => {
    if (userInfo.status === true) {
      history.push("/provider");
    } else {
      Modal.error({
        content: "You are not a verified user!",
      });
    }
  };
  const logout = () => {
    try {
      localStorage.clear();
      Auth.state.isAuthenticated = false;
      console.log(Auth);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
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
            <Image width={200} src={logo} />

            {userInfo.providerstatus === false ? (
              <>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 50,
                    color: "black",
                    marginBottom: 100,
                  }}
                >
                  You are not yet a provider
                </p>

                <Row justify="center">
                  <Col>
                    <Link to="/providerregistration">
                      <Button
                        className="loginButton"
                        type="primary"
                        block
                        style={{
                          borderRadius: "25px",
                          background: "GREEN",
                          border: "none",
                          marginBottom: 30,
                        }}
                      >
                        REGISTER HERE
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginTop: 50,
                    color: "black",
                    marginBottom: 100,
                  }}
                >
                  Registered Provider
                </p>{" "}
                <Row justify="center">
                  <Col>
                    <Link to="/manageparkingspace">
                      <Button
                        className="loginButton"
                        type="primary"
                        block
                        style={{
                          borderRadius: "25px",
                          background: "GREEN",
                          border: "none",
                          marginBottom: 30,
                        }}
                      >
                        MANAGE PARKING SPACE
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default Provider;
