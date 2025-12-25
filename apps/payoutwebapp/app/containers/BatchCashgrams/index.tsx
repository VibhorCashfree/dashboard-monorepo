import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Button,
  DateFilter,
  SampleFileDropdown,
} from '@cashfree-intl/coherent';
import moment from 'moment';
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
import { KNOW_MORE } from 'constants/urls';
import { DEFAULT_VALUE, FORMATS, DATE_RANGE_OPTIONS } from 'constants/date';
import { filtersConfig, labelByStatus, options, MODAL_TYPE } from './constants';

// Services
import {
  getBatches,
  getBatchesCount,
  downloadBatchReport,
} from 'services/cashgrams';
import { getSampleFile } from 'services/misc';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Utils
import { getCursor } from 'utils/pagination';
import { getChips } from 'utils/chips';
import Analytics from 'utils/analytics';
import {
  getFileName,
  triggerDownload,
  emitUserValidation,
  decodeFile,
} from 'utils/common';

// Providers
import { useAccount } from 'providers/AccountProvider';
import { useList } from 'providers/ListProvider';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import CanWrite from 'components/CanWrite';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import DataTableWithPagination from 'components/DataTableWithPagination';
import Modals from './components/Modals';

// Helpers
import { getFormattedRowData } from './helpers';

// Styled
import { FilterRowContainer } from 'styled/common';

const BatchCashgrams: React.FC = () => {
  const { preferences } = useAccount();
  const { state, dispatch } = useList();

  const { dateValue, limit, currentPage, data, filters, searchBy, key } = state;

  const [fetchCounter, setFetchCounter] = useState(0);
  const [modalType, setModalType] = useState<MODAL_TYPE>(MODAL_TYPE.EMPTY);
  const [loading, setLoading] = useState(false);

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
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

      const [cursorKey, cursorValue] = getCursor(
        data as TableData,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage: boolean = currentPage === 1;

      setLoading(true);

      const dataPromise = getBatches(queryObj);
      const countPromise = isFirstPage && getBatchesCount(queryObj);

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
  }, [currentPage, limit, dateValue, filters, fetchCounter, key]);

  const handleDownload = (row: AnyObject) => async (e: React.MouseEvent) => {
    e.stopPropagation();

    const response = await downloadBatchReport(row.id);

    Analytics.track(EVENTS.DOWNLOAD_REPORT, {
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
    });

    if (!('error' in response)) {
      if (response.fileUrl) {
        triggerDownload({ type: 'URL', payload: response.fileUrl });
      } else {
        triggerDownload(
          { type: 'DATA', payload: decodeFile(response.file) },
          getFileName(row.fileName, row.id, row.status),
        );
      }
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
    navigate(`/${PATH_BY_MENU[MENU.CASHGRAMS]}/batch/${row.id}/details`, {
      state: { batchRowDetails: row },
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
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      type: 'individual',
    });

    dispatch({
      type,
      payload,
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
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
    });
  };

  const handleDateChange = (dateValue: DateRangeValue) => {
    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      date_value: dateValue,
    });

    dispatch({
      type: COMMON_ACTION_TYPE.SET_DATE_VALUE,
      payload: dateValue,
    });
  };

  const downloadSampleFile = async (type: string) => {
    const queryObj = {
      fileType: 'BULK_CASHGRAM',
      type,
    };

    const response = await getSampleFile(queryObj);

    Analytics.track(EVENTS.DOWNLOAD_SAMPLE, {
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.BATCH],
      ...queryObj,
    });

    if (!('error' in response)) {
      triggerDownload({ type: 'URL', payload: response.fileUrl });
    }
  };

  return (
    <>
      <PageHeader embedKey="CASHGRAMS_BATCH">
        {LABEL_BY_SUBMENU[SUBMENU.BATCH]} {LABEL_BY_MENU[MENU.CASHGRAMS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.BATCH]} ${
          LABEL_BY_MENU[MENU.CASHGRAMS]
        }`}
      />

      <Text className="my-2" color="bodyLight">
        All batch files are shown here.{' '}
        <a
          href={KNOW_MORE.CASHGRAMS.BATCH}
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
        <CanWrite code={21704}>
          {preferences.cashgrams.upload && (
            <div>
              <SampleFileDropdown
                className="mr-2"
                onDownloadClick={downloadSampleFile}
              />
              <Button
                data-event-name="Primary_Button"
                primary
                className="ml-4"
                onClick={() =>
                  emitUserValidation(() => setModalType(MODAL_TYPE.UPLOAD))
                }
              >
                Upload File
              </Button>
            </div>
          )}
        </CanWrite>
      </FilterRowContainer>

      <DataTableWithPagination
        loading={loading}
        limit={limit}
        currentPage={currentPage}
        data={data}
        columns={getFormattedRowData(handleDownload)}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        onRowClick={handleRowClick}
      />

      {modalType && (
        <Modals
          modalType={modalType}
          setModalType={setModalType}
          setFetchCounter={setFetchCounter}
          downloadSampleFile={downloadSampleFile}
        />
      )}
    </>
  );
};

export default withReadPermission(BatchCashgrams, {
  code: 21706,
  description: `access ${LABEL_BY_SUBMENU[SUBMENU.BATCH]} ${
    LABEL_BY_MENU[MENU.CASHGRAMS]
  }`,
});
