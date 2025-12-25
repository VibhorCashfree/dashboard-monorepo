import _union from 'lodash/union';

const getApprovalData = (approvals, rejections) => {
  const approvalsWithType = (approvals || []).map(approval => ({
    ...approval,
    type: 'success',
  }));

  const rejectionsWithType = (rejections || []).map(rejection => ({
    ...rejection,
    type: 'danger',
  }));

  return _union(approvalsWithType, rejectionsWithType);
};

export default getApprovalData;
