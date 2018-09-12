import axios from "axios";

const API_KEY = "AIzaSyDMOpHxUPtPGKb3lWs4613QuIBZbUpJT7k";
const ROOT_URL = "https://www.googleapis.com/youtube/v3/search";

export const FETCH_VIDEO = "FETCH_VIDEO";
export const ACTIVE_VIDEO = "ACTIVE_VIDEO";
export const FETCH_FILTERS = "FETCH_FILTERS";
export const FETCH_LOOP = "FETCH_LOOP";

// this action creator fetches all videos from the youtube api with the
// search term
export function fetchVideo(param) {
  //console.log(param);
  // TODO: make params as filter param checkboxes to be enabled/disabled
  // https://developers.google.com/youtube/v3/docs/search/list#parameters
  const params = {
    part: 'snippet',
    key: API_KEY,
    q: param.term,
    maxResults: param.sMaxResults,
    order: param.sOrder, // relevance,date,rating,title,videoCount,viewCount
    type: "video", // video,channel,playlist
    videoDuration: param.sVideoDuration, // any,long,medium,short
    videoType: param.sVideoType // any,episode,movie
  };
  const request = axios.get(ROOT_URL, { params: params });

  return {
    type: FETCH_VIDEO,
    payload: request
  };
}

// this action creator returns one active video
export function activeVideo(video) {
  return {
    type: ACTIVE_VIDEO,
    payload: video
  };
}

// this action creator returns all filter params
export function fetchFilters(params) {
  return {
    type: FETCH_FILTERS,
    payload: params
  };
}

export function fetchLoop(loop) {
  return {
    type: FETCH_LOOP,
    payload: loop
  };
}
