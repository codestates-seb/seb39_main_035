import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bg: string;
      font: string;
      icons: string;
      boxShadow: string;
      border: string;
    };
  }
}
