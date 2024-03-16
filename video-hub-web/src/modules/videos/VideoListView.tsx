import { Flex, List, Typography } from "antd";
import { YoutubeEmbed } from "./components/YoutubeEmbed";
import { VideoEntity } from "./interfaces";
import { useEffect, useState } from "react";
import { EyeOutlined, LikeOutlined, ShareAltOutlined } from "@ant-design/icons";
import { getVideosProxy } from "../../app.proxy";
import "./style.css";

interface Props {
  reload: boolean;
}

export const VideoListView: React.FC<Props> = (props: Props) => {
  const { reload } = props;
  const [videos, setVideos] = useState<VideoEntity[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);

  const fetchVideos = async (page: number, limit: number) => {
    try {
      const data = await getVideosProxy(page, limit);
      setVideos(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideos(pageNumber, pageSize);
  }, [reload, pageNumber, pageSize]);

  return (
    <>
      <List
        pagination={{
          position: "bottom",
          align: "center",
          pageSize,
          total,
          onChange(page, pageSize) {
            setPageNumber(page);
            setPageSize(pageSize);
          },
        }}
      >
        {videos.map((video) => (
          <List.Item key={video.id}>
            <YoutubeEmbed videoId={video.youtubeId} />
            <Flex vertical style={{ marginLeft: "24px" }}>
              <Typography.Title level={5}>{video.title}</Typography.Title>
              <Typography.Paragraph className="text-description">
                {video.description}
              </Typography.Paragraph>
              <Flex>
                <EyeOutlined></EyeOutlined>
                <Typography.Text style={{ marginLeft: "4px" }}>
                  {video.statistics.viewCount.toLocaleString()}
                </Typography.Text>
                <LikeOutlined style={{ marginLeft: "16px" }}></LikeOutlined>
                <Typography.Text style={{ marginLeft: "4px" }}>
                  {video.statistics.likeCount.toLocaleString()}
                </Typography.Text>
                <ShareAltOutlined
                  style={{ marginLeft: "16px" }}
                ></ShareAltOutlined>
                <Typography.Text style={{ marginLeft: "4px" }}>
                  {video.shareCount.toLocaleString()}
                </Typography.Text>
              </Flex>
            </Flex>
          </List.Item>
        ))}
      </List>
    </>
  );
};
