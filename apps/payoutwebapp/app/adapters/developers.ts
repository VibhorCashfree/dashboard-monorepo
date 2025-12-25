type Response = {
  userName: string;
};

const from = (response: Response[]) => response.map((user) => user.userName);

export default {
  from,
};
