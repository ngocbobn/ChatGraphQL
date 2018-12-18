import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
//import rootSaga from './sagas';
// import reducers from './reducers'

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [thunk, sagaMiddleware, routeMiddleware];

const store = createStore(
    combineReducers({
        // ...reducers,
        router: routerReducer
    }),
    composeWithDevTools(applyMiddleware(...middlewares))
);
//sagaMiddleware.run(rootSaga);
export { store, history };