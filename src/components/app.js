import React, { Component } from 'react';
import AppDescription from "./app_description";
import SearchBar from "../containers/search_bar";
import VideoDetail from "./video_detail";
import VideoList from "../containers/video_list";
import SearchFilter from "../containers/search_filter";

export default class App extends Component {
  render() {
    return (
      <div>
        <AppDescription />
        <SearchBar />
        <SearchFilter />
        <VideoDetail />
        <VideoList />
      </div>
    );
  }
}
