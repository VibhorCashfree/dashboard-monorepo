export const getCode = (ifsc: string) => {
  if (!ifsc) {
    return '';
  }

  return ifsc.toUpperCase().substr(0, 4);
};

export default {
  getCode,
};
