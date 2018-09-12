import { FETCH_VIDEO, ACTIVE_VIDEO, FETCH_FILTERS, FETCH_LOOP } from "../actions/index";

// set initial redux state with different key/values
const INITIAL_STATE = {
  videos: {},
  activeVideo: null,
  loopVideo: 1,
  filters: {
    term: "react js",
    sMaxResults: 5,
    sOrder: "relevance", // relevance,date,rating,title,videoCount,viewCount
    sVideoDuration: "any", // any,long,medium,short
    sVideoType: "any" // any,episode,movie  }
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_VIDEO:
      // make a new object, takes the current state as it is
      // and add/replace the videos key with the payload data
      return { ...state, videos: action.payload.data.items };
    case ACTIVE_VIDEO:
      // make a new object, takes the current state as it is
      // and add/replace the activeVideo key with the payload data
      return { ...state, activeVideo: action.payload };
    case FETCH_FILTERS:
      // make a new object, takes the current state as it is
      // and add/replace the filters key with the payload data
      return { ...state, filters: action.payload };
    case FETCH_LOOP:
      return { ...state, loopVideo: action.payload };
    default:
      return state;
  }
  return state;
}
