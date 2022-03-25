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
  Modal,
  Upload,
  Typography,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  UploadOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { AuthContext } from "../../GlobalContext/AuthContext";
import axios from "axios";

function ProfileInfo() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  let Auth = useContext(AuthContext);
  //setting user info
  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const [uploadImageStatus, setUploadImageStatus] = useState("none");
  const [imageStatus, setImageStatus] = useState(false);
  const [userInfo, setUserInfo] = useState(Auth.state.userData);
  const [profilePicture, setProfilePicture] = useState("");
  useEffect(() => {
    form.setFieldsValue({
      id: userInfo.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      contactNumber: userInfo.contactNumber,
      email: userInfo.email,
      username: userInfo.username,
    });
  }, []);
  const onFinish = (values) => {
    values["profilePicture"] = profilePicture;
    axios
      .post("/api/v1/users/update_user", values)
      .then((res) => {
        Auth.state.userData.profilePicture = values.profilePicture;
        Auth.state.userData.firstName = values.firstName;
        Auth.state.userData.lastName = values.lastName;
        Auth.state.userData.contactNumber = values.contactNumber;
        Auth.state.userData.email = values.email;
        Auth.state.userData.username = values.username;
        Modal.success({
          content: "Successfully updated profile info",
          okButtonProps: {},
        });
      })
      .catch((error) => console.log(error));

    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const removeImage = (val) => {
    console.log("Removed image", filename, val);
    axios
      .delete("/api/v1/images/delete_folder_image", {
        params: {
          fileName: val.response.imageSmall,
          fileId: val.response.id,
        },
      })
      .then((res) => {
        setUploadImageStatus("removed");
        // console.log(res.data);
      })
      .catch((error) => console.log(error));
    setUploadedImagePath();
    message.error(`File removed Successfully.`);
  };

  const uploadFile = {
    name: "file",
    action: "/api/v1/images/add_image",
    headers: {
      authorization: "authorization-text",
    },
    data: { userId: userInfo.id, imageType: 1 },
    onChange(info) {
      console.log("info", info);
      if (info.file.status !== "uploading") {
        //console.log("uploading", info.file, info.fileList);
      }
      if (info.file.status === "removed") {
        setImageStatus(false);
        setProfilePicture("");
      }
      if (info.file.status === "done") {
        setImageStatus(true);
        setProfilePicture(info.file.response.imageSmall);
        message.success(`${info.file.name} file uploaded Successfully.`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload Failed.`);
      }
      setUploadImageStatus(info.file.status);
      setFilename(info);

      // 	axios
      // 		.post("/api/v1/images/search_images", {
      // 			userId: userInfo.id,
      // 			imageType: 1,
      // 		})
      // 		.then((res) => {
      // 			let data = res.data;
      // 		})
      // 		.catch((error) => console.log(error));
    },
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
            <Link to="/mainprofile">
              <ArrowLeftOutlined style={{ marginBottom: "10px" }} />
            </Link>
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
              PROFILE INFO
            </p>

            <Divider
              style={{
                backgroundColor: "#B2BEB5",
                marginBottom: 20,
                marginTop: 5,
              }}
            ></Divider>
            <ImgCrop rotate>
              <Upload
                {...uploadFile}
                onRemove={removeImage}
                listType="picture-card"
                showUploadList={{ showPreviewIcon: false }}
                maxCount={1}
              >
                <p style={{ fontWeight: "bold" }}>
                  <PictureOutlined /> Upload Profile Picture
                </p>
              </Upload>
            </ImgCrop>
            <Form
              form={form}
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
              <Form.Item label="Id:" name="id">
                <Input
                  disabled={true}
                  bordered={false}
                  style={{ border: 0, borderBottom: "2px solid black" }}
                />
              </Form.Item>

              <Form.Item label="First Name: " name="firstName">
                <Input style={{ border: 0, borderBottom: "2px solid black" }} />
              </Form.Item>

              <Form.Item label="Last Name:" name="lastName">
                <Input style={{ border: 0, borderBottom: "2px solid black" }} />
              </Form.Item>
              <Form.Item label="Contact #:" name="contactNumber">
                <Input style={{ border: 0, borderBottom: "2px solid black" }} />
              </Form.Item>

              <Form.Item label="Email:" name="email">
                <Input style={{ border: 0, borderBottom: "2px solid black" }} />
              </Form.Item>
              <Form.Item label="Username:" name="username">
                <Input style={{ border: 0, borderBottom: "2px solid black" }} />
              </Form.Item>
              <Form.Item>
                <div style={{ justifyContent: "center" }}>
                  <Button
                    flex="auto"
                    className="loginButton"
                    type="primary"
                    htmlType="submit"
                    block
                    style={{ borderRadius: "25px" }}
                  >
                    SAVE CHANGES
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default ProfileInfo;
