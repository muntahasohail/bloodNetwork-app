import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import donorService from './donorService';

// Register Donor Async Thunk
export const registerDonor = createAsyncThunk(
  'donors/register',
  async (donorData, thunkAPI) => {
    try {
      return await donorService.addDonor(donorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const deleteDonor = createAsyncThunk(
  'donors/delete',
  async (id, thunkAPI) => {
    try {
      await donorService.deleteDonor(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Delete failed');
    }
  }
);

export const fetchDonors = createAsyncThunk(
  'donors/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await donorService.getDonors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch donors');
    }
  }
);

const donorSlice = createSlice({
  name: 'donors',
  initialState: { donors: [], isLoading: false, isError: false, message: '' },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Register Donor
      .addCase(registerDonor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerDonor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.donors.push(action.payload);
        state.message = 'Donor registered successfully!';
      })
      .addCase(registerDonor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Fetch Donors
      .addCase(fetchDonors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDonors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.donors = action.payload;
      })
      .addCase(fetchDonors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteDonor.fulfilled, (state, action) => {
        state.donors = state.donors.filter((d) => d.id !== action.payload);
      });
  },
});

export const { reset } = donorSlice.actions;
export default donorSlice.reducer;
