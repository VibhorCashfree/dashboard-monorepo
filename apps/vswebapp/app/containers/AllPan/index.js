import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, Button, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import _keys from 'lodash/keys';
import _without from 'lodash/without';
import _identity from 'lodash/identity';
import _difference from 'lodash/difference';
import _isEmpty from 'lodash/isEmpty';

// Constants
import EVENTS from 'constants/analytics';
import { DEFAULT_VALUE, FORMATS, DATE_OPTIONS, MIN_DATE } from 'constants/date';
import { KNOW_MORE } from 'constants/urls';
import {
  TAB_KEY,
  filtersConfig,
  labelByStatus,
  options,
  PAN_TYPES,
  extraChipConfig,
  MODAL_TYPES,
  COLUMN_ID,
} from './constants';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Helpers
import { formattedDate } from 'helpers/common';

// Services
import { getAll, getAllCount } from 'services/PAN';

// Utils
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { formatFiltersFromQuery } from 'utils/common';

// Providers
import { ListContext } from 'providers/ListProvider';

// Components
import FilterChips from 'components/FilterChips';
import FilterPopover from 'components/FilterPopover';
import Modals from './components/Modals';
import PaginatedTable from 'components/PaginatedTable';

// Styled
import { FilterRowContainer } from 'styled/common';

const AllPAN = () => {
  const queryFilters = formatFiltersFromQuery();
  const { state, dispatch } = useContext(ListContext);

  const {
    dateValue,
    limit,
    currentPage,
    data,
    filters,
    searchBy,
    reset,
    key,
  } = state;

  const [modalType, setModalType] = useState();
  const [fetchCounter, setFetchCounter] = useState(0);
  const [loading, setLoading] = useState(false);

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (_isEmpty(queryFilters)) {
      return;
    }

    navigate(location.pathname, { replace: true });

    dispatch({ type: 'QUERY_FILTERS', key: TAB_KEY, payload: queryFilters });
  }, []);

  useEffect(() => {
    if (hasMount) {
      return;
    }

    dispatch({
      type: 'RESET',
      key: TAB_KEY,
    });
  }, [fetchCounter]);

  useEffect(() => {
    (async function fetchData() {
      if ((hasMount && data) || !_isEmpty(queryFilters)) {
        return;
      }

      const status = _without(_keys(filters), 'search', ..._keys(PAN_TYPES));

      const type = _difference(_keys(filters), status)
        .map(v => PAN_TYPES[v])
        .filter(_identity);

      const queryObj = {
        status,
        type,
        size: limit,
      };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = formattedDate(
          startDate,
          FORMATS.DATE_WITHOUT_TIME,
        );
        queryObj.endDate = formattedDate(endDate, FORMATS.DATE_WITHOUT_TIME);
      }

      if (filters.search) {
        queryObj[searchBy] = filters.search;
      }

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage = currentPage === 1;

      setLoading(true);

      const dataPromise = getAll(queryObj);
      const countPromise = isFirstPage && getAllCount(queryObj);

      const response = await dataPromise;

      dispatch({
        type: 'SET_DATA',
        key: TAB_KEY,
        payload: response,
      });

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        dispatch({
          type: 'SET_DATA',
          key: TAB_KEY,
          payload: countResponse,
        });
      }
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter, reset, key]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = [...COLUMN_ID];

  const onPageChange = type =>
    dispatch({ type: 'SET_CURRENT_PAGE', key: TAB_KEY, payload: type });

  const onLimitChange = (e, data) => {
    dispatch({ type: 'SET_LIMIT', key: TAB_KEY, payload: data.value });

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRowClick = row => {
    const rowDetails = _find(data.data, { id: row.id });

    Analytics.track(EVENTS.TABLE_ROW, {
      section: 'PAN',
      sub_section: 'All',
      row_id: row.id,
    });

    navigate(`/pan/${row.id}/details`, {
      state: { rowDetails },
    });
  };

  const handleFiltersChange = (filters, searchBy) => {
    dispatch({ type: 'SET_FILTERS', key: TAB_KEY, payload: filters });
    dispatch({ type: 'SET_SEARCH_BY', key: TAB_KEY, payload: searchBy });

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'PAN',
      sub_section: 'All',
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = key => {
    const isRangeFilter = key === 'RANGE';

    const type = isRangeFilter ? 'SET_DATE_VALUE' : 'SET_FILTERS';
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'PAN',
      sub_section: 'All',
      type: 'individual',
    });

    dispatch({
      type,
      key: TAB_KEY,
      payload,
    });
  };

  const handleDateChange = dateValue => {
    dispatch({ type: 'SET_DATE_VALUE', key: TAB_KEY, payload: dateValue });

    Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
      section: 'PAN',
      sub_section: 'All',
      date_value: dateValue,
    });
  };

  return (
    <>
      <Text className="my-2" color="bodyLight">
        PAN verification statuses are shown here.{' '}
        <a href={KNOW_MORE.PAN.ALL} target="_blank" data-event-name="Link">
          Know more
        </a>
      </Text>
      <FilterRowContainer>
        <div>
          <DateFilter
            min={MIN_DATE}
            rangeSize={31}
            value={dateValue}
            options={DATE_OPTIONS}
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
              extraChipConfig,
            )}
            onRemove={handleRemove}
          />
        </div>
        <Button
          primary
          data-event-name="Primary_Button"
          onClick={() => {
            setModalType(MODAL_TYPES.VERIFY);
          }}
        >
          Verify PAN
        </Button>
      </FilterRowContainer>

      <PaginatedTable
        data={rowData}
        limit={limit}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        tableHeading={FORMATTED_COLUMN_ID}
        fetching={loading}
        onRowClick={handleRowClick}
        {...paginationInfo}
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

export default AllPAN;
