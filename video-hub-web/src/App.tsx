/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Layout, notification } from "antd";
import { VideoListView } from "./modules/videos/VideoListView";
import AppContext from "./contexts/App.context";
import { AppHeader } from "./modules/app-header/AppHeader";
import { socket } from "./core/socket";

type NotificationType = "success" | "info" | "warning" | "error";
const { Content } = Layout;

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [reload, setReload] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<{ username: string }>({
    username: "",
  });
  const [api, contextHolder] = notification.useNotification();

  const openNotification = useCallback(
    (type: NotificationType, message: string, description: string) => {
      api[type]({
        message,
        description,
      });
    },
    [api]
  );

  const handleVideosEvent = useCallback(
    (data: any) => {
      if (authenticated) {
        if (data.user.username !== authUser.username) {
          openNotification(
            "info",
            "New video shared",
            `${data.user.username} shared a new video: ${data.video.title}`
          );
          setReload(!reload);
        }
      }
    },
    [authUser, authenticated, reload, openNotification]
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("videos", handleVideosEvent);

    return () => {
      socket.off("connect");
      socket.off("videos", handleVideosEvent);
    };
  }, [handleVideosEvent]);

  return (
    <>
      {contextHolder}
      <AppContext.Provider
        value={{
          authenticated,
          setAuthenticated,
          accessToken,
          setAccessToken,
          authUser,
          setAuthUser,
          reload,
          setReload,
        }}
      >
        <Layout>
          <AppHeader />
          <Layout style={{ padding: "64px 200px 24px" }}>
            <Content>
              <VideoListView reload={reload}></VideoListView>
            </Content>
          </Layout>
        </Layout>
      </AppContext.Provider>
    </>
  );
}

export default App;
