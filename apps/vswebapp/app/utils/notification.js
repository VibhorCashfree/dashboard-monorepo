const get = () => JSON.parse(localStorage.getItem('NOTIFICATION')) || [];

const set = types => {
  localStorage.setItem('NOTIFICATION', JSON.stringify(types));
};

export default {
  get,
  set,
};
