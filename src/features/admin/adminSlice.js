import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: { stats: {}, isLoading: false, isError: false, message: '' },
  reducers: {
    reset: (state) => { state.isLoading = false; state.isError = false; state.message = ''; },
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
