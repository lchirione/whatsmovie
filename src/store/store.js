import { configureStore } from "@reduxjs/toolkit";
import { wmovies } from "./wmovies";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  reducer: {
    wmovie: wmovies.reducer,
  },
});
