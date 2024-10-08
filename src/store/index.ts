import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "@/services/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "@/services/product";
import { transactionAPI } from "@/services/transaction";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [transactionAPI.reducerPath]: transactionAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, productApi.middleware, transactionAPI.middleware]),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
