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
  Upload,
  message,
  Typography,
} from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { Cascader, Select, AutoComplete } from "antd";
import React, { useContext, useState, useEffect } from "react";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { AuthContext } from "../../GlobalContext/AuthContext";

function AddParkingLot({ history }) {
  const { Title } = Typography;
  const Auth = useContext(AuthContext);
  //setting user info
  const [userInfo, setUserInfo] = useState(Auth.state.userData);
  const [parkinglotPicture, setParkinglotPicture] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [uploadedImagePath, setUploadedImagePath] = useState("");
  const [uploadImageStatus, setUploadImageStatus] = useState("none");
  const [provider, setProvider] = useState({});
  const onFinish = async (values) => {
    values["providerId"] = provider.id;
    values["parkinglotPicture"] = parkinglotPicture;
    values["parkinglotStatus"] = 0;
    values["reservedSlots"] = 0;
    values["totalSlots"] = 0;
    values["vehicleType"] = 0;

    try {
      axios
        .post("/api/v1/parkinglots/addparkinglot", values)
        .then((res) => {
          history.push("/manageparkingspace");
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
        setParkinglotPicture("");
        //console.log("uploading", info.file, info.fileList);
      }
      if (info.file.status === "done") {
        setParkinglotPicture(info.file.response.imageSmall);
        message.success(`${info.file.name} file uploaded Successfully.`);
      } else if (info.file.status === "error") {
        setParkinglotPicture("");
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
  const deleteImage = (id, imagePath) => {
    axios
      .delete("/api/v1/images/delete_folder_image", {
        params: {
          fileName: imagePath,
          fileId: id,
        },
      })
      .then((res) => {
        // 	let imagesCopy = [];
        // 	imagesCopy = imagesCopy.filter((image) => image.id !== id);
        // 	if (
        // 		imagesCopy.length === 0 ||
        // 		Auth.state.userData.profilePicture === imagePath
        // 	) {
        // 		axios
        // 			.post("/api/v1/users/update_profile_picture", {
        // 				id: userInfo.id,
        // 				profilePicture: "",
        // 			})
        // 			.then((res) => {
        // 				Auth.state.userData.profilePicture = "";
        // 			})
        // 			.catch((error) => console.log(error));
        // 	} else {wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
        // 	}
        // 	Modal.warning({
        // 		content: "Image has been removed",
        // 		okButtonProps: {},
        // 	});
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    axios

      .post("/api/v1/providers/findprovider", { value: userInfo.id })
      .then((res) => {
        let data = res.data[0];
        setProvider(data);
        console.log("provider", res.data);
      })

      .catch((error) => console.log(error));
    console.log("provider", provider);
  }, []);
  useEffect(() => {
    console.log("provider", provider);
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
            <ImgCrop rotate>
              <Upload
                {...uploadFile}
                onRemove={removeImage}
                listType="picture-card"
                showUploadList={{ showPreviewIcon: false }}
                maxCount={1}
              >
                <Title style={{ fontWeight: "bold" }} level={5}>
                  <UploadOutlined spin={true} /> Parking Lot Picture
                </Title>
              </Upload>
            </ImgCrop>

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
                name="parkinglotName"
                rules={[
                  {
                    required: true,
                    message: "Please input parking lot name!",
                  },
                ]}
              >
                <Input placeholder="Parking Lot Name" />
              </Form.Item>
              <Form.Item
                name="parkinglotAddress"
                rules={[
                  {
                    required: true,
                    message: "Please input parking lot address!",
                  },
                ]}
              >
                <Input placeholder="Parking Lot Address" />
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
                name="parkingRate"
                rules={[
                  {
                    required: true,
                    message: "Please input parking lot rate!",
                  },
                ]}
              >
                <Input placeholder="Parking Lot Rate" />
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
                      ADD PARKING LOT
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

export default AddParkingLot;
