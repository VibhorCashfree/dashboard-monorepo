export const getMatchedStatusData = (
  status: string,
  data: Array<{ status: string; total_amount: number; total_count: number }>,
): { amount: number; count: number } => {
  const statusData = data.find((item) => item.status === status);

  return {
    amount: statusData?.total_amount || 0,
    count: statusData?.total_count || 0,
  };
};
