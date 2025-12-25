import { getOutgoers, getIncomers } from '@cashfree-intl/workflow';

export const showDelete = (id, data, nodes, edges) => {
  const hasParent = !!data.parent;
  const hasEnd = getOutgoers({ id: id }, nodes, edges).some(
    node => node.id === 'end',
  );

  if (hasEnd) {
    // if Outgoer is end then dont show delete
    return !(hasParent && hasEnd);
  } else if (hasParent) {
    // if Outgoer is not end then check for multiple siblings and if its just one show delete else dont
    const outgoers = getOutgoers({ id: id }, nodes, edges);

    if (outgoers.length > 1) {
      return true;
    } else if (outgoers.length) {
      const outgoersSibling = outgoers.reduce((acc, prev) => {
        return [...acc, ...getIncomers(prev, nodes, edges)];
      }, []);

      const hasMoreSiblings = outgoersSibling.filter(node => node.id !== id)
        .length;

      if (hasMoreSiblings) {
        if (hasMoreSiblings > 1) {
          return true;
        }
        return false;
      }

      return true;
    } else {
      return true;
    }
  } else {
    return true;
  }
};
