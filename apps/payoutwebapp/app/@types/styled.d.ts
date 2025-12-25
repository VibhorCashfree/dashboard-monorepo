import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    GLOBAL_SIDEBAR: StringObject;
    COLORS: StringObject;
    FONTS: StringObject;
    TEXT: Record<
      string,
      {
        fontSize: number;
        lineHeight: number;
        weight: number;
        letterSpacing?: number;
      }
    >;
    DEVICE: StringObject;
  }
}
