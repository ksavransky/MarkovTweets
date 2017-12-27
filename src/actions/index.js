import axios from 'axios';

export const TWITTER_SEARCH_START = "TWITTER_SEARCH_START";
export const twitterSearchStart = (userName) => {
    return { type: TWITTER_SEARCH_START, userName }
}

export const TWITTER_SEARCH_RESULTS = "TWITTER_SEARCH_RESULTS";
export const twitterSearchResults = (data) => {
    return { type: TWITTER_SEARCH_RESULTS, data }
}

export const TWITTER_SEARCH_ERROR = "TWITTER_SEARCH_ERROR";
export const twitterSearchError = (data) => {
    return { type: TWITTER_SEARCH_ERROR, data }
}

export const TWITTER_SEARCH = "TWITTER_SEARCH";
export const twitterSearch = (userName) => {
    return dispatch => {
        dispatch(twitterSearchStart(userName));
        axios.get(`/api/twitter-search?userName=${userName}`)
            .then(res => dispatch(twitterSearchResults(JSON.stringify(res.data))))
            .catch(err => dispatch(twitterSearchError(err)))

    }
}


export const TWITTER_TIMELINE_START = "TWITTER_TIMELINE_START";
export const twitterTimelineStart = (userName, maxId) => {
    return { type: TWITTER_TIMELINE_START, userName, maxId }
}

export const TWITTER_TIMELINE_RESULTS = "TWITTER_TIMELINE_RESULTS";
export const twitterTimelineResults = (data) => {
    return { type: TWITTER_TIMELINE_RESULTS, data }
}

export const TWITTER_TIMELINE_ERROR = "TWITTER_TIMELINE_ERROR";
export const twitterTimelineError = (data) => {
    return { type: TWITTER_TIMELINE_ERROR, data }
}

export const TWITTER_TIMELINE = "TWITTER_TIMELINE";
export const twitterTimeline = (userName, maxId) => {
    return dispatch => {
        dispatch(twitterTimelineStart(userName, maxId));
        axios.get(`/api/twitter-timeline?userName=${userName}&maxId=${maxId}`)
            .then(res => dispatch(twitterTimelineResults(JSON.stringify(res.data))))
            .catch(err => dispatch(twitterTimelineError(err)))
    }
}
