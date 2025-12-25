import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader, Text, Paper, Button } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _size from 'lodash/size';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useBatchDetails } from 'providers/BatchDetailsProvider';

// Utils
import { getCursor } from 'utils/pagination';
import getApprovalData from 'utils/getApprovalData';
import Analytics from 'utils/analytics';
import { emitUserValidation } from 'utils/common';
import { getChips } from 'utils/chips';
import { getFilterMap } from './utils';

// Services
import {
  getBatchApprovalDetails,
  getBatchStats,
  getBatchEntries,
  getBatchEntriesCount,
  updateBatch,
  updateBatchEntries,
} from 'services/cashgrams';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { options, MODAL_TYPE, primaryKey } from './constants';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import Icon from 'components/Icon';
import StatusStats from 'components/StatusStats';
import BatchInfo from 'components/BatchInfo';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import BatchDetailsApprovals from 'components/BatchDetailsApprovals';
import DataTableWithPagination from 'components/DataTableWithPagination';
import Modals from './components/Modals';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import {
  BackButtonWrapper,
  Divider,
  BtnContainer,
  BatchDetailsFilterWrapper,
} from 'styled/common';

const BatchCashgramDetails: React.FC = () => {
  const { preferences } = useAccount();
  const { state, dispatch } = useBatchDetails();

  const { limit, currentPage, data, filters, searchBy } = state;

  const [selectedRecords, setSelectedRecords] = useState<any[]>([]);
  const [approvalDetails, setApprovalDetails] = useState<AnyObject>({});
  const [statsData, setStatsData] = useState<AnyObject>({});
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [loading, setLoading] = useState(false);

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();
  const location = useLocation();

  const { batchRowDetails, toBeApproved } = location.state as {
    batchRowDetails: AnyObject;
    toBeApproved: boolean;
  };

  const hasBatchPreference = batchRowDetails.totalApprovalCount > 0;

  const { labelByStatus, filtersConfig } = getFilterMap(
    toBeApproved,
    preferences.cashgrams.individual || preferences.cashgrams.batch,
  );

  useEffect(() => {
    (async function fetchData() {
      const statsResponse = await getBatchStats(
        batchRowDetails.id,
        toBeApproved,
      );
      const detailsResponse = await getBatchApprovalDetails(batchRowDetails.id);

      setStatsData(statsResponse);
      setApprovalDetails(detailsResponse);
    })();
  }, []);

  useEffect(() => {
    (async function fetchData() {
      const status = Object.keys(filters);

      const queryObj: PaginationQueryObj = {
        status: status.filter((v) => v !== 'search'),
        size: limit,
      };

      if (filters.search && searchBy) {
        queryObj[searchBy] = filters.search;
      }

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage = currentPage === 1;

      queryObj.approveSection = toBeApproved;

      setLoading(true);
      setSelectedRecords([]);

      const dataPromise = getBatchEntries(batchRowDetails.id, queryObj);
      const countPromise =
        isFirstPage && getBatchEntriesCount(batchRowDetails.id, queryObj);

      const response = await dataPromise;

      dispatch({
        type: COMMON_ACTION_TYPE.SET_DATA,
        payload: response,
      });

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        dispatch({
          type: COMMON_ACTION_TYPE.SET_DATA,
          payload: countResponse,
        });
      }
    })();
  }, [currentPage, limit, filters]);

  const onPageChange = (
    type: COMMON_ACTION_TYPE.PREV | COMMON_ACTION_TYPE.NEXT,
  ) => dispatch({ type: COMMON_ACTION_TYPE.SET_CURRENT_PAGE, payload: type });

  const onLimitChange = (e: React.MouseEvent, data: { value: string }) => {
    dispatch({ type: COMMON_ACTION_TYPE.SET_LIMIT, payload: data.value });

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRowClick = (row: AnyObject) => {
    navigate(`/${PATH_BY_MENU[MENU.CASHGRAMS]}/${row.id}/details`, {
      state: {
        rowDetails: row,
        fromBatch: true,
      },
    });
  };

  const handleFiltersChange = (
    filters: AnyObject,
    searchBy: string | undefined,
  ) => {
    dispatch({ type: COMMON_ACTION_TYPE.SET_FILTERS, payload: filters });
    dispatch({ type: COMMON_ACTION_TYPE.SET_SEARCH_BY, payload: searchBy });

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_DETAILS],
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = (key: string) => {
    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_DETAILS],
      type: 'individual',
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_FILTERS,
      payload: _omit(filters, key),
    });
  };

  const handleAction = async () => {
    const action = modalType === MODAL_TYPE.APPROVE ? 'approve' : 'reject';

    if (hasBatchPreference) {
      await updateBatch({
        id: batchRowDetails.id,
        action,
      });
    } else {
      const selectedIds = selectedRecords.map((record) => Number(record.id));

      const body = {
        referenceId: batchRowDetails.id,
        records: selectedIds,
        action,
      };

      await updateBatchEntries(body);
    }

    const newModalType =
      modalType === MODAL_TYPE.APPROVE
        ? MODAL_TYPE.APPROVED
        : MODAL_TYPE.REJECTED;

    setModalType(newModalType);
  };

  const approvalData = getApprovalData(
    approvalDetails.approvals,
    approvalDetails.rejections,
  );

  const hasApprovals = _size(approvalData) > 0;

  if (!data) {
    return <Loader active />;
  }

  const count = _size(selectedRecords);

  const disabled = count === 0;

  const amount = selectedRecords.reduce(
    (totalAmount, record) => totalAmount + Number(record.amount),
    0,
  );

  const selectProps = {
    primaryKey,
    selectedRecordIds: selectedRecords.reduce((acc, record) => {
      acc[record[primaryKey]] = true;
      return acc;
    }, {}),
    onChange: (updatedSelectedRecordIds: Record<string, boolean>) =>
      setSelectedRecords(
        data.data.filter(
          (record: AnyObject) => updatedSelectedRecordIds[record[primaryKey]],
        ),
      ),
    renderRowSelectionAction: () => (
      <BtnContainer className="mt-0 mb-2">
        <Button
          data-event-name="Primary_Button"
          danger
          onClick={() => setModalType(MODAL_TYPE.REJECT)}
          disabled={disabled}
        >
          Reject
        </Button>
        <Button
          data-event-name="Primary_Button"
          primary
          className="ml-2"
          onClick={() =>
            emitUserValidation(() => setModalType(MODAL_TYPE.APPROVE))
          }
          disabled={disabled}
        >
          Approve
        </Button>
      </BtnContainer>
    ),
  };

  const showSelect = _size(data.data) && !hasBatchPreference && toBeApproved;

  return (
    <>
      <PageHeader>
        {toBeApproved
          ? LABEL_BY_SUBMENU[SUBMENU.APPROVE_BATCH_DETAILS]
          : LABEL_BY_SUBMENU[SUBMENU.BATCH_DETAILS]}{' '}
        {LABEL_BY_MENU[MENU.CASHGRAMS]}
      </PageHeader>
      <MetaTags
        title={`${
          toBeApproved
            ? LABEL_BY_SUBMENU[SUBMENU.APPROVE_BATCH_DETAILS]
            : LABEL_BY_SUBMENU[SUBMENU.BATCH_DETAILS]
        } ${LABEL_BY_MENU[MENU.CASHGRAMS]}`}
      />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      <Paper>
        <BatchInfo
          fileName={batchRowDetails.fileName}
          fileId={batchRowDetails.id}
          uploadedAt={batchRowDetails.addedOn}
          uploadedBy={batchRowDetails.uploadedBy}
          status={batchRowDetails.status}
          amount={batchRowDetails.totalAmount}
          currency={batchRowDetails.currency}
        />

        {hasApprovals && (
          <BatchDetailsApprovals
            data={approvalData}
            count={batchRowDetails.approvalCount}
            totalCount={batchRowDetails.totalApprovalCount}
          />
        )}

        <Divider />

        <StatusStats data={statsData} />

        <div className="mt-2">
          <BatchDetailsFilterWrapper>
            <FilterPopover
              config={filtersConfig}
              labelByStatus={labelByStatus}
              searchOptions={options}
              value={filters}
              onChange={handleFiltersChange}
            />
            <FilterChips
              chips={getChips({ filters, searchBy }, options, labelByStatus)}
              onRemove={handleRemove}
            />
          </BatchDetailsFilterWrapper>

          {!showSelect && toBeApproved && (
            <BtnContainer className="mt-0 mb-2">
              <Button
                data-event-name="Primary_Button"
                onClick={() => setModalType(MODAL_TYPE.REJECT)}
                danger
                disabled={!hasBatchPreference && disabled}
              >
                Reject
              </Button>
              <Button
                data-event-name="Primary_Button"
                primary
                className="ml-2"
                onClick={() =>
                  emitUserValidation(() => setModalType(MODAL_TYPE.APPROVE))
                }
                disabled={!hasBatchPreference && disabled}
              >
                Approve
              </Button>
            </BtnContainer>
          )}

          <DataTableWithPagination
            loading={loading}
            limit={limit}
            currentPage={currentPage}
            data={data}
            columns={getFormattedRowData(hasBatchPreference)}
            selectProps={showSelect ? selectProps : null}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
            onRowClick={handleRowClick}
          />
        </div>
      </Paper>

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          hasBatchPreference={hasBatchPreference}
          batchRowDetails={batchRowDetails}
          count={count}
          amount={amount}
          handleAction={handleAction}
        />
      )}
    </>
  );
};

export default BatchCashgramDetails;
