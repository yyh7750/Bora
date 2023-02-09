import React, { useEffect, useRef } from "react";
import "./StreamComponent.css";

const OvVideoComponent = (props) => {
  const videoRef = useRef();

  useEffect((props) => {
    if (props && props.user.streamManager && !!videoRef) {
      console.log("PROPS: ", props);
      props.user.getStreamManager().addVideoElement(videoRef.current);
    }
    if (
      props &&
      props.user.streamManager.session &&
      this.props.user &&
      !!videoRef
    ) {
      props.user.streamManager.session.on("signal:userChanged", (event) => {
        const data = JSON.parse(event.data);
        if (data.isScreenShareActive !== undefined) {
          props.user.getStreamManager().addVideoElement(videoRef.current);
        }
      });
    }
  }, []);

  useEffect((props) => {
    if (props && !!videoRef) {
      props.user.getStreamManager().addVideoElement(videoRef.current);
      console.log(props.user.getStreamManager());
    }
  });

  return (
    <video
      autoPlay={true}
      id={"video-" + this.props.user.getStreamManager().stream.streamId}
      ref={this.videoRef}
      // 들어오면 소리 꺼놓는건가?
      // muted={this.props.mutedSound}
    />
  );
};

export default OvVideoComponent;
