// src/components/SecureVideoPlayer.tsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Hls from 'hls.js';
import ReactPlayer from 'react-player';
import { BASE_URL } from '../utils/constants';

const SecureVideoPlayer = () => {
  const videoRef = useRef(null);
  const [lastPosition, setLastPosition] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleMetaDataLoaded = () => {
    if(videoRef.current) {
      videoRef.current.currentTime = lastPosition;
    }
  }

  const handleTimeUpdate = () => {
    console.log('Current Time', videoRef.current.currentTime)
  }

  useEffect(() => {
    async function fetchVideoUrl() {
      try {
        const res = await axios.get(BASE_URL + '/course/video', { withCredentials: true });

        const signedUrl = res.data.signedUrl;
        setVideoUrl(signedUrl)

        // if(Hls.isSupported()) {
        //   const video = document.getElementById('video')
        //   const hls = new Hls()
        //   hls.loadSource(signedUrl)
        //   hls.attachMedia(video)
        // } else {
        //   setVideoUrl(signedUrl);
        // }

      } catch (err) {
        console.error('Failed to load video:', err);
      }
    }

    fetchVideoUrl();
  }, []);

  return (
    <div>
      {videoUrl && (
        <video
          ref={videoRef}
          width={640}
          height={360}
          controls
          controlsList="nodownload"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleMetaDataLoaded}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default SecureVideoPlayer;
