import { getOutgoers, getIncomers } from '@cashfree-intl/workflow';
import _find from 'lodash/find';

export const getNextNodeId = nodes => {
  if (!nodes.length) return 1;
  const nodeIds = nodes.map(node => parseInt(node.id, 10));
  return Math.max(...nodeIds) + 1;
};

export const findCommonOutgoer = (nodes, edges, startNodeId) => {
  let initialOutgoers = getOutgoers(
    nodes.find(node => node.id === startNodeId),
    nodes,
    edges,
  );

  if (initialOutgoers.length < 2) {
    return initialOutgoers[0].id;
  }

  let branchesOutgoers = initialOutgoers.map(outgoer => new Set([outgoer.id]));

  while (true) {
    let nextOutgoers = branchesOutgoers.map(branchSet => {
      let lastNodeId = [...branchSet].pop();
      return getOutgoers(
        nodes.find(node => node.id === lastNodeId),
        nodes,
        edges,
      );
    });

    nextOutgoers.forEach((outgoers, index) => {
      if (outgoers.length > 0) {
        outgoers.forEach(node => branchesOutgoers[index].add(node.id));
      }
    });

    let commonOutgoers = branchesOutgoers.reduce((common, branchSet) => {
      return new Set([...common].filter(id => branchSet.has(id)));
    });

    if (commonOutgoers.size > 0) {
      return [...commonOutgoers][0];
    }

    if (nextOutgoers.every(outgoers => outgoers.length === 0)) {
      return 'end';
    }
  }
};

export const getAllConnectedNodes = (selectedScreen, nodes, edges) => {
  const findConnectedNodes = (selectedScreen, visited = []) => {
    if (_find(visited, { id: selectedScreen.id }, [])?.length) return;
    visited.push(selectedScreen);

    const outgoers = getOutgoers(selectedScreen, nodes, edges);
    outgoers
      .filter(node => !(getIncomers(node, nodes, edges).length > 1))
      .forEach(node => findConnectedNodes(node, visited));

    return visited;
  };
  let connectedNodes = findConnectedNodes(selectedScreen);

  return connectedNodes.filter(node => node.id !== 'end');
};

export const removeEdgesBasedOnConnectedNodes = (connectedOutgoers, edges) => {
  const connectedNodeIds = connectedOutgoers.map(node => node.id);

  return edges.filter(
    edge =>
      !(
        connectedNodeIds.includes(edge.source) ||
        connectedNodeIds.includes(edge.target)
      ),
  );
};

export const endCollationIncomers = incomers => {
  const children = incomers
    .filter(node => node.data.parent)
    .map(node => node.id);

  return [
    incomers.filter(node => !children.includes(node.id)).map(node => node.id),
    children,
  ];
};

export const sortAndRenumberNodes = (nodes, edges) => {
  const filteredNodes = nodes.filter(node =>
    ['start', 'end'].includes(node.id),
  );
  const filteredEdges = edges.filter(
    edge =>
      ['start', 'end'].includes(edge.source) ||
      ['start', 'end'].includes(edge.target),
  );
  // Sort nodes by their current ID
  filteredNodes.sort((a, b) => parseInt(a.id) - parseInt(b.id));

  // Create a mapping from old IDs to new IDs
  const idMapping = {};
  filteredNodes.forEach((node, index) => {
    const newId = (index + 1).toString();
    idMapping[node.id] = newId;
    node.id = newId;
  });

  // Update edges with new node IDs
  filteredEdges.forEach(edge => {
    edge.source = idMapping[edge.source];
    edge.target = idMapping[edge.target];
  });

  return { nodes, edges };
};

export const validatePublish = pages => {
  if (pages.length === 1) return true;

  const emptyBlock = pages.some(page => !page.blocks.length);

  return emptyBlock;
};
