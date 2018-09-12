import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchVideo, fetchLoop } from "../actions/index";

class SearchFilter extends Component {

  constructor(props) {
    super(props);

    const filter = this.props.filters;

    // component state which data is filled from redux state
    // only the changed filter param is replaced in this state
    // and get's updated calling action and sending
    // dispatched state to redux
    this.state = {
      term: filter.term,
      sMaxResults: filter.sMaxResults,
      sOrder: filter.sOrder,
      sVideoDuration: filter.sVideoDuration,
      sVideoType: filter.sVideoType,
      loopVideo: this.props.loopVideo
    }
  }

  onFilterButtonClick(event) {
    var element = document.getElementById('collapseFilter');

    var className = ' ' + element.className + ' ';

    if ( ~className.indexOf(' filter-active ') ) {
        element.className = className.replace(' filter-active ', ' ');
    } else {
        element.className += ' filter-active';
    }
  }

  onSelectChange(event) {
    const selected = event.target.value;
    const name = event.target.name;

    this.setState({
      // term must be set on every change because the search term can't
      // ne cached in the constructor, it could be changed from user
      term: this.props.filters.term,
      [name]: selected
    }, () => {
      this.props.fetchVideo(this.state);
    });
  }

  handleCheckboxChange(event) {
    const checked = (event.target.checked) ? 1 : 0;
    this.setState({
      loopVideo: checked
    });
    this.props.fetchLoop(checked);
  }

  render() {
    return (
      <div className="col-md-12">
        <button className="btn btn-primary toggle-filter" onClick={this.onFilterButtonClick.bind(this)}>Filter</button>
        <div className="form-row filter" id="collapseFilter">
          <div className="form-group col-md-3">
            <label htmlFor="sOrder">Order</label>
            <select id="sOrder"
                    name="sOrder"
                    className="form-control"
                    onChange={this.onSelectChange.bind(this)}>
              <option value="relevance" defaultValue>Relevance</option>
              <option value="date">Date</option>
              <option value="rating">Rating</option>
              <option value="title">Title</option>
              <option value="videoCount">Video Count</option>
              <option value="viewCount">View Count</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="sMaxResults">Max Results</label>
            <select id="sMaxResults"
                    name="sMaxResults"
                    className="form-control"
                    onChange={this.onSelectChange.bind(this)}>
              <option value="5" defaultValue>5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="sVideoDuration">Video Duration</label>
            <select id="sVideoDuration"
                    name="sVideoDuration"
                    className="form-control"
                    onChange={this.onSelectChange.bind(this)}>
              <option value="any" defaultValue>Any</option>
              <option value="long">Long</option>
              <option value="medium">Medium</option>
              <option value="short">Short</option>
            </select>
          </div>
          <div className="form-group col-md-3">
            <label htmlFor="sVideoType">Video Type</label>
            <select id="sVideoType"
                    name="sVideoType"
                    className="form-control"
                    onChange={this.onSelectChange.bind(this)}>
              <option value="any" defaultValue>Any</option>
              <option value="episode">Episode</option>
              <option value="movie">movie</option>
            </select>
          </div>

          <div className="form-group col-md-12 detail-filter form-check">
              <label htmlFor="loopVideo" className="form-check-label">
              <input type="checkbox" name="loopVideo"
                    className="form-check-input"
                    value={this.state.loopVideo}
                    defaultChecked={this.state.loopVideo}
                    id="loopVideo"
                    onChange={this.handleCheckboxChange.bind(this)}
              />
              Repeat Video
              </label>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    filters: state.videos.filters,
    loopVideo: state.videos.loopVideo
  };
}

export default connect(mapStateToProps, { fetchVideo, fetchLoop })(SearchFilter);
