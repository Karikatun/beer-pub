import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'app/network/api';

export interface Beer {
  name: string;
  style: string;
  brewery: string;
  fullBeerName: string;
  description: string;
  abv: number;
  minIBU: number;
  maxIBU: number;
  astringency: number;
  body: number;
  alcohol: number;
  bitter: number;
  sweet: number;
  sour: number;
  salty: number;
  fruits: number;
  hoppy: number;
  spices: number;
  malty: number;
  review_aroma: number;
  review_appearance: number;
  review_palate: number;
  review_taste: number;
  review_overall: number;
  number_of_reviews: number;
  id: number;
}

export interface InterfaceBeerStateData {
  beers: Beer[];
  currentPgae: string;
  totalPages: string;
}

export interface InterfaceBeerState {
  loading: boolean;
  beers: Beer[];
  currentPage: number;
  totalPages: number;
}

export const fetchBeers = createAsyncThunk(
  'beers',
  async ({ currentPage, sortBy, style }: {currentPage: number, sortBy?: string, style?: string }) => {
    const response = await api.getBeers(currentPage, sortBy, style);
    return response.data;
  }
);

const initialState = {
  beers: [], currentPage: 1, totalPages: 1, loading: false
} as InterfaceBeerState;

export const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => ({
      ...state,
      currentPage: payload
    })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBeers.fulfilled, (state, action) => {
      state.beers = action.payload.beers;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    });
  }
});

export const { setCurrentPage } = beersSlice.actions;

export default beersSlice.reducer;
