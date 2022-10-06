import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import bookReducer from './book/bookSlice';
import statReducer from './stat/statSlice';
import memoReducer from './memo/memoSlice';
import imageReducer from './ui/imageSlice';
import storage from 'redux-persist/lib/storage/session';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import themeReducer from './themeSlice';

const rootReducers = combineReducers({
  user: userReducer,
  book: bookReducer,
  stat: statReducer,
  memo: memoReducer,
  theme: themeReducer,
  memobg: imageReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type RootState = ReturnType<typeof rootReducers>;
export type AppDispatch = typeof store.dispatch;
