import { configureStore } from '@reduxjs/toolkit'
import appReducer from './app/appReducer'
import menuReducer from './menu/menuReducer'
import createSagaMiddleware from "redux-saga";
import menuSaga from './menu/menuSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(menuSaga);

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


