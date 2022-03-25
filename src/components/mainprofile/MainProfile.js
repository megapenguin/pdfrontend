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
  Divider,
  Avatar,
} from "antd";
import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../GlobalContext/AuthContext";

function MainProfile() {
  const Auth = useContext(AuthContext);
  const navigateTo = useNavigate();
  //setting user info
  const [userInfo, setUserInfo] = useState(Auth.state.userData);
  useEffect(() => {
    console.log("userInfo", userInfo);
    // axios

    // 	.post("/api/v1/titles/title", { value: value[1] })
    // 	.then((res) => {

    // 	})

    // 	.catch((error) => console.log(error));
  }, []);

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
            <Link to="/homepage">
              <ArrowLeftOutlined style={{ marginBottom: "10px" }} />
            </Link>
            <Button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </div>

          <div
            style={{
              justifyContent: "center",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginTop: 0,
                color: "teal",
              }}
            >
              MY PROFILE
            </p>
            <div>
              {userInfo.profilePicture == "" ? (
                <Avatar size={60} icon={<UserOutlined />} />
              ) : (
                <Image
                  preview={false}
                  style={{
                    padding: 10,
                    borderColor: "black",
                    borderRadius: "75px",
                  }}
                  src={`/api/v1/images/${userInfo.profilePicture}`}
                />
              )}
            </div>
            <h1
              style={{
                fontSize: "20px",
                fontFamily: "fantasy",
                fontWeight: "lighter",
                color: "#3B7A57",
                marginBottom: "0px",
              }}
            >
              {userInfo.firstName} {userInfo.lastName}
            </h1>
            <Divider
              style={{
                backgroundColor: "#B2BEB5",
                marginBottom: 0,
                marginTop: 5,
              }}
            ></Divider>
            <h3
              style={{
                fontSize: "15px",
                fontFamily: "monospace",
                fontWeight: "lighter",
                color: "#6e00e7",
                marginBottom: "0px",
              }}
            >
              {userInfo.username}
            </h3>
            {userInfo.status === 0 ? (
              <Link to="/verifyaccount">
                <p style={{ textDecoration: "underline", marginTop: "5px" }}>
                  Verify your Account
                </p>
              </Link>
            ) : (
              <p
                style={{
                  fontFamily: "fantasy",
                  marginTop: "4px",
                  color: "teal",
                }}
              >
                Verified
              </p>
            )}

            <Link to="/profileinfo">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  marginTop: 35,
                  color: "black",
                  textAlign: "left",
                }}
              >
                Profile info
              </p>
            </Link>
            <Link to="/login">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  marginTop: 10,
                  color: "black",
                  textAlign: "left",
                }}
              >
                Settings
              </p>
            </Link>
            <Link to="/register">
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  marginTop: 10,
                  color: "black",
                  textAlign: "left",
                }}
              >
                History
              </p>
            </Link>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default MainProfile;
