import axios from 'axios';

export const TWITTER_SEARCH_START = "TWITTER_SEARCH_START";
export const twitterSearchStart = (sinceId, maxId, cashTag, stockString) => {
    return { type: TWITTER_SEARCH_START, sinceId, maxId, cashTag, stockString }
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
export const twitterSearch = (sinceId, maxId, cashTag, stockString) => {
    return dispatch => {
        dispatch(twitterSearchStart());
        axios.get(`/api/twitter-search?sinceId=${sinceId}&maxId=${maxId}&cashTag=${cashTag}&stockString=${stockString}`)
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
