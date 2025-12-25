import _union from 'lodash/union';

const getApprovalData = (
  approvals: Omit<ApprovalRejectionItem, 'type'>[],
  rejections: Omit<ApprovalRejectionItem, 'type'>[],
) => {
  const approvalsWithType = (approvals || []).map((approval) => ({
    ...approval,
    type: 'success',
  }));

  const rejectionsWithType = (rejections || []).map((rejection) => ({
    ...rejection,
    type: 'danger',
  }));

  return _union(
    approvalsWithType,
    rejectionsWithType,
  ) as ApprovalRejectionItem[];
};

export default getApprovalData;
