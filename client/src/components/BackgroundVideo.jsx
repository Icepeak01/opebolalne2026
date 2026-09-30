// client/src/components/BackgroundVideo.jsx
import { BACKGROUND_VIDEO_SRC } from '../config';

export default function BackgroundVideo() {
  return (
    <>
      {BACKGROUND_VIDEO_SRC && (
        <div className="bg-video-wrap">
          <video
            className="bg-video"
            autoPlay
            loop
            muted
            playsInline
            src={BACKGROUND_VIDEO_SRC}
          />
        </div>
      )}
      <div className="bg-overlay" />
    </>
  );
}
