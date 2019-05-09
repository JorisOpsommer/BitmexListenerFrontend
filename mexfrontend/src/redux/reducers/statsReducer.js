import { actionTypes } from "../actions/statsActions";



const initialState = {
    stats: [],
    isloading: true,
};

function statsReducer(state = initialState, action) {

    switch (action.type) {
        case actionTypes.START_STATS:
            return Object.assign({}, state, {
                stats: state.stats.concat(action.payload),
                isloading: true
            });
        case actionTypes.DONE_STATS:
            return Object.assign({}, state, {
                isloading: false,
                stats: action.payload
            });

        case actionTypes.ERROR_STATS:
            return Object.assign({}, state, {
                isloading: false
            });

        default:
            return state
    }
}


export default statsReducer;
