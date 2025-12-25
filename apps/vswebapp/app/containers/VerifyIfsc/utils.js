export const getSupportedModes = data => {
  const modes = [];
  if (data.neft === 'Live') {
    modes.push('NEFT');
  }
  if (data.imps === 'Live') {
    modes.push('IMPS');
  }
  if (data.rtgs === 'Live') {
    modes.push('RTGS');
  }
  if (data.upi === 'Live') {
    modes.push('UPI');
  }
  if (data.ft === 'Live') {
    modes.push('FT');
  }
  if (data.card === 'Live') {
    modes.push('CARD');
  }

  return modes.length ? modes.join(', ') : '–';
};
