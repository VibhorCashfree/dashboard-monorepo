const from = response => {
  const valid = response.freeCreditsRedeemed;

  return {
    valid,
    ...response,
  };
};

export default {
  from,
};
