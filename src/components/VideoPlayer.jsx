import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  return (
    <div className="w-full">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=example"
        width="100%"
        height="300px"
        controls={true}
      />
    </div>
  );
};

export default VideoPlayer;