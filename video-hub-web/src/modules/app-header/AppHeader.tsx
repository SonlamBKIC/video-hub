/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Row,
  Col,
  Input,
  Typography,
  Button,
  Layout,
  notification,
  Modal,
  Form,
} from "antd";
import { useContext, useState } from "react";
import AppContext from "../../contexts/App.context";
import "./style.css";
import { loginProxy, registerProxy, shareVideoProxy } from "../../app.proxy";

type NotificationType = "success" | "info" | "warning" | "error";
const { Header } = Layout;

export const AppHeader: React.FC<unknown> = () => {
  const {
    setAuthenticated,
    setAccessToken,
    authenticated,
    authUser,
    accessToken,
    reload,
    setReload,
    setAuthUser,
  } = useContext(AppContext);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareForm] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    shareForm.resetFields();
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (values: { url: string }) => {
    console.log("Submit", values);
    try {
      await shareVideoProxy(values.url, accessToken);
      openNotification("success", "Video shared successfully");
      handleCancel();
      setReload(!reload);
    } catch (error) {
      openNotification("error", "Failed to share video");
      console.error(error);
    }
  };

  const openNotification = (type: NotificationType, message: string) => {
    api[type]({
      message,
    });
  };

  const register = async () => {
    await registerProxy(username, password);
    openNotification("success", "Successfully registered");
  };

  const login = async () => {
    const response = await loginProxy(username, password);
    setAccessToken(response.access_token);
    setAuthUser({ username });
    setAuthenticated(true);
    openNotification("success", "Successfully logged in");
  };

  const handleLoginRegisterButton = async () => {
    try {
      await login();
    } catch (error: any) {
      if (error.response.data.statusCode === 404) {
        try {
          await register();
          await login();
        } catch (error) {
          openNotification("error", "Failed to register");
          console.error(error);
        }
      } else {
        openNotification("error", "Invalid credentials");
      }
    }
  };

  const logout = () => {
    setUsername("");
    setPassword("");
    setAuthenticated(false);
    setAccessToken("");
    setAuthUser({ username: "" });
    openNotification("info", "Successfully logged out");
  };

  return (
    <>
      {contextHolder}
      <Header className="header">
        <Row>
          <Col span={14}>
            <Typography.Title
              level={3}
              style={{ color: "white", paddingBottom: "8px" }}
            >
              Video Hub
            </Typography.Title>
          </Col>
          {authenticated ? (
            <>
              <Col span={4}>
                <Typography.Title
                  level={5}
                  style={{ color: "white", textAlign: "left" }}
                >
                  Welcome! {authUser.username}
                </Typography.Title>
              </Col>
              <Col
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <Button onClick={showModal}>Share a video</Button>
              </Col>
              <Col
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                }}
              >
                <Button onClick={logout}>Logout</Button>
              </Col>
            </>
          ) : (
            <>
              <Col span={4}>
                <Input
                  className="login-input"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                ></Input>
              </Col>
              <Col span={4}>
                <Input
                  type="password"
                  className="login-input"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Input>
              </Col>
              <Col span={2}>
                <Button onClick={handleLoginRegisterButton}>
                  Login / Register
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Header>
      <Modal
        title="Share A Video"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={shareForm}
          initialValues={{ url: "" }}
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label="Youtube URL"
            name="url"
            rules={[{ required: true, message: "Please input url" }]}
            validateTrigger={["onBlur"]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
