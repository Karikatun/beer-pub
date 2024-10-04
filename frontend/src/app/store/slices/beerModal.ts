import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from 'app/network/api';

import { Beer } from './beers';

export interface InterfaceBeerState {
  loading: boolean;
  id?: number;
  item?: Beer;
}

export const fetchBeerItem = createAsyncThunk(
  'beerModal/fetchBeerItem',
  async (id: number) => {
    const response = await api.getBeerItem(id);
    return response.data;
  }
);

const initialState = { loading: false } as InterfaceBeerState;

export const beerModalSlice = createSlice({
  name: 'beerModal',
  initialState,
  reducers: {
    setBeerIdModal: (state, { payload }: { payload: any }) => ({
      ...state,
      id: payload
    }),
    removeBeerIdModal: () => (initialState),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBeerItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBeerItem.fulfilled, (state, action) => {
      state.item = action.payload.item;
      state.loading = false;
    });
  }
});

export const { setBeerIdModal, removeBeerIdModal } = beerModalSlice.actions;

export default beerModalSlice.reducer;
