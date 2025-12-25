export const initialState = {
  selected2FA: null,
};

export const reducers = (_, action) => {
  if (action.type === 'RESET') {
    return { ...initialState };
  }

  switch (action.type) {
    case 'SET_DATA':
      return {
        selected2FA: action.payload,
      };

    default:
  }
};
