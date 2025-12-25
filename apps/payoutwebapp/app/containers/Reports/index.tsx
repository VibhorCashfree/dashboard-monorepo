import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Form,
  Loader,
  Text,
  Space,
  Button,
  DateFilter,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

// Action Types
import COMMON_ACTION_TYPE from 'actionTypes/common';

// Utils
import Analytics from 'utils/analytics';
import { triggerDownload } from 'utils/common';
import { getChips } from 'utils/chips';
import { getConfigs } from './utils';

// Providers
import { useAccount } from 'providers/AccountProvider';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import CanWrite from 'components/CanWrite';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import Icon from 'components/Icon';
import Modals from './components/Modals';

// Constants
import EVENTS from 'constants/events';
import { DEFAULT_CURRENT_PAGE, DEFAULT_LIMIT } from 'constants/common';
import { DEFAULT_VALUE, FORMATS } from 'constants/date';
import { MENU, LABEL_BY_MENU } from 'constants/menuItems';
import {
  STATUS,
  REPORT_LIST,
  REFRESH_INTERVAL,
  reportsWithFundSource,
  MODAL_TYPE,
  DATE_RANGE_OPTIONS,
} from './constants';

// Hooks
import useInterval from 'hooks/useInterval';

// Services
import { getAll, downloadReport } from 'services/reports';

// Components
import DataTableWithPagination from 'components/DataTableWithPagination';

// Styled
import { FilterRowContainer, Divider } from 'styled/common';
import { getFormattedRowData } from './helpers';

// Types
import type { ReportsProps, ReportType } from './types';

const Reports: React.FC<ReportsProps> = ({ fundSources }) => {
  const { preferences } = useAccount();

  const [data, setData] = useState<TableData | undefined>(undefined);
  const [reportType, setReportType] = useState<ReportType | undefined>(
    undefined,
  );
  const [dateValue, setDateValue] = useState<DateRangeValue>(
    DATE_RANGE_OPTIONS[0],
  );
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [filters, setFilters] = useState<AnyObject>({});
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [selectedRow, setSelectedRow] = useState<AnyObject | undefined>(
    undefined,
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { labelByStatus, filtersConfig, validReportTypes } = getConfigs(
    _get(preferences, 'cashgrams.activated', false),
    fundSources,
  );

  useEffect(() => {
    (async function fetchData() {
      const status = _isEmpty(filters)
        ? REPORT_LIST.map((report) => report.type)
        : Object.keys(filters);

      const queryObj: {
        reportType: string[];
        size: number;
        pageNum: number;
        startDate?: string;
        endDate?: string;
      } = {
        reportType: status,
        size: limit,
        pageNum: currentPage,
      };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = moment(startDate).format(FORMATS.DATE);
        queryObj.endDate = moment(endDate).format(FORMATS.DATE);
      }

      setLoading(true);

      const response = await getAll(queryObj);

      if (!('error' in response)) {
        setData({
          data: response.entries,
          count: response.total,
          hasNext: response.entries.length > 0,
        });
      } else {
        setData({
          data: [],
          count: 0,
          hasNext: false,
        });
      }

      setLoading(false);
    })();
  }, [currentPage, limit, dateValue, filters, fetchCounter]);

  useInterval(async () => {
    if (!data) {
      return;
    }

    const hasProcessingStatus = data.data.some((row) =>
      [STATUS.INITIATED, STATUS.PROCESSING].includes(row.status),
    );

    if (
      !hasProcessingStatus ||
      modalType === MODAL_TYPE.GENERATE ||
      currentPage !== 1
    ) {
      return;
    }

    setFetchCounter((count: number) => count + 1);
  }, REFRESH_INTERVAL);

  const handleDelete = (row: AnyObject) => {
    setSelectedRow(row);
    setModalType(MODAL_TYPE.DELETE);
  };

  const handleDownload = async (row: AnyObject) => {
    const response = await downloadReport(row.id);

    if (!('error' in response)) {
      if (response.url) {
        triggerDownload({ type: 'URL', payload: response.url });
      }
    }

    Analytics.track(EVENTS.DOWNLOAD_REPORT, {
      section: LABEL_BY_MENU[MENU.REPORTS],
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

  const handleReportSelect = (data: {
    type: string;
    name: string;
    columns: { name: string; value: string }[];
  }) => {
    Analytics.track('Dropdown_Report_Type', {
      value: data.type,
    });

    setReportType({
      type: data.type,
      text: data.name,
      allChecked: true,
      columns: data.columns.map((column) => ({
        label: column.name,
        type: column.value,
        checked: true,
      })),
      hasFundSource: reportsWithFundSource.includes(data.type),
    });
  };

  const handleRemove = (key: string) => {
    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: LABEL_BY_MENU[MENU.REPORTS],
      type: 'individual',
    });

    if (key === 'RANGE') {
      setDateValue(DEFAULT_VALUE);
    } else {
      setFilters(_omit(filters, key));
    }

    setCurrentPage(1);
  };

  const handleFiltersChange = (filters: AnyObject) => {
    setFilters(filters);
    setCurrentPage(1);

    Analytics.track(EVENTS.APPLIED_FILTERS, {
      section: LABEL_BY_MENU[MENU.REPORTS],
      filters,
    });
  };

  const handleDateChange = (dateValue: DateRangeValue) => {
    setDateValue(dateValue);
    setCurrentPage(1);

    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.REPORTS],
      date_value: dateValue,
    });
  };

  if (loading) {
    return <Loader active />;
  }

  return (
    <>
      <PageHeader embedKey="REPORTS">{LABEL_BY_MENU[MENU.REPORTS]}</PageHeader>
      <MetaTags title={LABEL_BY_MENU[MENU.REPORTS]} />

      <CanWrite code={[21505, 26001]} remove>
        <Form>
          <Form.Group inline>
            <Form.Field>
              <Text color="bodyLight" className="mb-1">
                Report Type
              </Text>
              <Dropdown
                button
                icon={null}
                className="mr-2"
                style={{ minWidth: 328 }}
                trigger={
                  <Space justifyContent="space-between">
                    <Text>{reportType ? reportType.text : 'Select'}</Text>
                    <Icon
                      name={open ? 'chevron-up' : 'chevron-down'}
                      className="ml-1"
                    />
                  </Space>
                }
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
              >
                <DropdownMenu style={{ minWidth: 328, zIndex: 1001 }}>
                  {validReportTypes.map((report) => (
                    <DropdownItem
                      onClick={() => handleReportSelect(report)}
                      key={report.type}
                      selected={!!reportType && report.type === reportType.type}
                    >
                      <Space gap={1} direction="column">
                        <Text>{report.name}</Text>
                        <Text
                          variant="b12"
                          color="bodyLight"
                          style={{ whiteSpace: 'pre-wrap' }}
                        >
                          {report.description}
                        </Text>
                      </Space>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Form.Field>
            <Button
              data-event-name="Primary_Button"
              style={{ alignSelf: 'flex-end' }}
              primary
              onClick={() => setModalType(MODAL_TYPE.GENERATE)}
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
            options={DATE_RANGE_OPTIONS}
            onSelect={handleDateChange}
          />
          <FilterPopover
            config={filtersConfig}
            labelByStatus={labelByStatus}
            value={filters}
            onChange={handleFiltersChange}
          />
          <FilterChips
            chips={getChips({ dateValue, filters }, [], labelByStatus)}
            onRemove={handleRemove}
          />
        </div>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData(handleDownload, handleDelete)}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />

      {modalType && (
        <Modals
          configs={{ labelByStatus, filtersConfig, validReportTypes }}
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          setData={setData}
          selectedRow={selectedRow}
          reportType={reportType}
          setReportType={setReportType}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withConnect(Reports);
