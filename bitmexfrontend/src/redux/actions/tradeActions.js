import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = `Bearer ${""}`;

export const actionTypes = {
    START_TRADES: 'START_TRADES',
    DONE_TRADES: 'DONE_TRADES',
    ERROR_TRADES: 'ERROR_TRADES'
};


function loadAllTrades() {
    return dispatch => {
        dispatch(startTrades());

        return axios.get("http://168.63.17.245:5984/bitmex/_all_docs?startkey=\"trade_symbol_XBTUSD_timestamp_\"&endkey=\"trade_symbol_XBTUSD_timestamp_\uffff\"&include_docs=true", { headers: { "Authorization": `Basic ${"TOKEN"}` } })

            .then(response => response.data)
            .then(data => dispatch(doneTrades(data)))
            .catch(() => dispatch(errorTrades()));
    };
}

function loadTradesBetweenDate(startdate, enddate) {
    return dispatch => {
        dispatch(startTrades());

        // return axios.get("http://168.63.17.245:5984/bitmex/_all_docs?startkey=\"trade_symbol_XBTUSD_timestamp_" + startdate + "\"&endkey=\"trade_symbol_XBTUSD_timestamp_" + enddate + "\uffff\"&include_docs=true", { headers: { "Authorization": `Basic ${"TOKEN"}` } })
        return axios.get("http://168.63.17.245:8085/tradesBetweenDate?startdate=" + startdate + "&enddate=" + enddate)
            .then(response => response.data)
            .then(data => dispatch(doneTrades(data)))
            .catch(() => dispatch(errorTrades()));
    };
}

function startTrades() {
    return {
        type: actionTypes.START_TRADES,
    }
}

function doneTrades(data) {
    return {
        type: actionTypes.DONE_TRADES,
        payload: data
    }
}

function errorTrades() {
    return {
        type: actionTypes.ERROR_TRADES,
    };
}

export default {
    loadAllTrades,
    loadTradesBetweenDate,
    startTrades,
    doneTrades,
    errorTrades
}
