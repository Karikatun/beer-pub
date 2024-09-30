import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from 'app/network/api';

export interface Beer {
  name: string;
  style: string;
  brewery: string;
  fullBeerName: string;
  description: string;
  abv: string;
  minIBU: string;
  maxIBU: string;
  Astringency: string;
  Body: string;
  Alcohol: string;
  Bitter: string;
  Sweet: string;
  Sour: string;
  Salty: string;
  Fruits: string;
  Hoppy: string;
  Spices: string;
  Malty: string;
  review_aroma: string;
  review_appearance: string;
  review_palate: string;
  review_taste: string;
  review_overall: string;
  number_of_reviews: string;
}

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
