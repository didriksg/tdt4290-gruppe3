import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureStore(preloadedState) {
    const middlewares = [thunkMiddleware, logger]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    return store
}