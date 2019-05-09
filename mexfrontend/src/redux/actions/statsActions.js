import axios from 'axios'

export const actionTypes = {
    START_STATS: 'START_STATS',
    DONE_STATS: 'DONE_STATS',
    ERROR_STATS: 'ERROR_STATS'
};


function loadAllStats() {
    return dispatch => {
        dispatch(startStats());
        return axios.get("http://admin:beheerdj@168.63.17.245:5984/bitmex/_all_docs?startkey=\x22stats_symbol_XBT_timestamp_\x22&endkey=\x22stats_symbol_XBT_timestamp_\uffff\x22&include_docs=true")

            .then(response => response.data)
            .then(data => dispatch(doneStats(data)))
            .catch(() => dispatch(errorStats()));
    };
}

function loadStatsBetweenDate(startdate, enddate) {
    return dispatch => {
        dispatch(startStats());
        return axios.get("http://admin:beheerdj@168.63.17.245:5984/bitmex/_all_docs?startkey=\x22stats_symbol_XBT_timestamp_" + startdate + "&endkey=\x22stats_symbol_XBT_timestamp_" + enddate + "\uffff\x22&include_docs=true")
            .then(response => response.data)
            .then(data => dispatch(doneStats(data)))
            .catch(() => dispatch(errorStats()));
    };
}

function startStats() {
    return {
        type: actionTypes.START_STATS,
    }
}

function doneStats(data) {
    return {
        type: actionTypes.DONE_STATS,
        payload: data
    }
}

function errorStats() {
    return {
        type: actionTypes.ERROR_STATS,
    };
}

export default {
    loadAllStats,
    loadStatsBetweenDate,
    startStats,
    doneStats,
    errorStats
}
