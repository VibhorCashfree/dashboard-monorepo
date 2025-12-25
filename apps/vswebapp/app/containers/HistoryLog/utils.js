export const getTableHeadings = displayName => [
  { key: 'addedOn', displayName: 'Date & Time' },
  { key: 'value', displayName },
  { key: 'action', displayName: 'Action' },
  { key: 'userName', displayName: 'User' },
];

export const getFiltersConfig = users => ({
  User: {
    columns: 2,
    items: users,
  },
});

export const getLabelByStatus = users =>
  users.reduce(
    (labels, user) => ({
      ...labels,
      [user]: user,
    }),
    {},
  );

export const getFiltersLabel = users => {
  if (users.length) {
    return [getFiltersConfig(users), getLabelByStatus(users)];
  }

  return [];
};
