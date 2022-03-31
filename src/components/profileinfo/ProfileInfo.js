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
import { Link, useNavigate } from "react-router-dom";
import ImgCrop from "antd-img-crop";
import { AuthContext } from "../../GlobalContext/AuthContext";
import axios from "axios";

function ProfileInfo() {
  const { Title } = Typography;
  const [form] = Form.useForm();
  let auth = useContext(AuthContext);
  const navigateTo = useNavigate();
  //setting user info
  const [picture, setPicture] = useState(null);
  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const [uploadImageStatus, setUploadImageStatus] = useState("none");
  const [imageStatus, setImageStatus] = useState(false);
  const [userInfo, setUserInfo] = useState(auth.state.userData);
  const [profilePicture, setProfilePicture] = useState("none");
  const [profilePictureId, setProfilePictureId] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    form.setFieldsValue({
      id: userInfo.id,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      contactnumber: userInfo.contactnumber,
      email: userInfo.email,
      username: userInfo.username,
    });
  }, []);
  const onFinish = async (values) => {
    if (fileList.length > 0) {
      values["profile"] = fileList[0].response.smimagepath;
    } else {
      values["profile"] = userInfo.profile;
    }
    console.log("user values", values, fileList.response);
    try {
      //update user info
      let res = await axios.put(
        `/api/v1/users/update_user/${userInfo.id}`,
        values,
        {
          headers: {
            authorization: `Bearer ${auth.state.token}`,
          },
        }
      );
      console.log("update status", res);
      if (res.data) {
        auth.dispatch({
          type: "UPDATE_USER_DATA",
          userData: {
            ...values,
          },
        });
        navigateTo("/mainprofile");
        message.success("Profile updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
    console.log("Success:", values);
  };

  const cancelUpdate = async (profilePicture, profilePictureId) => {
    try {
      let data = axios.delete("/api/v1/images/delete_folder_image", {
        params: {
          fileName: profilePicture,
          fileId: profilePictureId,
        },
      });

      if (data) {
        setUploadImageStatus("removed");
        navigateTo("/mainprofile");
        setUploadedImagePath();
      }
    } catch (error) {}
    navigateTo("/mainprofile");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const removeImage = async (val) => {
    // console.log("Removed image", filename, val);
    try {
      let data = axios.delete("/api/v1/images/delete_folder_image", {
        params: {
          fileName: val.response.smimagepath,
          fileId: val.response.id,
        },
      });

      if (data) {
        setUploadImageStatus("removed");
      }

      setUploadedImagePath();
      setImageStatus(false);
      // message.error(`File removed Successfully.`);
    } catch (error) {}
  };

  // const uploadFile = {
  //   name: "file",
  //   action: "/api/v1/images/upload_image",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   data: { imageownerid: userInfo.id, imagetypeid: 1 },
  //   onChange(info) {
  //     console.log("info", info);
  //     if (info.file.status !== "uploading") {
  //       //console.log("uploading", info.file, info.fileList);
  //     }
  //     if (info.file.status === "removed") {
  //       setImageStatus(false);
  //       setProfilePicture("");
  //     }
  //     if (info.file.status === "done") {
  //       setImageStatus(true);
  //       console.log("done", info.file.response);
  //       setProfilePicture(info.file.response.smimagepath);
  //       setProfilePictureId(info.file.response.id);
  //       message.success(`${info.file.name} file uploaded Successfully.`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload Failed.`);
  //     }
  //     setUploadImageStatus(info.file.status);
  //     setFilename(info);
  //   },
  // };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImageStatus(true);

    console.log(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
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
            <ArrowLeftOutlined
              style={{ marginBottom: "10px" }}
              onClick={() => {
                cancelUpdate(profilePicture, profilePictureId);
              }}
            />
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
            <ImgCrop rotate>
              <Upload
                // {...uploadFile}
                onRemove={removeImage}
                // listType="picture-card"
                // showUploadList={{ showPreviewIcon: false }}
                // maxCount={1}
                action="/api/v1/images/upload_image"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {/* {imageStatus ? "" : "+Upload"} */}
                {fileList.length !== 0 ? "" : "Upload"}
                {/* <p style={{ fontWeight: "bold" }}>
                  <PictureOutlined /> Upload Profile Picture
                </p> */}
              </Upload>
            </ImgCrop>
            <Divider
              style={{
                backgroundColor: "#B2BEB5",
                marginBottom: 20,
                marginTop: 5,
              }}
            ></Divider>

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

              <Form.Item label="First Name: " name="firstname">
                <Input style={{ border: 0, borderBottom: "2px solid black" }} />
              </Form.Item>

              <Form.Item label="Last Name:" name="lastname">
                <Input style={{ border: 0, borderBottom: "2px solid black" }} />
              </Form.Item>
              <Form.Item label="Contact #:" name="contactnumber">
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
