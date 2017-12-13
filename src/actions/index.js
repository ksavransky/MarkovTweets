import axios from 'axios';

export const TWITTER_AUTH_START = "TWITTER_AUTH_START";
export const twitterAuthStart = (userName) => {
    return { type: TWITTER_AUTH_START, userName }
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
export const twitterAuth = (userName) => {
    return dispatch => {
        dispatch(twitterAuthStart(userName));
        axios.get(`/api/twitter-auth?userName=${userName}`)
            .then(res => dispatch(twitterAuthResults(JSON.stringify(res.data))))
            .catch(err => dispatch(twitterAuthError(err)))

    }
}