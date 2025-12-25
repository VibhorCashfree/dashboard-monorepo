export const percentageMatch = percent => {
  if (percent > 99) {
    return ['DIRECT_MATCH', 'success'];
  }

  if (percent > 85 && percent <= 99) {
    return ['GOOD_PARTIAL_MATCH', 'success'];
  }

  if (percent > 60 && percent <= 84) {
    return ['MODERATE_MATCH', 'info'];
  }

  if (percent > 34 && percent <= 59) {
    return ['POOR_MATCH', 'warning'];
  }

  return ['NO_MATCH', 'danger'];
};
