import {useQuery} from '@apollo/client';
import {useDispatch} from 'react-redux';
import {QuotesQuery} from '../graphql/queries/queryQuoteCurrencies';
import {quotesObject, updateQuotes} from '../redux/conversionSlice';

export const useGetQuotes = (query: any, currency: string) => {
  const dispatch = useDispatch();
  const {loading, data} = useQuery(query);

  if (!loading) {
    // console.log(data);
    const quotes: quotesObject = {
      USD: data?.latest.find(
        (response: QuotesQuery) => response.quoteCurrency === 'USD',
      ).quote,
      EUR: data?.latest.find(
        (response: QuotesQuery) => response.quoteCurrency === 'EUR',
      ).quote,
      BRL: data?.latest.find(
        (response: QuotesQuery) => response.quoteCurrency === 'BRL',
      ).quote,
      GBP: data?.latest.find(
        (response: QuotesQuery) => response.quoteCurrency === 'GBP',
      ).quote,
    };

    dispatch(updateQuotes({type: currency, payload: quotes}));
  }
};
