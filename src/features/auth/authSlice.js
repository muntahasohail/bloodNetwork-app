import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try { return await authService.register(data); }
  catch (e) { return thunkAPI.rejectWithValue(e.message); }
});

export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try { return await authService.login(data); }
  catch (e) { return thunkAPI.rejectWithValue(e.message); }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, role: null, isLoading: false, authLoading: true, isError: false, message: '' },
  reducers: {
    reset: (state) => { state.isLoading = false; state.isError = false; state.message = ''; },
    setAuthLoading: (state, action) => { state.authLoading = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => { s.isLoading = true; })
      .addCase(registerUser.fulfilled, (s, a) => { s.isLoading = false; s.user = a.payload; s.role = a.payload.role; })
      .addCase(registerUser.rejected, (s, a) => { s.isLoading = false; s.isError = true; s.message = a.payload; })
      .addCase(loginUser.pending, (s) => { s.isLoading = true; })
      .addCase(loginUser.fulfilled, (s, a) => { s.isLoading = false; s.user = a.payload; s.role = a.payload.role; })
      .addCase(loginUser.rejected, (s, a) => { s.isLoading = false; s.isError = true; s.message = a.payload; })
      .addCase(logoutUser.fulfilled, (s) => { s.user = null; s.role = null; });
  },
});

export const { reset, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
