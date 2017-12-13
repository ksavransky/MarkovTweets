import axios from 'axios';

export const TWITTER_AUTH_START = "TWITTER_AUTH_START";
export const twitterAuthStart = () => {
    return { type: TWITTER_AUTH_START }
}

export const TWITTER_AUTH_RESULTS = "TWITTER_AUTH_RESULTS";
export const twitterAuthResults = (data) => {
    return { type: TWITTER_AUTH_RESULTS, data }
}

export const TWITTER_AUTH_ERROR = "TWITTER_ERROR";
export const twitterAuthError = (data) => {
    return { type: TWITTER_AUTH_ERROR, data }
}

export const TWITTER_AUTH = "TWITTER_AUTH";
export const twitterAuth = () => {
    return dispatch => {
        dispatch(twitterAuthStart());
        axios.get(`/api/twitter-auth`)
            .then(res => dispatch(twitterAuthResults(JSON.stringify(res.data))))
            .catch(err => dispatch(twitterAuthError(err)))

    }
}