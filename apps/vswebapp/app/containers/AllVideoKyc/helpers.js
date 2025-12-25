export const formatChannels = channels => {
  if (channels.length === 0) return '';
  if (channels.length === 1) return channels[0];
  if (channels.length === 2) return `${channels[0]} & ${channels[1]}`;

  const last = channels.pop();
  return `${channels.join(', ')} & ${last}`;
};
