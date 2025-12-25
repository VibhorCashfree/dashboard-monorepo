import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { Loader, Text, DateFilter } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _size from 'lodash/size';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Services
import {
  getHistoryLog,
  getHistoryLogCount,
  getHistoryLogUsers,
} from 'services/developers';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Components
import Icon from 'components/Icon';
import DataTableWithPagination from 'components/DataTableWithPagination';
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { FORMATS, DEFAULT_VALUE, DATE_RANGE_OPTIONS } from 'constants/date';
import { HISTORY_LOG, TYPE_MAP, options } from './constants';

// Utils
import Analytics from 'utils/analytics';
import { getChips } from 'utils/chips';
import { getCursor } from 'utils/pagination';
import { getFiltersConfig, getLabelByStatus } from './utils';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { BackButtonWrapper, FilterRowContainer } from 'styled/common';

const HistoryLog: React.FC = () => {
  const { type } = useParams();

  const [data, setData] = useState<AnyObject>();
  const [users, setUsers] = useState<string[]>([]);
  const [dateValue, setDateValue] = useState(DEFAULT_VALUE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [filters, setFilters] = useState<AnyObject>({});
  const [searchBy, setSearchBy] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const previousPage = usePrevious(currentPage);

  const isTypeAPIKeys: boolean = type === TYPE_MAP.API_KEYS;

  useEffect(() => {
    (async function fetchData() {
      const queryObj: PaginationQueryObj = {
        event: HISTORY_LOG[type as keyof typeof HISTORY_LOG].value,
        size: limit,
      };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = moment(startDate).format(FORMATS.START_DATE);
        queryObj.endDate = moment(endDate).format(FORMATS.END_DATE);
      }

      if (isTypeAPIKeys) {
        const userIds: string[] = Object.keys(filters);

        queryObj.userName = userIds.filter((v) => v !== 'search');

        if (filters.search && searchBy) {
          queryObj[searchBy as string] = filters.search;
        }
      }

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getHistoryLog(queryObj);
      const countPromise = isFirstPage && getHistoryLogCount(queryObj);

      const response = await dataPromise;

      setData((prev) => ({
        ...prev,
        ...response,
      }));

      setLoading(false);

      const countResponse = await countPromise;

      if (isFirstPage) {
        setData((prev) => ({
          ...prev,
          ...countResponse,
        }));
      }

      if (isTypeAPIKeys) {
        const userResponse = await getHistoryLogUsers(queryObj);

        if (!('error' in userResponse)) {
          setUsers(userResponse);
        }
      }
    })();
  }, [currentPage, limit, dateValue, filters, searchBy]);

  const handleDateChange = (dateValue: DateRangeValue) => {
    setDateValue(dateValue);
    setCurrentPage(1);

    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.DEVELOPERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.HISTORY_LOG],
      date_value: dateValue,
    });
  };

  const onPageChange = (
    type: COMMON_ACTION_TYPE.PREV | COMMON_ACTION_TYPE.NEXT,
  ) => {
    setCurrentPage((currentPage) => {
      switch (type) {
        case COMMON_ACTION_TYPE.NEXT:
          return currentPage + 1;
        case COMMON_ACTION_TYPE.PREV:
          return currentPage - 1;
        default:
          return currentPage;
      }
    });
  };

  const onLimitChange = (e: React.MouseEvent, data: { value: string }) => {
    setLimit(+data.value);
    setCurrentPage(1);

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleFiltersChange = (
    filters: AnyObject,
    searchBy: string | undefined,
  ) => {
    setFilters(filters);
    setSearchBy(searchBy);
    setCurrentPage(1);

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.DEVELOPERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.HISTORY_LOG],
      filters,
      search_by: searchBy,
    });
  };

  const handleRemove = (key: string) => {
    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.DEVELOPERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.HISTORY_LOG],
      type: 'individual',
    });

    if (key === 'RANGE') {
      setDateValue(DEFAULT_VALUE);
    } else {
      setFilters(_omit(filters, key));
    }

    setCurrentPage(1);
  };

  if (!data && isTypeAPIKeys && _size(users) === 0) {
    return <Loader active />;
  }

  const filtersConfig = users.length > 0 ? getFiltersConfig(users) : {};
  const labelByStatus = users.length > 0 ? getLabelByStatus(users) : {};

  return (
    <>
      <PageHeader embedKey="DEVELOPERS">
        <span>{LABEL_BY_MENU[MENU.DEVELOPERS]} - Payouts - </span>
        {HISTORY_LOG[type as keyof typeof HISTORY_LOG].title}{' '}
        {LABEL_BY_SUBMENU[SUBMENU.HISTORY_LOG]}
      </PageHeader>
      <MetaTags title={`${LABEL_BY_MENU[MENU.DEVELOPERS]} – Payouts`} />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>
      <FilterRowContainer>
        <div>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            options={DATE_RANGE_OPTIONS}
            onSelect={handleDateChange}
          />
          {isTypeAPIKeys && (
            <FilterPopover
              config={filtersConfig}
              labelByStatus={labelByStatus}
              searchOptions={options}
              value={filters}
              onChange={handleFiltersChange}
            />
          )}
          <FilterChips
            chips={getChips(
              { dateValue, filters, searchBy },
              options,
              labelByStatus,
            )}
            onRemove={handleRemove}
          />
        </div>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData(
          type!,
          HISTORY_LOG[type as keyof typeof HISTORY_LOG].columnDisplayName,
        )}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </>
  );
};

export default HistoryLog;
