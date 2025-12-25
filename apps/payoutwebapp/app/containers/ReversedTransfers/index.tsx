import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Loader, Text, Button, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';

// Action Types
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
import { DEFAULT_VALUE, FORMATS, DATE_RANGE_OPTIONS } from 'constants/date';
import { KNOW_MORE } from 'constants/urls';
import { options } from './constants';

// Providers
import { ListContext } from 'providers/ListProvider';

// Utils
import Analytics from 'utils/analytics';
import { arrayToCsv, triggerDownload } from 'utils/common';
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Services
import { getAllReversed, getAllReversedCount } from 'services/transfers';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import DataTableWithPagination from 'components/DataTableWithPagination';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer } from 'styled/common';

const ReversedTransfers: React.FC = () => {
  const { state, dispatch } = useContext(ListContext);

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [loading, setLoading] = useState(false);

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
        return;
      }

      const queryObj: PaginationQueryObj = {
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

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getAllReversed(queryObj);
      const countPromise = isFirstPage && getAllReversedCount(queryObj);

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
  }, [currentPage, limit, dateValue, filters, key]);

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

  const handleRowClick = (row: { referenceId: string }) => {
    navigate(`/${PATH_BY_MENU[MENU.TRANSFERS]}/${row.referenceId}/details`, {
      state: { rowDetails: row },
    });
  };

  const handleExport = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const csvContent = arrayToCsv(data!.data);

    triggerDownload({ type: 'DATA', payload: csvContent }, 'report.csv');
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
      section: LABEL_BY_MENU[MENU.TRANSFERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.REVERSED],
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
      section: LABEL_BY_MENU[MENU.TRANSFERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.REVERSED],
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
      sub_section: LABEL_BY_SUBMENU[SUBMENU.REVERSED],
      date_value: dateValue,
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
      payload: dateValue,
    });
  };

  if (!data) {
    return <Loader active page={false} />;
  }

  const disabled = data.data.length === 0;

  return (
    <>
      <PageHeader embedKey="TRANSFERS_REVERSED">
        {LABEL_BY_SUBMENU[SUBMENU.REVERSED]} {LABEL_BY_MENU[MENU.TRANSFERS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.REVERSED]} ${
          LABEL_BY_MENU[MENU.TRANSFERS]
        }`}
      />

      <Text className="my-2" color="bodyLight">
        All transfers that are reversed are shown here.{' '}
        <a
          href={KNOW_MORE.TRANSFERS.REVERSED}
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
            searchOptions={options}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ dateValue, filters, searchBy }, options)}
            onRemove={handleRemove}
          />
        </div>
        <Button
          data-event-name="Primary_Button"
          primary
          disabled={disabled}
          onClick={handleExport}
        >
          Export
        </Button>
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
    </>
  );
};

export default withReadPermission(ReversedTransfers, {
  code: 21007,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.REVERSED]} ${
    LABEL_BY_MENU[MENU.TRANSFERS]
  }`,
});
