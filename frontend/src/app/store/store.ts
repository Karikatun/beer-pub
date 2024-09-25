import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userSlice from 'app/store/slices/user';
import beersSlice from 'app/store/slices/beers';
import beerStylesSlice from './slices/beerStyles';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({ user: userSlice, beers: beersSlice, beerStyles: beerStylesSlice });

const persistedReducer = persistReducer(persistConfig, rootReducer);

// При использовании Redux-Persist, необходимо специально игнорировать все типы действий, которые он отправляет
// https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
const ignoredActions = [FLUSH, PAUSE, PERSIST, PURGE, REGISTER];

export const setupStore = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: { ignoredActions } }).prepend()
});
export const persistor = persistStore(setupStore);

export type State = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
