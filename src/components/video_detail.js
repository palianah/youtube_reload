import React, { Component } from "react";
import { connect } from "react-redux";

class VideoDetail extends Component {

  render() {
    if (!this.props.video) {
      return <div>Video Loading...</div>;
    }

    const videoId = this.props.video.id.videoId;
    let url = "";
    // https://developers.google.com/youtube/player_parameters#loop
    if(this.props.loopVideo > 0) {
      url = `https://www.youtube.com/embed/${videoId}?loop=1&playlist=${videoId}&modestbranding=1`;
    } else {
      url = `https://www.youtube.com/embed/${videoId}?modestbranding=1`;
    }

    return (
      <div className="video-detail col-md-8">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe autoPlay="autoplay" className="embed-responsive-item" src={url} />
        </div>
        <div className="details">
          <h2>{this.props.video.snippet.title}</h2>
          <p>{this.props.video.snippet.description}</p>
        </div>
      </div>
    );

  }
};



function mapStateToProps(state) {
  return {
    video: state.videos.activeVideo,
    loopVideo: state.videos.loopVideo
  };
}

export default connect(mapStateToProps)(VideoDetail);
