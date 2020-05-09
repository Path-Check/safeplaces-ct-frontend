import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from 'ducks';
import watcherSaga from 'sagas';
import axiosInterceptors from './axiosInterceptors';
import { createBlacklistFilter } from 'redux-persist-transform-filter';
const saveSubsetBlacklistFilter = createBlacklistFilter('auth', [
  'error',
  'errorResponse',
]);

const persistConfig = {
  key: 'root',
  storage,
  timeout: 500,
  transforms: [saveSubsetBlacklistFilter],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const storeEntry = createStore(persistedReducer, enhancer);

axiosInterceptors.setupInterceptors(storeEntry);
sagaMiddleware.run(watcherSaga);

export const store = storeEntry;
export const persistor = persistStore(storeEntry);
