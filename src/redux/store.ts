import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import menuReducer from './menuReducer'


export const store = configureStore({
  reducer: {
    app: appReducer,
    menu: menuReducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


