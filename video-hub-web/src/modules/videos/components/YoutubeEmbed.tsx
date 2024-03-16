export const YoutubeEmbed: React.FC<{ videoId: string }> = (props: {
  videoId: string;
}) => {
  const { videoId } = props;

  return (
    <div className="video-responsive">
      <iframe
        width="480"
        height="270"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};
