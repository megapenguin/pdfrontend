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
import { BoldOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../GlobalContext/AuthContext";

function HomePage({ history }) {
  const Auth = useContext(AuthContext);
  const navigateTo = useNavigate();

  const [userInfo, setUserInfo] = useState(Auth.state.userData);
  const gotoProviderPage = () => {
    if (userInfo.status === true) {
      console.log("click");
      navigateTo("/provider");
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
          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "35px",
            }}
          >
            <Image preview={false} width={200} src={logo} />
            <Link to="/findparkingspace">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginTop: 35,
                  color: "black",
                }}
              >
                Find Parking Space
              </p>
            </Link>

            <p
              onClick={gotoProviderPage}
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 10,
                color: "black",
              }}
            >
              Provide Parking Space
            </p>

            <Link to="/mainprofile">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  marginTop: 50,
                  textAlign: "left",
                }}
              >
                Profile
              </p>
            </Link>
          </div>
          <div>
            <Row justify="center">
              <Button
                className="loginButton"
                type="primary"
                onClick={() => logout()}
                block
                style={{
                  borderRadius: "25px",
                  background: "red",
                  border: "none",
                  marginTop: 30,
                }}
              >
                LOGOUT
              </Button>
            </Row>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default HomePage;
