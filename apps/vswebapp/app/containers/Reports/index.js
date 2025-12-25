import React, { useState, useEffect, useContext } from 'react';
import { Text, Button, DateFilter, Form } from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _get from 'lodash/get';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useInterval from 'hooks/useInterval';

// Services
import { getReports, downloadReport } from 'services/reports';

// Components
import Loader from 'components/Loader';
import CanWrite from 'components/CanWrite';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Modals from './components/Modals';
import ReportDropdown from './ReportDropdown';
import PaginatedTable from 'components/PaginatedTable';
import GenerateReportModal from 'containers/Reports/components/GenerateReportModal';

// Constants
import EVENTS from 'constants/analytics';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { DEFAULT_VALUE, DATE_OPTIONS } from 'constants/date';
import { REFRESH_INTERVAL, MODAL_TYPES } from './constants';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Utils
import { getPaginationInfo } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import { triggerDownload } from 'utils/common';
import { getConfigs } from './utils';

// Helpers
import { getQuery, getFormattedData } from './helpers';

// Styled
import { FilterRowContainer, Divider } from 'styled/common';

const Reports = () => {
  const { preferences } = useContext(AccountContext);

  const [data, setData] = useState({});
  const [reportType, setReportType] = useState();
  const [dateValue, setDateValue] = useState(DEFAULT_VALUE);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [filters, setFilters] = useState({});
  const [modalType, setModalType] = useState();
  const [fetchCounter, setFetchCounter] = useState(0);
  const [selectedRow, setSelectedRow] = useState();

  const previousPage = usePrevious(currentPage);

  const { labelByStatus, filtersConfig, validReportTypes } = getConfigs(
    _get(preferences, 'activated'),
  );

  useEffect(() => {
    (async function fetchData() {
      const queryObj = getQuery(filters, dateValue, limit + 1);

      queryObj.pageNum = currentPage;

      const response = await getReports(queryObj);

      if (!response.error) {
        const totalPages = Math.ceil(response?.entries?.length / limit) || 1;
        const hasNext = currentPage < totalPages;

        setData({
          data: response.entries,
          count: response.total,
          hasNext,
        });
      }
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter]);

  useInterval(async () => {
    if (modalType === 'GENERATE' || currentPage !== 1) {
      return;
    }

    setFetchCounter(count => count + 1);
  }, REFRESH_INTERVAL);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

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

  const handleDelete = row => {
    setSelectedRow(row);
    setModalType(MODAL_TYPES.DELETE);
  };

  const handleDownload = async row => {
    const response = await downloadReport(row.id);

    Analytics.track(EVENTS.DOWNLOAD_REPORT, {
      section: 'REPORTS',
    });

    if (response.url) {
      triggerDownload({ type: 'URL', payload: response.url });
    }
  };

  const handleReportSelect = data => {
    Analytics.track('Dropdown_ReportType', {
      value: data.type,
    });

    setReportType({
      type: data.type,
      text: data.name,
      allChecked: true,
      columns: data.columns.map(column => ({
        label: column.name,
        type: column.value,
        checked: true,
      })),
    });
  };

  const handleRemove = key => {
    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'REPORTS',
      type: 'individual',
    });

    if (key === 'RANGE') {
      setDateValue(DEFAULT_VALUE);
    } else {
      setFilters(_omit(filters, key));
    }

    setCurrentPage(1);
  };

  const FORMATTED_COLUMN_ID = getFormattedData(handleDownload, handleDelete);

  const handleFiltersChange = filters => {
    setFilters(filters);
    setCurrentPage(1);

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'REPORTS',
      filters,
    });
  };

  const handleDateChange = dateValue => {
    setDateValue(dateValue);
    setCurrentPage(1);

    Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
      section: 'REPORTS',
      date_value: dateValue,
    });
  };

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <CanWrite code={[21505, 26001]} remove>
        <Form>
          <Form.Group inline>
            <Form.Field>
              <Text color="bodyLight" className="mb-1">
                Report Type
              </Text>
              <ReportDropdown
                reportType={reportType}
                validReportTypes={validReportTypes}
                handleReportSelect={handleReportSelect}
              />
            </Form.Field>
            <Button
              style={{ alignSelf: 'flex-end' }}
              primary
              data-event-name="Primary_Button"
              onClick={() => setModalType(MODAL_TYPES.GENERATE)}
              disabled={!reportType}
            >
              Generate Report
            </Button>
          </Form.Group>
        </Form>

        <Divider contain />
      </CanWrite>

      <Text variant="h16" className="m-0">
        Generated Reports
      </Text>
      <FilterRowContainer>
        <div>
          <DateFilter
            rangeSize={31}
            value={dateValue}
            options={DATE_OPTIONS}
            onSelect={handleDateChange}
          />
          <FilterPopover
            config={filtersConfig}
            labelByStatus={labelByStatus}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ dateValue, filters }, null, labelByStatus)}
            onRemove={handleRemove}
          />
        </div>
      </FilterRowContainer>

      <PaginatedTable
        data={rowData}
        limit={limit}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        tableHeading={FORMATTED_COLUMN_ID}
        {...paginationInfo}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          setData={setData}
          selectedRow={selectedRow}
          reportType={reportType}
          setReportType={setReportType}
          labelByStatus={labelByStatus}
        />
      )}
    </>
  );
};

export default Reports;
