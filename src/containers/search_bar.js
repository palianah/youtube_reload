import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchVideo, activeVideo, fetchFilters } from "../actions/index";

class SearchBar extends Component {

  constructor(props) {
    super(props);

    const param = this.props.videos.filters;

    // component only state to hold the term and search params
    // which data comes from redux state
    this.state = {
      term: param.term,
      sMaxResults: param.sMaxResults,
      sOrder: param.sOrder, // relevance,date,rating,title,videoCount,viewCount
      sVideoDuration: param.sVideoDuration, // any,long,medium,short
      sVideoType: param.sVideoType // any,episode,movie
    };

    //this.onInputChange = _.debounce(this.onInputChange.bind(this), 300);
    this.onInputChange = this.onInputChange.bind(this);

    // debounce the passed in dispatch method
    this.termChanged = _.debounce(this.props.fetchVideo, 300);
    this.filterChanged = _.debounce(this.props.fetchFilters, 300);
  }

  // hook into lifecycle method to
  componentWillMount() {
    const props = this.props;
    // call actionCreator fetchVideo with the current state term and make
    // a promise, when request is finished and all videos are fetched,
    // set current Video to first in array

    this.props.fetchVideo(this.state)
    .then(response => {
      if(response.payload.data.items && response.payload.data.items.length > 0) {
        props.activeVideo(response.payload.data.items[0]);
      }
    });
  }

  onInputChange(term) {
    this.setState({ term });

    this.setState({ term }, () => {
      // arrow function to debounce dispatch fetchVideo
      this.termChanged(this.state);
      // fetch also filter so it can be used on the search_filter component
      this.filterChanged(this.state);
    });
  }

  render() {
    return(
      <div className="col-md-12">
        <div className="search-bar form-group">
          <input
            id="search"
            className="form-control"
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)} />
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return { videos: state.videos };
}

function mapDistpatchToProps(dispatch) {
  return bindActionCreators({
    fetchVideo, activeVideo, fetchFilters
  }, dispatch)
}

export default connect(mapStateToProps, mapDistpatchToProps)(SearchBar);
