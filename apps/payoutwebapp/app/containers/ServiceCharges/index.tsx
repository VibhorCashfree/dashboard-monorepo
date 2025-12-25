import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, DateFilter } from '@cashfree-intl/coherent';
import moment from 'moment';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Providers
import { useDetails } from 'containers/FundSourceDetails/providers';

// Components
import DataTableWithPagination from 'components/DataTableWithPagination';

// Services
import {
  getServiceCharges,
  getServiceChargesCount,
} from 'services/fundSources';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { FORMATS } from 'constants/date';
import { DATE_RANGE_OPTIONS } from './constants';

// Utils
import Analytics from 'utils/analytics';
import { getCursor } from 'utils/pagination';
import { extractFiltersFromQuery } from 'utils/common';
import FundSourcesUtil from 'utils/fundSources';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer } from 'styled/common';

// Types
import type { ServiceChargesProps } from './types';

const ServiceCharges: React.FC<ServiceChargesProps> = ({ fundSources }) => {
  const { details } = useDetails();

  const [data, setData] = useState<AnyObject>();
  const [dateValue, setDateValue] = useState<DateRangeValue>(() => {
    const queryFilters = extractFiltersFromQuery();

    if (queryFilters.range) {
      return {
        displayText: 'Custom',
        range: queryFilters.range.map((date: string) => new Date(date)),
      };
    }

    return DATE_RANGE_OPTIONS[1];
  });
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [loading, setLoading] = useState(false);

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async function fetchData() {
      navigate(location.pathname, { replace: true });

      const queryObj: PaginationQueryObj = {
        size: limit,
      };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = moment(startDate).format(FORMATS.START_DATE);
        queryObj.endDate = moment(endDate).format(FORMATS.END_DATE);
      }

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getServiceCharges(details.fundSourceId, queryObj);
      const countPromise =
        isFirstPage && getServiceChargesCount(details.fundSourceId, queryObj);

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
    })();
  }, [currentPage, limit, dateValue]);

  const onPageChange = (
    type: COMMON_ACTION_TYPE.PREV | COMMON_ACTION_TYPE.NEXT,
  ) => {
    setCurrentPage((currentPage: number) => {
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

  const handleDateChange = (dateValue: DateRangeValue) => {
    setDateValue(dateValue);
    setCurrentPage(1);

    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.SERVICE_CHARGES],
      date_value: dateValue,
    });
  };

  const fsPreferences = FundSourcesUtil.getPreferences(
    fundSources,
    details.fundSourceId,
  );

  return (
    <>
      <Text className="my-2" color="bodyLight">
        We automatically debit the service charges from this fund source
        {fsPreferences.CONNECTED_CHARGES_DEBIT_FREQUENCY} for the transfers you
        made.
      </Text>

      <FilterRowContainer>
        <div>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            options={DATE_RANGE_OPTIONS}
            onSelect={handleDateChange}
          />
        </div>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData()}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withConnect(ServiceCharges);
