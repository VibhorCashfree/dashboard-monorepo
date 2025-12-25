import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from '@cashfree-intl/workflow';
import _get from 'lodash/get';
import _pick from 'lodash/pick';
import _find from 'lodash/find';
import _uniqBy from 'lodash/uniqBy';
import _last from 'lodash/last';
import _keys from 'lodash/keys';
import _set from 'lodash/set';
import _xor from 'lodash/xor';
import _isEqual from 'lodash/isEqual';
import _difference from 'lodash/difference';

// Constants
import { initialEdges, initialNodes } from './constants';
import {
  BLOCK_COLOR_MAPPING,
  ALL_FIELD_MAPPING,
} from './Steps/StepThree/constants';

// Helpers
import {
  getPositionX,
  getPositionY,
  getAllProducts,
  getAllConditions,
} from './Steps/StepThree/helpers';
import {
  getNextNodeId,
  findCommonOutgoer,
  getAllConnectedNodes,
  removeEdgesBasedOnConnectedNodes,
  endCollationIncomers,
} from './helpers';

const useStore = create((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  journeyMap: {},
  history: { stack: [], currentIndex: -1 },

  // initial Actions START //
  onConnect: connection => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  onNodesChange: changes => {
    const filteredChanges = changes.filter(change => change.type !== 'remove');
    set({
      nodes: applyNodeChanges(filteredChanges, get().nodes),
    });
  },
  onEdgesChange: changes => {
    const filteredChanges = changes.filter(change => change.type !== 'remove');
    set({
      edges: applyEdgeChanges(filteredChanges, get().edges),
    });
  },
  // initial Actions END //

  // GET Actions START //
  getNode: nodeId => get().nodes.find(node => node.id === nodeId),
  getNodes: () => get().nodes,
  getScreens: () =>
    get().nodes.filter(node => !['start', 'end'].includes(node.id)),
  selectedNode: () => get().nodes.find(node => node.selected),
  // GET Actions END //

  // SET Actions START //
  setNodes: nodes => {
    set({ nodes });
  },
  setEdges: edges => {
    set({ edges });
  },
  // SET Actions END //

  // REMOVE Actions START //
  removeNode: nodeId => {
    return get().nodes.filter(node => node.id !== nodeId);
  },
  removeEdge: (source, target) => {
    return get().edges.filter(
      edge => edge.source !== source || edge.target !== target,
    );
  },
  removeEdgeByIds: ids =>
    get().edges.reduce((acc, edge) => {
      if (ids.includes(edge.source) || ids.includes(edge.target)) {
        return acc;
      }

      return [...acc, edge];
    }, []),
  onRemoveProduct: (id, blockId, value) => {
    const {
      getNode,
      nodes,
      edges,
      onUpdateConditionals,
      onAddConditionals,
    } = get();
    let updatedNodes = nodes;
    let updatedEdges = edges;
    const nodeDetails = getNode(id);
    const commonOutgoerId = findCommonOutgoer(nodes, edges, id);
    const filteredBlock = nodeDetails?.data?.blocks[blockId];

    const conditionToRemove = Object.keys(filteredBlock.conditions).reduce(
      (acc, next) => {
        const allOperatorConditions = filteredBlock.conditions[next].filter(
          condition => !condition.output.includes(value),
        );

        if (!allOperatorConditions.length) {
          return [...acc, `${id}>${blockId}>${next}`];
        } else {
          return acc;
        }
      },
      [],
    );

    const removeElse = ['if', 'elseIf'].every(val =>
      conditionToRemove.includes(`${id}>${blockId}>${val}`),
    );

    if (removeElse) {
      conditionToRemove.push(`${id}>${blockId}>else`);
    }

    const nodesToBeRemoved = nodes
      .filter(node => conditionToRemove.includes(node?.data?.condition))
      .map(node => node.id);

    updatedNodes = updatedNodes
      .filter(node => !nodesToBeRemoved.includes(node.id))
      .map(node => {
        if (node.id === id) {
          const filteredBlock = node.data.blocks[blockId];

          const blockConditions = filteredBlock.conditions;

          conditionToRemove.forEach(condition => {
            const [, blockId, conditionObj] = condition.split('>');

            if (!(conditionObj === 'else')) {
              blockConditions[conditionObj] = [];
            }
          });

          filteredBlock.conditions = blockConditions;

          filteredBlock.products = filteredBlock.products.filter(
            product => product !== value,
          );
          filteredBlock.optionalName = _pick(
            filteredBlock.optionalName,
            Object.keys(filteredBlock.optionalName),
          );

          node.data.blocks[blockId] = filteredBlock;
        }

        return node;
      });

    updatedEdges = updatedEdges.filter(
      edge =>
        !(
          nodesToBeRemoved.includes(edge.source) ||
          nodesToBeRemoved.includes(edge.target)
        ),
    );

    if (removeElse) {
      updatedEdges.push({
        id: `${id.toString()}-${commonOutgoerId}`,
        source: id,
        target: commonOutgoerId.toString(),
        type: 'plus-edge',
      });
    }

    set({
      nodes: updatedNodes,
      edges: updatedEdges,
    });

    const isUpdating = get().nodes.some(
      node => _get(node.data, 'parent', '') === id,
    );

    if (isUpdating) {
      onUpdateConditionals(id);
    } else {
      onAddConditionals(id);
    }
  },
  onRemoveScreen: id => {
    const selectedScreen = get().getNode(id);
    const parentId = _get(selectedScreen, 'data.parent', '');
    const { nodes, edges } = get();
    const incomers = getIncomers(selectedScreen, nodes, edges);
    const hasParent =
      !!_get(selectedScreen, 'data.parent', '') &&
      !_get(selectedScreen, 'data.condition', '');

    if (hasParent) {
      const [outgoerNode] = getOutgoers(selectedScreen, nodes, edges);
      const filteredEdges = edges
        .filter(edge => edge.id !== `${id}-${outgoerNode.id}`)
        .map(edge => {
          if (edge.id === `${incomers[0].id}-${id}`) {
            const selectedEdge = {
              ...edge,
              id: `${incomers[0].id}-${outgoerNode.id}`,
              target: outgoerNode.id,
            };
            return selectedEdge;
          } else {
            return edge;
          }
        });
      const filteredNodes = nodes
        .filter(node => node.id !== id)
        .map(node =>
          node.id === outgoerNode.id
            ? { ...node, data: { ...node.data, parent: incomers[0].id } }
            : node,
        );

      set({
        nodes: filteredNodes,
        edges: filteredEdges,
      });
    } else {
      const connectedOutgoers = getAllConnectedNodes(
        selectedScreen,
        nodes,
        edges,
      );

      const connectedOutgoersIds = connectedOutgoers.map(node => node.id);

      const filteredEdges = removeEdgesBasedOnConnectedNodes(
        connectedOutgoers,
        edges,
      );

      const outgoerOfconnectedNodes = connectedOutgoers.reduce((acc, prev) => {
        const outgoersOfNode = getOutgoers(prev, nodes, edges).filter(
          node => !connectedOutgoersIds.includes(node.id),
        );

        return [...acc, ...outgoersOfNode];
      }, []);

      const addEdge = outgoerOfconnectedNodes.reduce((acc, outgoerNode) => {
        const incomingNodes = incomers.map(incomerNode => ({
          id: `${incomerNode.id}-${outgoerNode.id}`,
          source: incomerNode.id.toString(),
          target: outgoerNode.id.toString(),
          type: 'plus-edge',
        }));

        return [...acc, ...incomingNodes];
      }, []);

      const finalNodes = nodes.filter(
        node => !connectedOutgoersIds.includes(node.id),
      );
      const finalEdges = _uniqBy([...addEdge, ...filteredEdges], 'id');

      set({
        nodes: finalNodes,
        edges: finalEdges,
      });
    }

    // if (parentId && parentId === incomers.id) {
    //   const [conditionEdge] = edges.filter(
    //     edge => edge.id === `${incomers.id}-${selectedScreen.id}`,
    //   );
    //   const conditionStr = conditionEdge.data.condition;
    //   const [, blockId, condition] = conditionStr.split('>');

    //   filteredNodes = filteredNodes.map(node => {
    //     if (node.id === parentId) {
    //       return _set(
    //         node,
    //         `node.data.blocks[${blockId}].conditions[${condition}]`,
    //         [],
    //       );
    //     } else {
    //       return node;
    //     }
    //   });
    // }
  },
  // REMOVE Actions END //

  // ADD Actions START //
  onCollativeAddScreen: id => {
    const { nodes, edges, journeyMap } = get();
    const incomers = getIncomers(get().getNode(id), nodes, edges);
    const [parent, childrens] = endCollationIncomers(incomers);
    const { position } = get().getNode(id);
    let newJourneyMap = journeyMap;
    const nextNodeId = getNextNodeId(get().getScreens());

    const newNode = {
      id: nextNodeId.toString(),
      data: {
        blocks: [],
      },
      position: {
        x: position.x,
        y: position.y,
      },
      type: 'screen',
      style: { transition: 'transform 0.5s ease-out' },
      selected: true,
    };

    const filtereEdges = edges.map(edge => {
      const [sourceId, targetId] = edge.id.split('-');
      if (childrens.includes(sourceId)) {
        return {
          ...edge,
          id: `${sourceId}-${nextNodeId}`,
          target: nextNodeId.toString(),
        };
      }

      if (parent.length && parent.includes(sourceId) && targetId === id) {
        return {
          ...edge,
          id: `${sourceId}-${nextNodeId}`,
          target: nextNodeId.toString(),
        };
      }

      return edge;
    });

    const updatedNodes = get()
      .getNodes()
      .map(node => {
        if (node.position.y >= position.y) {
          const updatedNode = {
            ...node,
            position: { ...node.position, y: node.position.y + 300 },
          };

          return updatedNode;
        }

        return node;
      });

    // newJourneyMap = {
    //   ...newJourneyMap,
    //   [nextNodeId]: {
    //     source: childrens,
    //     target: [id],
    //   },
    //   [id]: {
    //     ...newJourneyMap[id],
    //     source: [nextNodeId.toString()],
    //   },
    // };

    // childrens.forEach(element => {
    //   newJourneyMap[element] = {
    //     ...newJourneyMap[element],
    //     target: [nextNodeId.toString()],
    //   };
    // });

    set({
      nodes: [...updatedNodes, newNode],
      edges: [
        ...filtereEdges,
        {
          id: `${nextNodeId.toString()}-${id}`,
          source: nextNodeId.toString(),
          target: id,
          type: 'plus-edge',
        },
      ],
      // journeyMap: newJourneyMap,
    });
  },

  onAddScreen: id => {
    const nodeLength = get().getNodes().length - 2;
    const [sourceId, targetId] = id.split('-');
    const { position, data = {} } = get().getNode(sourceId);
    const targetIncomers = getIncomers(
      { id: targetId },
      get().nodes,
      get().edges,
    ).map(node => node.id);

    const isEnd = targetId === 'end';
    const ifSourceHasParent = !!data?.parent;

    const nextNodeId = getNextNodeId(get().getScreens());

    const newNode = {
      id: nextNodeId.toString(),
      data: {
        blocks: [],
      },
      position: {
        x: position.x,
        y: position.y + 300,
      },
      type: 'screen',
      style: { transition: 'transform 0.5s ease-out' },
      selected: true,
    };

    if (ifSourceHasParent) {
      newNode.data.parent = data.parent;
    }

    const sourceEdge = {
      id: `${sourceId}-${nextNodeId}`,
      source: sourceId,
      target: nextNodeId.toString(),
      type: 'plus-edge',
    };

    const targetEdge = {
      id: `${nextNodeId}-${targetId}`,
      source: nextNodeId.toString(),
      target: targetId,
      type: 'plus-edge',
    };

    const updatedNodes = get()
      .getNodes()
      .map(node => {
        if (node.position.y > position.y) {
          const updatedNode = {
            ...node,
            position: { ...node.position, y: node.position.y + 300 },
          };

          return updatedNode;
        }

        return node;
      });

    set({
      nodes: [...updatedNodes, newNode],
      edges: [
        ...get().edges.filter(edge => edge.id !== id),
        sourceEdge,
        targetEdge,
      ],
      // journeyMap: {
      //   ...get().journeyMap,
      //   [nextNodeId]: {
      //     source: [sourceId],
      //     target: [targetId],
      //     parent: ifSourceHasParent ? data.parent : '',
      //   },
      //   [sourceId]: {
      //     ...get().journeyMap[sourceId],
      //     target: [nextNodeId.toString()],
      //   },
      //   [targetId]: {
      //     ...get().journeyMap[targetId],
      //     source: targetIncomers
      //       .filter(id => id !== sourceId)
      //       .concat(nextNodeId.toString()),
      //   },
      // },
    });
  },

  onAddProductByBlock: (id, value, blockId) => {
    let coordinates;

    const filteredNodes = get().nodes.map(node => {
      if (node.id === id) {
        const blocks = _get(node, 'data.blocks');

        if (blocks[blockId].products.includes(value)) {
          return node;
        }

        blocks[blockId].products.push(value);

        if (_get(ALL_FIELD_MAPPING[value], 'optionalNameMatch')) {
          blocks[blockId].optionalName[value] = true;
        }

        coordinates = node.position.y;
      }

      return node;
    });

    const updatedNodes = filteredNodes.map(node => {
      if (node.position.y > coordinates) {
        const updatedNode = {
          ...node,
          position: { ...node.position, y: node.position.y + 50 },
        };

        return updatedNode;
      }

      return node;
    });

    set({
      nodes: updatedNodes,
    });
  },

  onAddProduct: (id, value, operatorType) => {
    let coordinates;
    const filteredNodes = get().nodes.map(node => {
      if (node.id === id) {
        const blocks = _get(node, 'data.blocks');
        const blocksLength = blocks.length;

        if (getAllProducts(blocks).includes(value)) {
          return node;
        }

        if (blocks.length) {
          if (operatorType === 'AND') {
            const lastBlock = blocksLength - 1;
            node.data.blocks[lastBlock].products.push(value);

            if (_get(ALL_FIELD_MAPPING[value], 'optionalNameMatch')) {
              node.data.blocks[lastBlock].optionalName = {
                ...node.data.blocks[lastBlock].optionalName,
                [value]: true,
              };
            }
          } else {
            node.data.blocks.push({
              products: [value],
              conditions: {
                if: [],
                elseIf: [],
              },
              optionalName: _get(ALL_FIELD_MAPPING[value], 'optionalNameMatch')
                ? { [value]: true }
                : {},
            });
          }
        } else {
          node.data.blocks.push({
            products: [value],
            conditions: {
              if: [],
              elseIf: [],
            },
            optionalName: _get(ALL_FIELD_MAPPING[value], 'optionalNameMatch')
              ? { [value]: true }
              : {},
          });
        }
      }

      coordinates = node.position.y;

      return node;
    });

    const updatedNodes = filteredNodes.map(node => {
      if (node.position.y > coordinates) {
        const updatedNode = {
          ...node,
          position: { ...node.position, y: node.position.y + 50 },
        };

        return updatedNode;
      }

      return node;
    });

    set({
      nodes: updatedNodes,
    });
  },
  onUpdateConditionals: screenId => {
    const { nodes, edges, journeyMap } = get();
    let updatedEdges = edges;
    let updatedNodes = nodes;
    const fallBackEdges = edges.filter(
      edge => _get(edge, 'data.condition', '') === `${screenId}_fallback`,
    );
    let hasFallback = false;
    // let newJourneyMap = journeyMap;
    const nodeDetails = get().getNode(screenId);
    const { blocks } = nodeDetails.data;
    const outgoerNodes = getOutgoers(nodeDetails, nodes, edges);
    const outgoerIds = outgoerNodes.map(node => node.id);
    const commonOutgoerId = findCommonOutgoer(nodes, edges, screenId);
    const isEnd = outgoerIds.includes('end');

    const nodeAllValidConditions = blocks.reduce((acc, block, index) => {
      const filteredBlock = _keys(block.conditions)
        .filter(condition => block.conditions[condition].length)
        .map(condition => `${screenId}>${index}>${condition}`);

      if (filteredBlock.length) {
        filteredBlock.push(`${screenId}>${index}>else`);
      } else {
        hasFallback = true;
      }

      return [...acc, ...filteredBlock];
    }, []);

    let nodesToBeDeleted = [];
    const nodesToBeUpdated = [];
    const edgesToBeUpdated = [];
    const newNode = [];
    const newEdges = [];

    nodeAllValidConditions.forEach((condition, index) => {
      const [, blockIndex, conditionType] = condition.split('>');
      const [nodeWithCondition] = nodes.filter(
        node => _get(node?.data, 'condition', '') === condition,
      );

      if (nodeWithCondition) {
        nodesToBeUpdated.push(nodeWithCondition);
        const updatedEdge = edges
          .filter(edge => _get(edge, 'data.condition', '') === condition)
          .map(edge => ({
            ...edge,
            data: {
              condition,
              conditionLogic:
                blocks[Number(blockIndex)].conditions[conditionType],
              background: BLOCK_COLOR_MAPPING[Number(blockIndex)]?.background,
              stroke: BLOCK_COLOR_MAPPING[Number(blockIndex)]?.border,
            },
            style: {
              stroke: BLOCK_COLOR_MAPPING[Number(blockIndex)]?.border,
              strokeWidth: 2,
            },
          }));

        edgesToBeUpdated.push(...updatedEdge);
      } else {
        const nextNodeId = getNextNodeId([...get().getScreens(), ...newNode]);

        const edgeTargetId = isEnd ? 'end' : `${commonOutgoerId}`;

        newNode.push({
          id: `${nextNodeId}`,
          data: {
            blocks: [],
            parent: screenId,
            condition: condition,
          },
          position: {
            x:
              nodeDetails.position.x +
              getPositionX(nodeAllValidConditions.length, index) * 350,
            y:
              nodeDetails.position.y +
              getPositionY(nodeAllValidConditions.length, index) * 200,
          },
          type: 'screen',
        });

        newEdges.push(
          {
            id: `${screenId}-${nextNodeId}`,
            source: screenId,
            target: `${nextNodeId}`,
            data: {
              condition,
              conditionLogic:
                blocks[Number(blockIndex)].conditions[conditionType],
              background: BLOCK_COLOR_MAPPING[Number(blockIndex)]?.background,
              stroke: BLOCK_COLOR_MAPPING[Number(blockIndex)]?.border,
            },
            style: {
              stroke: BLOCK_COLOR_MAPPING[Number(blockIndex)]?.border,
              strokeWidth: 2,
            },
            type: 'condition-edge',
          },
          {
            id: `${nextNodeId}-${edgeTargetId}`,
            source: `${nextNodeId}`,
            target: `${edgeTargetId}`,
            type: 'plus-edge',
          },
        );

        // newJourneyMap = {
        //   ...newJourneyMap,
        //   [nextNodeId]: {
        //     source: [screenId],
        //     target: [edgeTargetId],
        //     parent: screenId.toString(),
        //     condition: condition,
        //   },
        //   [screenId]: {
        //     ...newJourneyMap[screenId],
        //     target: newJourneyMap[screenId]?.target?.concat(`${nextNodeId}`),
        //   },
        //   [edgeTargetId]: {
        //     ...newJourneyMap[edgeTargetId],
        //     source: newJourneyMap[edgeTargetId]?.source?.concat(`${nextNodeId}`),
        //   },
        // };
      }
    });

    nodesToBeDeleted = _difference(outgoerIds, [
      ...nodesToBeUpdated.map(node => node.id),
      commonOutgoerId,
    ]);

    if (nodesToBeDeleted.length) {
      nodesToBeDeleted = nodesToBeDeleted
        .reduce((acc, prev) => {
          const connectedOutgoer = getAllConnectedNodes(
            { id: prev },
            nodes,
            edges,
          );

          return [...acc, ...connectedOutgoer];
        }, [])
        .map(node => node.id);

      updatedEdges = updatedEdges.filter(edge => {
        const [source, target] = edge?.id?.split('-');

        return !(
          nodesToBeDeleted.includes(source) || nodesToBeDeleted.includes(target)
        );
      });
      updatedNodes = updatedNodes.filter(
        node => !nodesToBeDeleted.includes(node.id),
      );
      // nodesToBeDeleted.forEach(id => {
      //   Object.keys(newJourneyMap).map(key => {
      //     newJourneyMap[key].source = newJourneyMap[key]?.source?.filter(
      //       sourceId => !(id === sourceId),
      //     );
      //     newJourneyMap[key].target = newJourneyMap[key]?.target?.filter(
      //       targetId => !(id === targetId),
      //     );
      //     delete newJourneyMap[key];
      //   });
      // });
    }

    updatedNodes.push(...newNode);

    updatedEdges = updatedEdges.filter(
      edge =>
        !edgesToBeUpdated.map(updatedEdge => updatedEdge.id).includes(edge.id),
    );
    updatedEdges = [...updatedEdges, ...edgesToBeUpdated, ...newEdges];

    if (hasFallback) {
      if (!fallBackEdges.length) {
        fallBackEdges.push({
          id: `${screenId}-${commonOutgoerId}`,
          source: `${screenId}`,
          target: `${commonOutgoerId}`,
          type: 'plus-edge',
          data: {
            condition: `${screenId}_fallback`,
          },
        });
        updatedEdges = [...updatedEdges, ...fallBackEdges];
      }

      // newJourneyMap[screenId]?.target?.includes(commonOutgoerId.toString())
      //   ? ''
      //   : newJourneyMap[screenId]?.target?.push(commonOutgoerId.toString());
    } else {
      updatedEdges = updatedEdges.filter(
        edge => _get(edge, 'data.condition', '') !== `${screenId}_fallback`,
      );
      // newJourneyMap[screenId].target = newJourneyMap[screenId]?.target?.filter(
      //   id => id !== commonOutgoerId.toString(),
      // );
      // newJourneyMap[commonOutgoerId].source = newJourneyMap[
      //   commonOutgoerId
      // ]?.source?.filter(id => id !== screenId.toString());
    }

    set({
      // journeyMap: newJourneyMap,
      nodes: updatedNodes,
      edges: _uniqBy(updatedEdges, 'id'),
    });
  },
  onAddConditionals: screenId => {
    const fallBackEdges = [];
    const { nodes, edges, journeyMap } = get();
    // let newJourneyMap = journeyMap;
    const nodeDetails = get().getNode(screenId);
    const { blocks } = nodeDetails.data;
    const outgoerNodes = getOutgoers(nodeDetails, nodes, edges);
    const outgoerIds = outgoerNodes.map(node => node.id);
    const connectedOutgoers = outgoerNodes
      .reduce((acc, prev) => {
        const connectedOutgoer = getAllConnectedNodes(prev, nodes, edges);

        return [...acc, ...connectedOutgoer];
      }, [])
      .map(node => node.id);
    const commonOutgoerId = findCommonOutgoer(nodes, edges, screenId);
    const isEnd = outgoerIds.includes('end');

    const nodeAllValidConditions = blocks.reduce((acc, block, index) => {
      const filteredBlock = _keys(block.conditions)
        .filter(condition => block.conditions[condition].length)
        .map(condition => `${screenId}>${index}>${condition}`);

      if (filteredBlock.length) {
        filteredBlock.push(`${screenId}>${index}>else`);
      } else {
        fallBackEdges.push({
          id: `${screenId}-${commonOutgoerId}`,
          source: `${screenId}`,
          target: `${commonOutgoerId}`,
          type: 'plus-edge',
          data: {
            condition: `${screenId}_fallback`,
          },
        });
        // newJourneyMap[screenId]?.target?.includes(commonOutgoerId.toString())
        //   ? ''
        //   : newJourneyMap[screenId]?.target?.push(commonOutgoerId.toString());
      }

      return [...acc, ...filteredBlock];
    }, []);

    const existingChildNodes = nodes
      .filter(node => _get(node.data, 'parent', '') === screenId)
      .map(node => node.id);

    // newJourneyMap[screenId].target = [];
    // newJourneyMap[commonOutgoerId].source = [];

    const updateNodes = existingChildNodes.length > 0;

    const filteredScreens = nodes.filter(
      node =>
        !['start', 'end', ...(updateNodes ? connectedOutgoers : [])].includes(
          node.id,
        ),
    );

    const nextNodeId = getNextNodeId(filteredScreens);

    const {
      conditionalEdges,
      conditionalNodes,
    } = nodeAllValidConditions.reduce(
      (acc, condition, index) => {
        const [, blockIndex, conditionType] = condition.split('>');

        const newNodeId = nextNodeId + index;

        const edgeTargetId = _get(
          _find(edges, { source: String(newNodeId) }),
          'target',
          isEnd ? 'end' : `${commonOutgoerId}`,
        );

        const newNode = {
          id: `${newNodeId}`,
          data: {
            blocks: [],
            parent: screenId,
            condition: condition,
          },
          position: {
            x:
              nodeDetails.position.x +
              getPositionX(nodeAllValidConditions.length, index) * 350,
            y:
              nodeDetails.position.y +
              getPositionY(nodeAllValidConditions.length, index) * 200,
          },
          type: 'screen',
        };
        const newEdges = [
          {
            id: `${screenId}-${newNodeId}`,
            source: screenId,
            target: `${newNodeId}`,
            data: {
              condition,
              conditionLogic:
                blocks[Number(blockIndex)].conditions[conditionType],
              background: BLOCK_COLOR_MAPPING[Number(blockIndex)]?.background,
              stroke: BLOCK_COLOR_MAPPING[Number(blockIndex)]?.border,
            },
            style: {
              stroke: BLOCK_COLOR_MAPPING[Number(blockIndex)]?.border,
              strokeWidth: 2,
            },
            type: 'condition-edge',
          },
          {
            id: `${newNodeId}-${isEnd ? 'end' : edgeTargetId}`,
            source: `${newNodeId}`,
            target: `${isEnd ? 'end' : edgeTargetId}`,
            type: 'plus-edge',
          },
        ];

        // newJourneyMap = {
        //   ...newJourneyMap,
        //   [screenId]: {
        //     ...newJourneyMap[screenId],
        //     target: [...newJourneyMap[screenId]?.target, newNodeId.toString()],
        //   },
        //   [newNodeId]: {
        //     source: [screenId],
        //     target: [isEnd ? 'end' : edgeTargetId],
        //     parent: screenId.toString(),
        //     condition: condition,
        //   },
        //   [commonOutgoerId]: {
        //     ...newJourneyMap[commonOutgoerId],
        //     source: [
        //       ...newJourneyMap[commonOutgoerId]?.source,
        //       newNodeId.toString(),
        //     ],
        //   },
        // };

        return {
          conditionalEdges: [...acc.conditionalEdges, ...newEdges],
          conditionalNodes: [...acc.conditionalNodes, newNode],
        };
      },
      {
        conditionalEdges: [],
        conditionalNodes: [],
      },
    );

    const filteredEdges = isEnd
      ? get().removeEdge(screenId, 'end')
      : existingChildNodes.length === outgoerIds.length
      ? get().removeEdgeByIds(existingChildNodes)
      : get().removeEdge(screenId, outgoerIds[0]);

    const updatedNodes = nodes
      .filter(node => !existingChildNodes.includes(node.id))
      .map(node => {
        if (node.position.y > nodeDetails.position.y) {
          const updatedNode = {
            ...node,
            position: { ...node.position, y: node.position.y + 300 },
          };

          return updatedNode;
        }

        return node;
      });

    set({
      nodes: [...updatedNodes, ...conditionalNodes],
      edges: _uniqBy(
        [...conditionalEdges, ...filteredEdges, ...fallBackEdges],
        'id',
      ),
      // journeyMap: newJourneyMap,
    });
  },

  // ADD Actions END //

  // UTILS Actions START //
  onNameOptional: (id, blockId, product) => {
    set({
      nodes: get().nodes.map(node => {
        if (node.id === id) {
          const filteredBlock = node.data.blocks[blockId];

          filteredBlock.optionalName[product] = !filteredBlock.optionalName[
            product
          ];

          node.data.blocks[blockId] = filteredBlock;
        }

        return node;
      }),
    });
  },

  saveCondition: (id, allCondition) => {
    set({
      nodes: get().nodes.map(node => {
        if (node.id === id) {
          const { blocks } = node.data;
          const updatedBlocks = blocks.reduce(
            (acc, block, index) => [
              ...acc,
              _set(block, 'conditions', allCondition[index]),
            ],
            [],
          );

          node.data.blocks = updatedBlocks;
        }

        return node;
      }),
    });
  },

  getNextPageId: (sourceId, blockId, condition) => {
    const filteredEdges = get().edges.find(
      edge =>
        edge.source === sourceId &&
        edge?.data?.condition === `${sourceId}>${blockId}>${condition}`,
    );

    return filteredEdges?.target || getNextNodeId(get().getScreens());
  },
  // UTILS Actions END //

  // UNDO & REDO //
  setNodes: newNodes => set({ nodes: newNodes }),
  setEdges: newEdges => set({ edges: newEdges }),

  addHistory: () => {
    const { nodes, edges, history } = get();
    const newState = { nodes: [...nodes], edges: [...edges] };

    if (
      history.stack.length === 0 ||
      !_isEqual(history.stack[history.currentIndex], newState)
    ) {
      const newStack = history.stack.slice(0, history.currentIndex + 1);
      newStack.push(newState);
      set({ history: { stack: newStack, currentIndex: newStack.length - 1 } });
    }
  },

  reserHistory: () => {
    set({
      history: { stack: [], currentIndex: -1 },
    });
  },

  undo: () => {
    const { history, setNodes, setEdges } = get();

    if (history.currentIndex > 0) {
      const newIndex = history.currentIndex - 1;
      const previousState = history.stack[newIndex];
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      set({ history: { ...history, currentIndex: newIndex } });
    }
  },

  redo: () => {
    const { history, setNodes, setEdges } = get();
    if (history.currentIndex < history.stack.length - 1) {
      const newIndex = history.currentIndex + 1;
      const nextState = history.stack[newIndex];
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      set({ history: { ...history, currentIndex: newIndex } });
    }
  },
}));

export default useStore;
