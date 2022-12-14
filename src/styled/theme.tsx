export type Theme = {
  color: {
    primary: string;
    secondary: string;
    light: string;
    dark: string;
    disabled: string;
    markerBg: {
      home: string;
      heart: string;
      shopping: string;
      food: string;
      amusement: string;
      culture: string;
    };
    backgroundColor: {
      light: string;
      dark: string;
    };
    tabs: {
      light: string;
      dark: string;
    };
  };
};

const theme: Theme = {
  color: {
    primary: 'deepskyblue',
    secondary: '#c0bebe',
    disabled: '#eeeeee',
    light: '#000',
    dark: '#fff',
    markerBg: {
      home: '#a71be7',
      heart: '#d62323',
      shopping: '#e2bc12',
      food: '#ec7729',
      amusement: '#66dd17',
      culture: '#1798ee',
    },
    backgroundColor: {
      light: '#2e3d4b',
      dark: '#e9e9e9',
    },
    tabs: {
      light: '#fff',
      dark: '#415362',
    },
  },
};

export default theme;
