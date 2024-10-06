import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'app/network/api';
import { Beer } from './beers';

export interface InterfaceBeerStateData {
  beers: Beer[];
  currentPgae: string;
  totalPages: string;
}

export interface InterfaceBeerState {
  loading: boolean;
  styles: string[]
}

export const fetchBeerStyles = createAsyncThunk(
  'beerStyles',
  async () => {
    const response = await api.getBeerStyles();
    return response.data;
  }
);

const initialState = { styles: [], loading: false } as InterfaceBeerState;

export const beerStylesSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBeerStyles.fulfilled, (state, action) => {
      console.log(action.payload);
      state.styles = action.payload.styles;
    });
  }
});

export const { } = beerStylesSlice.actions;

export default beerStylesSlice.reducer;
