import {gql} from '@apollo/client';

export interface QuotesQuery {
  date: string;
  baseCurrency: string;
  quoteCurrency: string;
  quote: number;
}

export const GET_EURO = gql`
  query LatestEuro {
    latest(baseCurrency: "EUR", quoteCurrencies: ["EUR", "USD", "BRL", "GBP"]) {
      date
      baseCurrency
      quoteCurrency
      quote
    }
  }
`;

export const GET_DOLLAR = gql`
  query LatestDollar {
    latest(baseCurrency: "EUR", quoteCurrencies: ["EUR", "USD", "BRL", "GBP"]) {
      date
      baseCurrency
      quoteCurrency
      quote
    }
  }
`;

export const GET_REAL = gql`
  query LatestReal {
    latest(baseCurrency: "EUR", quoteCurrencies: ["EUR", "USD", "BRL", "GBP"]) {
      date
      baseCurrency
      quoteCurrency
      quote
    }
  }
`;

export const GET_GBP = gql`
  query LatestPound {
    latest(baseCurrency: "EUR", quoteCurrencies: ["EUR", "USD", "BRL", "GBP"]) {
      date
      baseCurrency
      quoteCurrency
      quote
    }
  }
`;
