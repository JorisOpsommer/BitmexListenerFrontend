import { actionTypes } from "../actions/tradeActions";



const initialState = {
    trades: [],
    isloading: true,
};

function tradeReducer(state = initialState, action) {

    switch (action.type) {
        case actionTypes.START_TRADES:
            return Object.assign({}, state, {
                trades: action.payload,
                isloading: true
            });
        case actionTypes.DONE_TRADES:
            return Object.assign({}, state, {
                isloading: false,
                trades: action.payload
            });

        case actionTypes.ERROR_TRADES:
            return Object.assign({}, state, {
                isloading: false
            });

        default:
            return state
    }
}

export default tradeReducer;
