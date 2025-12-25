import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, Button, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';
import _keys from 'lodash/keys';
import _without from 'lodash/without';
import _identity from 'lodash/identity';
import _difference from 'lodash/difference';

// Components
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Modals from './components/Modals';
import PaginatedTable from 'components/PaginatedTable';

// Constants
import EVENTS from 'constants/analytics';
import { KNOW_MORE } from 'constants/urls';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { DEFAULT_VALUE, FORMATS, DATE_OPTIONS, MIN_DATE } from 'constants/date';
import {
  filtersConfig,
  labelByStatus,
  options,
  TAX_PAYER_TYPE,
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
import { getAll, getAllCount } from 'services/GSTIN';

// Styled
import { FilterRowContainer } from 'styled/common';

// Utils
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import { formatFiltersFromQuery } from 'utils/common';

const AllGSTIN = () => {
  const queryFilters = formatFiltersFromQuery();
  const [dateValue, setDateValue] = useState(DEFAULT_VALUE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [data, setData] = useState();
  const [filters, setFilters] = useState({});
  const [searchBy, setSearchBy] = useState();
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

    const { range, statuses } = queryFilters;

    setDateValue({
      displayText: 'Custom',
      range: range.map(date => new Date(date)),
    });

    setFilters(statuses);
  }, []);

  useEffect(() => {
    (async function fetchData() {
      if ((hasMount && data) || !_isEmpty(queryFilters)) {
        return;
      }
      const status = _without(
        _keys(filters),
        'search',
        ..._keys(TAX_PAYER_TYPE),
      );

      const taxPayerType = _difference(_keys(filters), status)
        .map(v => TAX_PAYER_TYPE[v])
        .filter(_identity);

      const queryObj = {
        status,
        taxPayerType,
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

      setData(prev => ({
        ...prev,
        ...response,
      }));

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        setData(prev => ({
          ...prev,
          ...countResponse,
        }));
      }
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = [...COLUMN_ID];

  const onPageChange = type => {
    setCurrentPage(currentPage => {
      switch (type) {
        case 'NEXT':
          return currentPage + 1;

        case 'PREV':
          return currentPage - 1;

        default:
      }
    });
  };

  const onLimitChange = (e, data) => {
    setLimit(+data.value);
    setCurrentPage(1);

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRemove = key => {
    if (key === 'RANGE') {
      setDateValue(DEFAULT_VALUE);
    } else {
      setFilters(_omit(filters, key));
    }

    setCurrentPage(1);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'All',
      sub_section: 'All',
      type: 'individual',
    });
  };

  const handleFiltersChange = (filters, searchBy) => {
    setFilters(filters);
    setSearchBy(searchBy);
    setCurrentPage(1);

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'GSTIN',
      sub_section: 'All',
      filters,
      search_by: searchBy,
    });
  };

  const handleDateChange = dateValue => {
    setDateValue(dateValue);
    setCurrentPage(1);

    Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
      section: 'GSTIN',
      sub_section: 'All',
      date_value: dateValue,
    });
  };

  const handleRowClick = row => {
    const rowDetails = _find(data.data, { id: row.referenceId });

    Analytics.track(EVENTS.TABLE_ROW, {
      section: 'GSTIN',
      sub_section: 'All',
      row_id: row.referenceId,
    });

    navigate(`/gstIn/${row.referenceId}/details`, {
      state: { rowDetails },
    });
  };

  return (
    <>
      <Text className="my-2" color="bodyLight">
        GSTIN and the verification statuses are shown here.{' '}
        <a
          href={KNOW_MORE.BAV.VERIFY_GSTIN}
          target="_blank"
          data-event-name="Link"
        >
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
            searchOptions={options}
            labelByStatus={labelByStatus}
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
          onClick={() => {
            setModalType(MODAL_TYPES.VERIFY);
          }}
          data-event-name="Primary_Button"
        >
          Verify GSTIN
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

export default AllGSTIN;
