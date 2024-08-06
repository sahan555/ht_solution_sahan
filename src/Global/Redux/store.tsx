import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import memoryReducer from "./memorySlice";
import { ThunkAction } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    memory: memoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
