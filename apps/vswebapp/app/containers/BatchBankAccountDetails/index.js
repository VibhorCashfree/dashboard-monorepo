import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, Button, Paper } from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import _size from 'lodash/size';

// Helpers
import { hasMounted, getQuery } from 'helpers/common';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Components
import Loader from 'components/Loader';
import StatusStats from 'components/StatusStats';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import BatchInfo from 'components/BatchInfo';
import BatchDetailsApprovals from 'components/BatchDetailsApprovals';
import Icon from 'components/Icon';
import Modals from './components/Modals';
import PaginatedTable from 'components/PaginatedTable';

// Services
import {
  getBatchApprovalDetails,
  getBatchEntries,
  getBatchEntriesCount,
  rejectBatch,
  approveBatch,
} from 'services/bav';

// Providers
import { AccountContext } from 'providers/AccountProvider';
import { BatchDetailsContext } from 'providers/BatchDetailsProvider';

// Constants
import EVENTS from 'constants/analytics';
import { options, MODAL_TYPES } from './constants';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation } from 'utils/common';
import { getChips } from 'utils/chips';
import { getPaginationInfo, getCursor } from 'utils/pagination';
import getApprovalData from 'utils/getApprovalData';
import { getTableHeadings, getFilterMap } from './utils';

// Styled
import {
  BackButtonWrapper,
  Divider,
  BtnContainer,
  BatchDetailsFilterWrapper,
} from 'styled/common';

const BatchBankAccountDetails = () => {
  const { preferences } = useContext(AccountContext);
  const { state, dispatch } = useContext(BatchDetailsContext);

  const { limit, currentPage, data, filters, searchBy } = state;

  const [approvalDetails, setApprovalDetails] = useState({});
  const [modalType, setModalType] = useState();

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();
  const location = useLocation();

  const batchRowDetails = _get(location.state, 'batchRowDetails', {});
  const toBeApproved = _get(location.state, 'toBeApproved', false);

  const { labelByStatus, filtersConfig } = getFilterMap(
    toBeApproved,
    preferences?.bav?.batch,
  );

  useEffect(() => {
    (async function fetchData() {
      const response = await getBatchApprovalDetails(batchRowDetails.id);
      setApprovalDetails(response);
    })();
  }, []);

  useEffect(() => {
    (async function fetchData() {
      hasMounted(hasMount, data);

      const isFirstPage = currentPage === 1;

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      const queryObj = getQuery(filters, searchBy, limit);

      queryObj[cursorKey] = cursorValue;

      queryObj.approveSection = toBeApproved;

      const dataPromise = getBatchEntries(batchRowDetails.id, queryObj);
      const countPromise =
        isFirstPage && getBatchEntriesCount(batchRowDetails.id, queryObj);

      const response = await dataPromise;

      dispatch({
        type: 'SET_DATA',
        payload: response,
      });

      const countResponse = await countPromise;

      if (isFirstPage) {
        dispatch({
          type: 'SET_DATA',
          payload: countResponse,
        });
      }
    })();
  }, [currentPage, limit, filters]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = getTableHeadings(batchRowDetails.status);

  const onPageChange = type =>
    dispatch({ type: 'SET_CURRENT_PAGE', payload: type });

  const onLimitChange = (e, data) => {
    dispatch({ type: 'SET_LIMIT', payload: data.value });
    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRowClick = row => {
    const rowDetails = _find(data.data, { id: row.id });

    Analytics.track(EVENTS.TABLE_ROW, {
      section: 'BAV',
      sub_section: 'Batch Details',
      row_id: row.id,
    });

    navigate(`/bav/${row.id}/details`, {
      state: {
        rowDetails,
      },
    });
  };

  const handleFiltersChange = (filters, searchBy) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    dispatch({ type: 'SET_SEARCH_BY', payload: searchBy });

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'BAV',
      sub_section: 'Batch Details',
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = key => {
    dispatch({ type: 'SET_FILTERS', payload: _omit(filters, key) });

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'BAV',
      sub_section: 'Batch Details',
      type: 'individual',
    });
  };

  const handleAction = async () => {
    const isModalApprove = modalType === MODAL_TYPES.APPROVE;

    if (isModalApprove) {
      await approveBatch(batchRowDetails.id);
      setModalType('APPROVED');
      return;
    }

    await rejectBatch(batchRowDetails.id);
    setModalType('REJECTED');
  };

  if (!data) {
    return <Loader />;
  }

  const approvalData = getApprovalData(
    approvalDetails.approvals,
    approvalDetails.rejections,
  );

  const hasApprovals = _size(approvalData) > 0;

  return (
    <>
      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      {toBeApproved && (
        <BtnContainer className="mt-0 mb-2">
          <Button
            data-event-name="Danger_Button"
            onClick={() =>
              emitUserValidation(() => setModalType(MODAL_TYPES.REJECT))
            }
            danger
            data-testid="reject-batch"
          >
            Reject
          </Button>
          <Button
            primary
            data-event-name="Primary_Button"
            className="ml-2"
            data-testid="approve-batch"
            onClick={() =>
              emitUserValidation(() => setModalType(MODAL_TYPES.APPROVE))
            }
          >
            Approve
          </Button>
        </BtnContainer>
      )}

      <Paper>
        <BatchInfo
          fileName={batchRowDetails.filename}
          fileId={batchRowDetails.id}
          uploadedAt={batchRowDetails.addedOn}
          uploadedBy={batchRowDetails.uploadedBy}
          status={batchRowDetails.status}
        />

        {hasApprovals && (
          <BatchDetailsApprovals
            data={approvalData}
            count={batchRowDetails.noOfApprovals}
            totalCount={batchRowDetails.maxApprovals}
          />
        )}

        <Divider />

        <StatusStats
          data={{ total: batchRowDetails.totalRecords, ...data.stats }}
        />

        <div className="mt-2">
          <BatchDetailsFilterWrapper>
            <FilterPopover
              searchOptions={options}
              value={filters}
              onChange={handleFiltersChange}
              config={filtersConfig}
              labelByStatus={labelByStatus}
            />
            <FilterChips
              chips={getChips({ filters, searchBy }, options, labelByStatus)}
              onRemove={handleRemove}
            />
          </BatchDetailsFilterWrapper>

          <PaginatedTable
            data={rowData}
            limit={limit}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
            tableHeading={FORMATTED_COLUMN_ID}
            onRowClick={handleRowClick}
            {...paginationInfo}
          />
        </div>
      </Paper>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          batchRowDetails={batchRowDetails}
          handleAction={handleAction}
        />
      )}
    </>
  );
};

export default BatchBankAccountDetails;
