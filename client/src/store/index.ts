import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './feature/userSlice';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';

const rootReducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = useSelector;

export type RootState = ReturnType<typeof rootReducers>;
