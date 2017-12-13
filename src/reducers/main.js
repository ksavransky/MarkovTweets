import { TWITTER_AUTH_RESULTS,  TWITTER_AUTH_ERROR } from '../actions';

const initialState = {
    results: ''
}

const main = (state = initialState, action) => {
    switch (action.type) {
        case TWITTER_AUTH_RESULTS:
            return { ...state, results: action.data }
        case TWITTER_AUTH_ERROR:
            return { ...state, results: "The User Does Not Exist. Please Search Again." }
        default:
            return state
    }
}

export default main;