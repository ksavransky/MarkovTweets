import { TWITTER_SEARCH_RESULTS,  TWITTER_SEARCH_ERROR, TWITTER_TIMELINE_RESULTS,  TWITTER_TIMELINE_ERROR} from '../actions';

const initialState = {
    searchResults: '',
    timelineResults: ''
}

const main = (state = initialState, action) => {
    switch (action.type) {
        case TWITTER_SEARCH_RESULTS:
            return { ...state, searchResults: action.data }
        case TWITTER_SEARCH_ERROR:
            return { ...state, searchResults: "Something went wrong. You are in TWITTER_SEARCH_ERROR." }
        case TWITTER_TIMELINE_RESULTS:
            return { ...state, timelineResults: action.data }
        case TWITTER_TIMELINE_ERROR:
            return { ...state, timelineResults: "Something went wrong. You are in TWITTER_TIMELINE_ERROR." }
        default:
            return state
    }
}

export default main;
