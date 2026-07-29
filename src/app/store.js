import { configureStore } from "@reduxjs/toolkit";
import donorReducer from "../features/donors/donorSlice";
import authReducer from "../features/auth/authSlice";
import requestReducer from "../features/requests/requestSlice";

export const store = configureStore({
  reducer: {
    donors: donorReducer,
    auth: authReducer,
    requests: requestReducer,
  },
});