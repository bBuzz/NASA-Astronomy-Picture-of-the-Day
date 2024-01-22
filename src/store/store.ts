import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { nasaApi } from "../services/nasa";

const rootReducer = combineReducers({
  [nasaApi.reducerPath]: nasaApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(nasaApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
