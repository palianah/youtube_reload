import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { activeVideo } from "../actions/index";

class VideoList extends Component {

  renderVideos() {
    return _.map(this.props.videos, video => {
      const imageUrl = video.snippet.thumbnails.default.url;

      return (
        <li onClick={() => this.props.activeVideo(video)}
            className="list-group-item"
            key={video.etag}>
          <div className="video-list media">
            <div className="media-left">
              <img className="media-object" src={imageUrl} />
            </div>
            <div className="media-body">
              <div className="media-heading">{video.snippet.title}</div>
            </div>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="col-md-4 list-group">
        {this.renderVideos()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { videos: state.videos.videos };
}

// different method to bind action creator to redux connect
// passing only an object and the list of actions
export default connect(mapStateToProps, { activeVideo })(VideoList);
