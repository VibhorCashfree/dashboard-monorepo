export const getFiltersConfig = (users: string[]) => ({
  User: {
    columns: 2,
    items: users,
  },
});

export const getLabelByStatus = (users: string[]) =>
  users.reduce(
    (labels: StringObject, user: string) => ({
      ...labels,
      [user]: user,
    }),
    {},
  );
