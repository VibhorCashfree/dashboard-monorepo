export type DeveloperResponse = {
  userName: string;
};

export const from = (response: DeveloperResponse[]) =>
  response.map((user) => user.userName);

export default {
  from,
};
