import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import StatsReducer from './reducers/statsReducer'
import TradeReducer from './reducers/tradeReducer'

const composeEnhancer = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    statsReducer: StatsReducer,
    tradeReducer: TradeReducer
})

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
);





export default store;