import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DateFilter, Paper, Text, Space } from '@cashfree-intl/coherent';
import moment from 'moment';
import _omit from 'lodash/omit';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Constants
import { SUBMENU, LABEL_BY_SUBMENU } from 'constants/menuItems';
import EVENTS from 'constants/events';
import { DEFAULT_VALUE, FORMATS, DATE_RANGE_OPTIONS } from 'constants/date';
import { options } from './constants';

// Services
import {
  getStatement,
  getStatementCount,
  getBalance,
} from 'services/agreements';

// Helpers
import { getFormattedRowData } from './helpers';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Providers
import { ListContext } from 'providers/ListProvider';

// Utils
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import { formatAmount } from 'utils/common';

// Components
import FilterChips from 'components/FilterChips';
import DataTableWithPagination from 'components/DataTableWithPagination';

// Styled
import { Divider, BatchDetailsFilterWrapper } from 'styled/common';

const AgreementAccountDetails: React.FC = () => {
  const { state, dispatch } = useContext(ListContext);

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [loading, setLoading] = useState(false);
  const [balanceData, setBalanceData] = useState<{
    bank_account_number?: string;
    ifsc?: string;
    available_balance?: string;
  }>({});

  const hasMount = useHasMount();
  const previousPage = usePrevious(currentPage);

  const { id } = useParams();

  useEffect(() => {
    (async function fetchData() {
      setLoading(true);

      const response = await getBalance(+id!);

      if (!('error' in response)) {
        setBalanceData(response);
      }

      setLoading(false);
    })();
  }, [currentPage, limit, dateValue, filters, key]);

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
        return;
      }

      const status = Object.keys(filters);

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

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );
      queryObj[cursorKey] = cursorValue;

      const isFirstPage: boolean = currentPage === 1;
      setLoading(true);

      const dataPromise = getStatement(+id!, queryObj);
      const countPromise = isFirstPage && getStatementCount(+id!, queryObj);

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

  const handleRemove = (key: string) => {
    const isRangeFilter: boolean = key === 'RANGE';
    const type = isRangeFilter
      ? COMMON_ACTION_TYPE.SET_DATE_VALUE
      : COMMON_ACTION_TYPE.SET_FILTERS;
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_SUBMENU[SUBMENU.AGREEMENTS],
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
      section: LABEL_BY_SUBMENU[SUBMENU.AGREEMENTS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.ALL],
      dateValue,
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
      payload: dateValue,
    });
  };

  return (
    <>
      <Paper className="mt-2">
        <Space justifyContent="space-between" alignItems="center">
          <Space gap={6}>
            <div>
              <Text color="bodyLight" className="mb-1">
                Account Number
              </Text>
              <Text variant="h16">
                {balanceData.bank_account_number || '–'}
              </Text>
            </div>
            <div>
              <Text color="bodyLight" className="mb-1">
                IFSC Code
              </Text>
              <Text variant="h16">{balanceData.ifsc || '–'}</Text>
            </div>
          </Space>
          <Space gap={4}>
            <div>
              <Text color="bodyLight" className="mb-1">
                Available Balance
              </Text>
              <Text variant="h16">
                {formatAmount(balanceData.available_balance)}
              </Text>
            </div>
          </Space>
        </Space>

        <Divider />

        <div className="mt-2">
          <Text variant="h16" strong className="my-3">
            Statements
          </Text>
          <BatchDetailsFilterWrapper>
            <DateFilter
              rangeSize={31}
              value={dateValue}
              options={DATE_RANGE_OPTIONS}
              onSelect={handleDateChange}
            />
            <FilterChips
              chips={getChips({ dateValue, filters, searchBy }, options)}
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
          />
        </div>
      </Paper>
    </>
  );
};

export default AgreementAccountDetails;
