import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import WorkFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Panel,
  getOutgoers,
} from '@cashfree-intl/workflow';
import { Space, Image, Text } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _keys from 'lodash/keys';
import _isEqual from 'lodash/isEqual';
import _debounce from 'lodash/debounce';

// constants
import { ALL_FIELD_MAPPING } from './constants';
import { initialEdges, initialNodes } from '../../constants';

// Components
import Modals from './Modals';
import ProductConfig from './ProductConfig';
import Icon from 'components/Icon';
import DefaultTemplate from './DefaultTemplate';

// Images
import Title from 'images/title.svg';

// Nodes
import StartNode from './CustomNodes/StartNode';
import EndNode from './CustomNodes/EndNode';
import ScreenNode from './CustomNodes/ScreenNode';

// Edges
import PlusEdge from './CustomEdge/PlusEdge';
import ConditionalEdge from './CustomEdge/ConditionalEdge';

// Helpers
import { getMetaTitle, getSubPages, getRules } from './helpers';
import { getNextNodeId } from '../../helpers';

// Styled
import { StyledWorkFlow, StyledPreview } from './styled';

// Store
import useStore from '../../store';
import { getWorkFlowJson, postWorkFlowJson } from 'services/forms';

const StepThree = ({
  colorValues,
  logoImage,
  formObj,
  handlePayload,
  payloadDraftId,
  setPayloadDraftId,
  apiNodes,
  apiEdges,
  action,
  isPublished,
}) => {
  const [modalType, setModalType] = useState();
  const [screen, setScreen] = useState();
  const [blockId, setBlockid] = useState();
  const [showDefault, setShowDefault] = useState(payloadDraftId ? false : true);

  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectedNode,
    getScreens,
    getNextPageId,
    journeyMap,
    addHistory,
    undo,
    redo,
    reserHistory,
  } = useStore(
    useShallow(state => ({
      nodes: state.nodes,
      edges: state.edges,
      setNodes: state.setNodes,
      setEdges: state.setEdges,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      selectedNode: state.selectedNode,
      getScreens: state.getScreens,
      getNextPageId: state.getNextPageId,
      journeyMap: state.journeyMap,
      addHistory: state.addHistory,
      undo: state.undo,
      redo: state.redo,
      reserHistory: state.reserHistory,
    })),
  );

  useEffect(() => {
    if (action !== 'CREATE') {
      setNodes(apiNodes);
      setEdges(apiEdges);
      setShowDefault(false);
      handlePayload(apiNodes, apiEdges, getPayload());
      addHistory();
    }

    return () => {
      setNodes(initialNodes);
      setEdges(initialEdges);
      reserHistory();
    };
  }, [apiNodes, apiEdges]);

  const debouncedSubmitData = useCallback(
    _debounce(async () => {
      if (action === 'VIEW' || !Object.values(formObj).length || showDefault) {
        return;
      }

      const payload = {
        ...formObj,
        userAuthentication: false,
        uiData: {
          nodes,
          edges,
        },
      };

      if (payloadDraftId) {
        payload.draftId = payloadDraftId;
      }

      const response = await postWorkFlowJson(payload);

      if (!response.error) {
        addHistory();
        handlePayload(nodes, edges, getPayload());
        if (response.id !== payloadDraftId) {
          setPayloadDraftId(response.id);
        }
      }
    }, 1000),
    [action, nodes, edges, payloadDraftId],
  );

  useEffect(() => {
    debouncedSubmitData();

    return () => {
      debouncedSubmitData.cancel();
    };
  }, [debouncedSubmitData, nodes, edges]);

  const handleAddProduct = (id, blockId) => {
    setModalType('ADD_NEW_BLOCK');
    setScreen(id);
    setBlockid(blockId);
  };

  const handleAddCondition = id => {
    setModalType('ADD_NEW_CONDITION');
    setScreen(id);
  };

  const handleDeleteScreen = id => {
    setModalType('DELETE_SCREEN');
    setScreen(id);
  };

  const fetchDefaultTemplateData = ({ nodes, edges }) => {
    setNodes(nodes);
    setEdges(edges);
    handlePayload(nodes, edges, getPayload());
  };

  const nodeTypes = useMemo(
    () => ({
      start: props => <StartNode {...props} />,
      end: props => <EndNode isPublished={isPublished} {...props} />,
      screen: props => (
        <ScreenNode
          handleAddProduct={handleAddProduct}
          handleDeleteScreen={handleDeleteScreen}
          isPublished={isPublished}
          {...props}
        />
      ),
    }),
    [],
  );

  const edgeTypes = useMemo(
    () => ({
      'plus-edge': props => <PlusEdge isPublished={isPublished} {...props} />,
      'condition-edge': ConditionalEdge,
    }),
    [],
  );

  // to be refactored
  const getPayload = () => {
    const pages = getScreens().reduce((acc, prev) => {
      const pageJson = {
        pageIdentifier: 'detail_page',
      };

      const blocks = _get(prev, 'data.blocks', []);
      const hasAccordion = blocks.length > 1;

      const pages = blocks.reduce((blockAcc, block, index) => {
        let nextPage;
        let rules = _keys(block.conditions).filter(
          condition => block.conditions[condition].length,
        );

        if (rules.length > 0) {
          rules.push('else');
        } else {
          nextPage = getOutgoers(prev, nodes, edges).filter(
            node => !node?.data?.parent,
          )[0];
        }

        const pagesObj = {
          type: hasAccordion ? 'SUBMISSION_WITH_ACCORDION' : 'SUBMISSION',
          metaData: {
            title: getMetaTitle(block?.products),
            submitComponent: block?.products?.includes('pan360')
              ? 'submit_pan360'
              : 'submit',
          },
          subPages: getSubPages(block?.products, block?.optionalName),
          rules: rules.length
            ? rules.map(rule =>
                getRules(
                  block.conditions,
                  rule,
                  getNextPageId(prev.id, index, rule),
                ),
              )
            : [
                {
                  expression: 'true',
                  ruleType: 'EVALUATE',
                  decision: {
                    action:
                      nextPage?.id === 'end'
                        ? 'COMPLETE_ORDER_AND_REDIRECT'
                        : 'UPDATE_PAGE_AND_MOVE_TO_NEXT',
                    nextPageIndex:
                      nextPage?.id === 'end'
                        ? getNextNodeId(getScreens())
                        : getOutgoers(prev, nodes, edges)[0]?.id,
                    pageStatus: 'VERIFIED',
                  },
                },
              ],
        };

        return [...blockAcc, pagesObj];
      }, []);

      return [...acc, { ...pageJson, blocks: pages }];
    }, []);

    pages.push({
      pageIdentifier: 'thank_you_page',
      blocks: [
        {
          type: 'VIEW',
          subPages: [
            {
              subPageIdentifier: 'VERIFICATION_SUCCESS',
            },
            {
              subPageIdentifier: 'SHOW_SUB_PAGES_STATUS',
            },
          ],
        },
      ],
    });

    return pages;
  };

  if (showDefault) {
    return (
      <DefaultTemplate
        get
        closeDefaultTemplate={() => setShowDefault(false)}
        fetchDefaultJson={fetchDefaultTemplateData}
      />
    );
  }

  return (
    <>
      <Space fullHeight>
        <StyledWorkFlow justifyContent="center" fullWidth fullHeight>
          <WorkFlow
            width="100%"
            height="100%"
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            maxZoom={1}
            panOnScroll
            fitView
          >
            <Panel position="top-right">
              <StyledPreview size="small" onClick={undo}>
                <Space gap={0.5} alignItems="center">
                  <Icon name="undo" width={12} height={12} />
                  <Text color="primary">Undo</Text>
                </Space>
              </StyledPreview>
              <StyledPreview size="small" onClick={redo}>
                <Space gap={0.5} alignItems="center">
                  <Icon name="redo" width={12} height={12} />
                  <Text color="primary">Redo</Text>
                </Space>
              </StyledPreview>
              <StyledPreview
                size="small"
                disabled={!getScreens().length}
                onClick={() => setModalType('PREVIEW_JOURNEY')}
              >
                <Space gap={0.5} alignItems="center">
                  <Icon name="mobile" width={12} height={12} />
                  <Text color="primary">Preview</Text>
                </Space>
              </StyledPreview>
            </Panel>
            <Panel position="top-center" className="mt-0">
              <Image src={Title} />
            </Panel>

            <Background />
            <Controls position="top-left" />
          </WorkFlow>
        </StyledWorkFlow>
        <ProductConfig
          selectedScreen={selectedNode() || null}
          handleAddProduct={handleAddProduct}
          handleAddCondition={handleAddCondition}
          handleDeleteScreen={handleDeleteScreen}
          isPublished={isPublished}
        />
      </Space>
      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          screen={screen}
          blockId={blockId}
          colorValues={colorValues}
          logoImage={logoImage}
        />
      )}
    </>
  );
};

StepThree.propTypes = {};

export default StepThree;
