export type Theme = {
  color: {
    primary: string;
    secondary: string;
    markerBg: {
      heart: string;
      shopping: string;
      food: string;
      amusement: string;
      culture: string;
    };
  };
};

const theme: Theme = {
  color: {
    primary: 'deepskyblue',
    secondary: '#c3c3c3',
    markerBg: {
      heart: '#d62323',
      shopping: '#e2bc12',
      food: '#ec7729',
      amusement: '#66dd17',
      culture: '#1798ee',
    },
  },
};

export default theme;
