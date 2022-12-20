import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface quotesObject {
  EUR: number;
  USD: number;
  BRL: number;
  GBP: number;
}

export interface ConfigState {
  EUR: quotesObject;
  USD: quotesObject;
  BRL: quotesObject;
  GBP: quotesObject;
}

const initialState: ConfigState = {
  EUR: {
    EUR: 1,
    USD: 1,
    BRL: 1,
    GBP: 1,
  },
  USD: {
    EUR: 1,
    USD: 1,
    BRL: 1,
    GBP: 1,
  },
  BRL: {
    EUR: 1,
    USD: 1,
    BRL: 1,
    GBP: 1,
  },
  GBP: {
    EUR: 1,
    USD: 1,
    BRL: 1,
    GBP: 1,
  },
};

export type updateQuoteType = {
  type: string;
  payload: quotesObject;
};

const conversionSlice = createSlice({
  name: 'conversion',
  initialState,
  reducers: {
    updateQuotes: (state, action: PayloadAction<any>) => {
      switch (action.type) {
        case 'EUR':
          state.EUR = action.payload;
          break;
        case 'USD':
          state.USD = action.payload;
          break;
        case 'BRL':
          state.BRL = action.payload;
          break;
        case 'GBP':
          state.GBP = action.payload;
          break;
        default:
          return;
      }
    },
  },
});

export const {updateQuotes} = conversionSlice.actions;

export default conversionSlice.reducer;
