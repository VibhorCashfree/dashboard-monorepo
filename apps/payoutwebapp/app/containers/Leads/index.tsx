import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Loader, Text, Button } from '@cashfree-intl/coherent';
import _keyBy from 'lodash/keyBy';
import _omit from 'lodash/omit';

// Components
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import CanWrite from 'components/CanWrite';
import DataTableWithPagination from 'components/DataTableWithPagination';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';

// Hooks
import usePrevious from 'hooks/usePrevious';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Services
import { getAllLeads, getAllLeadsCount } from 'services/fundSources';

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import { labelByStatus, filtersConfig, ADD_LEAD_FORM } from './constants';

// Utils
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer } from 'styled/common';

// Types
import type { LeadsProps } from './types';

const Leads: React.FC<LeadsProps> = ({ fundSources }) => {
  const [data, setData] = useState<AnyObject>();
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [filters, setFilters] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    (async function fetchData() {
      const status: string[] = Object.keys(filters);

      const queryObj: PaginationQueryObj = {
        status: status.filter((v) => v !== 'search'),
        size: limit,
      };

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getAllLeads(queryObj);
      const countPromise = isFirstPage && getAllLeadsCount(queryObj);

      let response: any = await dataPromise;

      response = response.error ? { data: [], hasNext: false } : response;

      setData((prev) => ({
        ...prev,
        ...response,
      }));

      setLoading(false);

      const countResponse: any = await countPromise;

      if (isFirstPage) {
        setData((prev) => ({
          ...prev,
          ...countResponse,
        }));
      }
    })();
  }, [filters, currentPage, limit]);

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

  const handleFiltersChange = (filters: AnyObject) => {
    setFilters(filters);

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.LEADS],
      filters,
    });
  };

  const handleRemove = (key: string) => {
    setFilters(_omit(filters, key));

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.FUND_SOURCES],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.LEADS],
      type: 'individual',
    });
  };

  if (loading) {
    return <Loader active />;
  }

  const fundSourceById = _keyBy(fundSources, 'fundSourceId');

  return (
    <>
      <PageHeader>{LABEL_BY_SUBMENU[SUBMENU.LEADS]}</PageHeader>
      <MetaTags title={LABEL_BY_SUBMENU[SUBMENU.LEADS]} />

      <Text className="my-2" color="bodyLight">
        Cashfree shall help you in opening a bank account along with getting
        APIs enabled on them. This shall help you to do disbursals in real time,
        view balance from your bank account.
      </Text>

      <FilterRowContainer className="pt-3">
        <div>
          <FilterPopover
            config={filtersConfig}
            labelByStatus={labelByStatus}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ filters }, [], labelByStatus)}
            onRemove={handleRemove}
          />
        </div>

        <CanWrite code={27003} remove>
          <Button
            data-event-name="Primary_Button"
            primary
            onClick={() => window.open(ADD_LEAD_FORM, '_blank')}
          >
            Add Lead
          </Button>
        </CanWrite>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData(fundSourceById)}
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

export default withConnect(Leads);
