import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import requestService from './requestService';

export const fetchRequests = createAsyncThunk('requests/fetchAll', async (_, thunkAPI) => {
  try { return await requestService.getRequests(); }
  catch (err) { return thunkAPI.rejectWithValue(err.message || 'Failed to fetch requests'); }
});

export const fetchMyRequests = createAsyncThunk('requests/fetchMine', async (uid, thunkAPI) => {
  try { return await requestService.getMyRequests(uid); }
  catch (err) { return thunkAPI.rejectWithValue(err.message || 'Failed to fetch your requests'); }
});

export const addRequest = createAsyncThunk('requests/add', async (data, thunkAPI) => {
  try { return await requestService.addRequest(data); }
  catch (err) { return thunkAPI.rejectWithValue(err.message || 'Failed to post request'); }
});

export const updateRequest = createAsyncThunk('requests/update', async ({ id, data }, thunkAPI) => {
  try {
    await requestService.updateRequest(id, data);
    return { id, data };
  } catch (err) { return thunkAPI.rejectWithValue(err.message || 'Failed to update request'); }
});

export const fulfillRequest = createAsyncThunk('requests/fulfill', async (id, thunkAPI) => {
  try {
    await requestService.updateRequest(id, { fulfilled: true });
    return id;
  } catch (err) { return thunkAPI.rejectWithValue(err.message || 'Failed to update request'); }
});

export const deleteRequest = createAsyncThunk('requests/delete', async (id, thunkAPI) => {
  try {
    await requestService.deleteRequest(id);
    return id;
  } catch (err) { return thunkAPI.rejectWithValue(err.message || 'Failed to delete request'); }
});

const requestSlice = createSlice({
  name: 'requests',
  initialState: { requests: [], myRequests: [], isLoading: false, isError: false, message: '' },
  reducers: {
    reset: (state) => { state.isLoading = false; state.isError = false; state.message = ''; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (s) => { s.isLoading = true; })
      .addCase(fetchRequests.fulfilled, (s, a) => { s.isLoading = false; s.requests = a.payload; })
      .addCase(fetchRequests.rejected, (s, a) => { s.isLoading = false; s.isError = true; s.message = a.payload; })

      .addCase(fetchMyRequests.pending, (s) => { s.isLoading = true; })
      .addCase(fetchMyRequests.fulfilled, (s, a) => { s.isLoading = false; s.myRequests = a.payload; })
      .addCase(fetchMyRequests.rejected, (s, a) => { s.isLoading = false; s.isError = true; s.message = a.payload; })

      .addCase(addRequest.fulfilled, (s, a) => { s.requests.unshift(a.payload); s.myRequests.unshift(a.payload); })

      .addCase(updateRequest.fulfilled, (s, a) => {
        [s.requests, s.myRequests].forEach((list) => {
          const idx = list.findIndex((r) => r.id === a.payload.id);
          if (idx !== -1) list[idx] = { ...list[idx], ...a.payload.data };
        });
      })

      .addCase(fulfillRequest.fulfilled, (s, a) => {
        [s.requests, s.myRequests].forEach((list) => {
          const idx = list.findIndex((r) => r.id === a.payload);
          if (idx !== -1) list[idx] = { ...list[idx], fulfilled: true };
        });
      })

      .addCase(deleteRequest.fulfilled, (s, a) => {
        s.requests = s.requests.filter((r) => r.id !== a.payload);
        s.myRequests = s.myRequests.filter((r) => r.id !== a.payload);
      });
  },
});

export const { reset } = requestSlice.actions;
export default requestSlice.reducer;
