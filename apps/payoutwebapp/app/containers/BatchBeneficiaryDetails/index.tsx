import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader, Text, Paper } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Providers
import { BatchDetailsContext } from 'providers/BatchDetailsProvider';

// Utils
import Analytics from 'utils/analytics';
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Region from 'utils/region';
import { getFilterMap, getSearchOptions } from './utils';

// Services
import {
  getBatchStats,
  getBatchEntries,
  getBatchEntriesCount,
} from 'services/beneficiaries';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { REGION } from 'constants/common';

// Components
import StatusStats from 'components/StatusStats';
import BatchInfo from 'components/BatchInfo';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import DataTableWithPagination from 'components/DataTableWithPagination';
import Icon from 'components/Icon';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import {
  BackButtonWrapper,
  Divider,
  BatchDetailsFilterWrapper,
} from 'styled/common';

const BatchBeneficiaryDetails: React.FC = () => {
  const { state, dispatch } = useContext(BatchDetailsContext);

  const { limit, currentPage, data, filters, searchBy } = state;

  const [statsData, setStatsData] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();
  const location = useLocation();

  const { batchRowDetails } = location.state as {
    batchRowDetails: AnyObject;
  };

  const { labelByStatus, filtersConfig } = getFilterMap();

  useEffect(() => {
    (async function fetchData() {
      const statsResponse = await getBatchStats(batchRowDetails.id);
      setStatsData(statsResponse);
    })();
  }, [batchRowDetails.id]);

  useEffect(() => {
    (async function fetchData() {
      const status: string[] = Object.keys(filters);

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

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

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

  const handleRowClick = (row: { id: string }) => {
    navigate(`/${PATH_BY_MENU[MENU.BENEFICIARIES]}/${row.id}/details`, {
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
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_DETAILS],
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = (key: string) => {
    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.BENEFICIARIES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH_DETAILS],
      type: 'individual',
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_FILTERS,
      payload: _omit(filters, key),
    });
  };

  const options = getSearchOptions();

  if (!data) {
    return <Loader active />;
  }

  return (
    <>
      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>

      <Paper>
        <BatchInfo
          fileName={batchRowDetails.name}
          fileId={batchRowDetails.id}
          uploadedAt={
            Region.get() === REGION.IN
              ? batchRowDetails.addedOn
              : batchRowDetails.addedOn + 'Z'
          }
          uploadedBy={batchRowDetails.uploadedBy}
          status={batchRowDetails.status}
          amount={batchRowDetails.totalAmount}
          currency={batchRowDetails.currency}
        />

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

          <DataTableWithPagination
            loading={loading}
            limit={limit}
            currentPage={currentPage}
            data={data}
            columns={getFormattedRowData()}
            onPageChange={onPageChange}
            onLimitChange={onLimitChange}
            onRowClick={handleRowClick}
          />
        </div>
      </Paper>
    </>
  );
};

export default BatchBeneficiaryDetails;
