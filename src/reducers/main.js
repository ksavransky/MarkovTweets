import { TWITTER_AUTH_RESULTS,  TWITTER_AUTH_ERROR } from '../actions';

const initialState = {
    results: ''
}

const main = (state = initialState, action) => {
    switch (action.type) {
        case TWITTER_AUTH_RESULTS:
            return { ...state, results: "Twitter Auth Succeeded!  " + action.data }
        case TWITTER_AUTH_ERROR:
            return { ...state, results: "Twitter Auth Failed!  " + action.data }
        default:
            return state
    }
}

export default main;