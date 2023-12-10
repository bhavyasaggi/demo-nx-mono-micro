import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './sliceUser';

const reducer = combineReducers({ user: userReducer });

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer,
    preloadedState,
  });

// Export types
export type RootState = ReturnType<typeof reducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
