export const initialState = {
  selected2FA: undefined,
};

export const reducers = (
  _: any,
  action:
    | {
        type: 'RESET';
      }
    | {
        type: 'SET_DATA';
        payload: string;
      },
) => {
  switch (action.type) {
    case 'RESET':
      return initialState;

    case 'SET_DATA':
      return {
        selected2FA: action.payload,
      };
  }
};
