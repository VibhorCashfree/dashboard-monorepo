import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, Button, DateFilter } from '@cashfree-intl/coherent';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';
import _size from 'lodash/size';
import _pick from 'lodash/pick';
import _omit from 'lodash/omit';
import _keys from 'lodash/keys';
import _without from 'lodash/without';
import _keyBy from 'lodash/keyBy';

// Action Types
import LIST_ACTION_TYPE from 'actionTypes/list';
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Constants
import {
  MENU,
  SUBMENU,
  PATH_BY_MENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { DEFAULT_VALUE, FORMATS } from 'constants/date';
import { KNOW_MORE } from 'constants/urls';
import {
  labelByStatus,
  options,
  filtersConfig,
  ACK_TYPE,
  MODAL_TYPE,
  DATE_RANGE_OPTIONS,
  extraChipConfig,
} from './constants';

// Services
import { getAll, getAllCount } from 'services/transfers';

// Helpers
import { getFiltersConfig } from 'helpers/fundSources';
import { getFormattedRowData } from './helpers';

// Hooks
import useHasMount from 'hooks/useHasMount';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useList } from 'providers/ListProvider';

// Utils
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import { extractFiltersFromQuery, emitUserValidation } from 'utils/common';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import CanWrite from 'components/CanWrite';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import DataTableWithPagination from 'components/DataTableWithPagination';
import Modals from './components/Modals';

// Styled
import { FilterRowContainer } from 'styled/common';

// Types
import type { AllTransfersProps } from './types';

const AllTransfers: React.FC<AllTransfersProps> = ({ fundSources }) => {
  const queryFilters = extractFiltersFromQuery();

  const { preferences } = useAccount();
  const { state, dispatch } = useList();

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const hasMount = useHasMount();

  const navigate = useNavigate();
  const location = useLocation();

  const allPaymentInstrumentIds: string[] = fundSources.map(
    (fundSource) => fundSource.paymentInstrumentId,
  );

  useEffect(() => {
    if (_isEmpty(queryFilters)) {
      return;
    }

    navigate(location.pathname, { replace: true });

    dispatch({
      type: LIST_ACTION_TYPE.QUERY_FILTERS,
      payload: queryFilters,
    });
  }, []);

  useEffect(() => {
    (async function fetchData() {
      if ((hasMount && data) || !_isEmpty(queryFilters)) {
        return;
      }

      const status: string[] = _without(
        _keys(filters),
        'search',
        ..._keys(ACK_TYPE),
        ...allPaymentInstrumentIds,
      );

      const queryObj: {
        status: string[];
        size: number;
        num: number;
        cfBankIds: string[];
        startDate?: string;
        endDate?: string;
        [key: string]: any;
      } = {
        status,
        size: limit,
        num: currentPage,
        cfBankIds: fundSources
          .filter((fundSource) => filters[fundSource.paymentInstrumentId])
          .map((fundSource) => fundSource.fundSourceId),
      };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = moment(startDate).format(FORMATS.DATE);
        queryObj.endDate = moment(endDate).format(FORMATS.DATE);
      }

      if (filters.search && searchBy) {
        queryObj[searchBy] = filters.search;
      }

      if (filters.No) {
        queryObj.acknowledged = 'NO';
      }

      if (filters.Yes) {
        queryObj.acknowledged = 'YES';
      }

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getAll(queryObj);
      const countPromise = isFirstPage && getAllCount(queryObj);

      const response = await dataPromise;

      {
        const data = ('error' in response ? [] : response.data).map(
          (item: any) => ({
            ...item,
            id: item.referenceId,
          }),
        );

        let hasNext: boolean;

        if (!response || 'error' in response || !response.cursor) {
          hasNext = false;
        } else {
          hasNext = !JSON.parse(atob(response.cursor)).searchAfter.empty;
        }

        dispatch({
          type: COMMON_ACTION_TYPE.SET_DATA,
          payload: {
            data,
            hasNext,
          },
        });
      }

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        dispatch({
          type: COMMON_ACTION_TYPE.SET_DATA,
          payload: countResponse,
        });
      }
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter, key]);

  const fundSourceById = _keyBy(fundSources, 'paymentInstrumentId');

  const onPageChange = (
    type: COMMON_ACTION_TYPE.PREV | COMMON_ACTION_TYPE.NEXT,
  ) =>
    dispatch({
      type: COMMON_ACTION_TYPE.SET_CURRENT_PAGE,
      payload: type,
    });

  const onLimitChange = (e: React.MouseEvent, data: { value: string }) => {
    dispatch({
      type: COMMON_ACTION_TYPE.SET_LIMIT,
      payload: data.value,
    });

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRowClick = (row: { id: string }) => {
    navigate(`/${PATH_BY_MENU[MENU.TRANSFERS]}/${row.id}/details`, {
      state: { rowDetails: row },
    });
  };

  const handleFiltersChange = (
    filters: AnyObject,
    searchBy: string | undefined,
  ) => {
    if (_size(_pick(filters, ['PENDING', 'FAILED', 'REVERSED']))) {
      _omit(filters, _keys(ACK_TYPE));
    }

    dispatch({
      type: COMMON_ACTION_TYPE.SET_FILTERS,
      payload: filters,
    });
    dispatch({
      type: COMMON_ACTION_TYPE.SET_SEARCH_BY,
      payload: searchBy,
    });

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.TRANSFERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = (key: string) => {
    const isRangeFilter: boolean = key === 'RANGE';

    const type = isRangeFilter
      ? COMMON_ACTION_TYPE.SET_DATE_VALUE
      : COMMON_ACTION_TYPE.SET_FILTERS;
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.TRANSFERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      type: 'individual',
    });

    dispatch({
      type,
      payload,
    });
  };

  const handleDateChange = (dateValue: DateRangeValue) => {
    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.TRANSFERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      date_value: dateValue,
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
      payload: dateValue,
    });
  };

  // @ts-ignore
  const extraChips = extraChipConfig.concat({
    prefix: 'Fund Source',
    values: allPaymentInstrumentIds,
    source: fundSourceById,
  });

  return (
    <>
      <PageHeader embedKey="TRANSFERS_ALL">
        {LABEL_BY_SUBMENU[SUBMENU.ALL]} {LABEL_BY_MENU[MENU.TRANSFERS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.ALL]} ${
          LABEL_BY_MENU[MENU.TRANSFERS]
        }`}
      />

      <Text className="my-2" color="bodyLight">
        All transfers including batch are shown here.{' '}
        <a
          href={KNOW_MORE.TRANSFERS.ALL}
          target="_blank"
          rel="noopener noreferrer"
          data-event-name="Link"
        >
          Know more
        </a>
      </Text>
      <FilterRowContainer>
        <div>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            options={DATE_RANGE_OPTIONS}
            min={new Date(2024, 0, 1)}
            alertText="Data available for transfers initiated on or after 1st Jan 2024"
            onSelect={handleDateChange}
          />
          <FilterPopover
            config={getFiltersConfig(fundSources, filtersConfig)}
            labelByStatus={labelByStatus}
            searchOptions={options}
            value={filters}
            onChange={handleFiltersChange}
            specialCase="TRANSFERS"
          />
          <FilterChips
            chips={getChips(
              { dateValue, filters, searchBy },
              options,
              labelByStatus,
              extraChips,
            )}
            onRemove={handleRemove}
          />
        </div>
        <CanWrite code={21002}>
          {preferences.quickTransfer && (
            <Button
              data-event-name="Primary_Button"
              primary
              onClick={() =>
                emitUserValidation(() =>
                  setModalType(MODAL_TYPE.QUICK_TRANSFER),
                )
              }
            >
              Quick Transfer
            </Button>
          )}
        </CanWrite>
      </FilterRowContainer>

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

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withReadPermission(withConnect(AllTransfers), {
  code: 21001,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.ALL]} ${
    LABEL_BY_MENU[MENU.TRANSFERS]
  }`,
});
