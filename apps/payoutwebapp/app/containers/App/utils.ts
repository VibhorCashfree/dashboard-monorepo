export const getGlobalTab = (pathname: string) => {
  const firstSplit = pathname.split('/')[1];

  return ['settings', 'developers'].includes(firstSplit)
    ? firstSplit
    : 'payout';
};

export const getProductItems = (merchantDetails: {
  cfProductStatus: { BAAS: string };
}) => {
  const hiddenItems = [];

  if (merchantDetails.cfProductStatus.BAAS !== 'APPROVED') {
    hiddenItems.push({
      key: 'baas',
      visible: false,
    });
  }

  return hiddenItems;
};
