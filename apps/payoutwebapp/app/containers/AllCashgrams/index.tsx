import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, Button, DateFilter } from '@cashfree-intl/coherent';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';
import _omit from 'lodash/omit';

// ActionTypes
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
import { KNOW_MORE } from 'constants/urls';
import { DEFAULT_VALUE, FORMATS, DATE_RANGE_OPTIONS } from 'constants/date';
import {
  filtersConfig,
  labelByStatus,
  options,
  MODAL_TYPE,
  ACTION_TYPE,
} from './constants';

// Helpers
import { getFormattedRowData } from './helpers';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Services
import { getAll, getAllCount } from 'services/cashgrams';

// Utils
import Analytics from 'utils/analytics';
import {
  extractFiltersFromQuery,
  emitUserValidation,
  copyToClipboard,
} from 'utils/common';
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';

// Providers
import { useMerchant } from 'providers/MerchantProvider';
import { useList } from 'providers/ListProvider';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import CanWrite from 'components/CanWrite';
import DataTableWithPagination from 'components/DataTableWithPagination';
import FilterChips from 'components/FilterChips';
import FilterPopover from 'components/FilterPopover';
import Modals from './components/Modals';

// Styled
import { FilterRowContainer } from 'styled/common';

const AllCashgrams: React.FC = () => {
  const queryFilters: AnyObject = extractFiltersFromQuery();

  const { state, dispatch } = useList();
  const { merchantDetails, restrictionCodes } = useMerchant();

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [selectedRow, setSelectedRow] = useState<AnyObject>({});
  const [fetchCounter, setFetchCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const hasMount: boolean = useHasMount();

  const previousPage: number | undefined = usePrevious(currentPage);

  const navigate = useNavigate();
  const location = useLocation();

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

      const status: string[] = Object.keys(filters);

      const queryObj: PaginationQueryObj = {
        status: status.filter((v) => v !== 'search'),
        size: limit,
      };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = moment(startDate).format(FORMATS.DATE);
        queryObj.endDate = moment(endDate).format(FORMATS.DATE);
      }

      if (filters.search && searchBy) {
        queryObj[searchBy] = filters.search;
      }

      const [cursorKey, cursorValue]: [string, any] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getAll(queryObj);
      const countPromise = isFirstPage && getAllCount(queryObj);

      const response: any = await dataPromise;

      dispatch({
        type: COMMON_ACTION_TYPE.SET_DATA,
        payload: response,
      });

      setLoading(false);

      const countResponse: any = await countPromise;

      if (isFirstPage) {
        dispatch({
          type: COMMON_ACTION_TYPE.SET_DATA,
          payload: countResponse,
        });
      }
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter, key]);

  const handleAction =
    (row: AnyObject) => (e: React.MouseEvent, itemSelected: ACTION_TYPE) => {
      e.stopPropagation();

      switch (itemSelected) {
        case ACTION_TYPE.SEND:
        case ACTION_TYPE.DEACTIVATE:
          setSelectedRow(row);
          setModalType(itemSelected as unknown as MODAL_TYPE);
          break;

        case ACTION_TYPE.COPY:
          copyToClipboard(row.cashgram);
          break;
      }
    };

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

  const handleRowClick = (row: AnyObject) => {
    navigate(`/${PATH_BY_MENU[MENU.CASHGRAMS]}/${row.id}/details`, {
      state: { rowDetails: row },
    });
  };

  const handleFiltersChange = (
    filters: AnyObject,
    searchBy: string | undefined,
  ) => {
    dispatch({
      type: COMMON_ACTION_TYPE.SET_FILTERS,
      payload: filters,
    });
    dispatch({
      type: COMMON_ACTION_TYPE.SET_SEARCH_BY,
      payload: searchBy,
    });

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
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
    const payload: any = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
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
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      date_value: dateValue,
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
      payload: dateValue,
    });
  };

  return (
    <>
      <PageHeader embedKey="CASHGRAMS_ALL">
        {LABEL_BY_SUBMENU[SUBMENU.ALL]} {LABEL_BY_MENU[MENU.CASHGRAMS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.ALL]} ${
          LABEL_BY_MENU[MENU.CASHGRAMS]
        }`}
      />

      <Text className="my-2" color="bodyLight">
        All cashgrams including batch are shown here.{' '}
        <a
          href={KNOW_MORE.CASHGRAMS.ALL}
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
            onSelect={handleDateChange}
          />
          <FilterPopover
            config={filtersConfig}
            labelByStatus={labelByStatus}
            searchOptions={options}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips(
              { dateValue, filters, searchBy },
              options,
              labelByStatus,
            )}
            onRemove={handleRemove}
          />
        </div>
        <CanWrite code={21702}>
          <Button
            data-event-name="Primary_Button"
            primary
            onClick={() =>
              emitUserValidation(() => setModalType(MODAL_TYPE.CREATE))
            }
          >
            Create Cashgram
          </Button>
        </CanWrite>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData(
          restrictionCodes,
          merchantDetails.userType,
          handleAction,
        )}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        onRowClick={handleRowClick}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          selectedRow={selectedRow}
        />
      )}
    </>
  );
};

export default withReadPermission(AllCashgrams, {
  code: 21701,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.ALL]} ${
    LABEL_BY_MENU[MENU.CASHGRAMS]
  }`,
});
