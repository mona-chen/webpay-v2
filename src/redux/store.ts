import { AnyAction, configureStore } from "@reduxjs/toolkit";
import thunk from "../../node_modules/redux-thunk/es/index";
import { payment } from "./payment";
import thunkMiddleware from "redux-thunk";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "../../node_modules/redux-thunk/es/types.d";

// create a makeStore function
const makeStore = () =>
  configureStore({
    reducer: {
      payment: payment.reducer,
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: [
            // 'payload.headers',
            // 'payload.config.transformRequest',
          ],
        },
      }).concat(thunk, thunkMiddleware),
  });

const store = makeStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
