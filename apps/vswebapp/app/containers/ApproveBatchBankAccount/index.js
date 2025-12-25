import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Text, Popup } from '@cashfree-intl/coherent';
import _find from 'lodash/find';

// Constants
import EVENTS from 'constants/analytics';
import { KNOW_MORE } from 'constants/urls';
import { TAB_KEY, COLUMN_ID } from './constants';

// Providers
import { ListContext } from 'providers/ListProvider';

// Components
import Icon from 'components/Icon';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Utils
import Analytics from 'utils/analytics';
import { getPaginationInfo, getCursor } from 'utils/pagination';
import { getFileName, triggerDownload, decodeFile } from 'utils/common';

// Services
import { getBatches, getBatchesCount, downloadBatchReport } from 'services/bav';

// Styled
import { Action } from 'styled/common';
import PaginatedTable from 'components/PaginatedTable';

const ApproveBatchBankAccount = () => {
  const [loading, setLoading] = useState(false);

  const { state, dispatch } = useContext(ListContext);

  const { limit, currentPage, data, key } = state;

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      if (hasMount && data) {
        return;
      }

      const queryObj = {
        isApprovalBatch: true,
        size: limit,
      };

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      const isFirstPage = currentPage === 1;

      setLoading(true);

      const dataPromise = getBatches(queryObj);
      const countPromise = isFirstPage && getBatchesCount(queryObj);

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
  }, [currentPage, limit, key]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = [
    ...COLUMN_ID,
    {
      accessorKey: 'action',
      header: '',
      cell: row => (
        <Space justifyContent="flex-end" className="pr-2">
          <Popup
            content="Download Report"
            trigger={
              <Action onClick={handleDownload(row)}>
                <Icon role="download" name="download" />
              </Action>
            }
          />
        </Space>
      ),
    },
  ];

  const onPageChange = type =>
    dispatch({ type: 'SET_CURRENT_PAGE', key: TAB_KEY, payload: type });

  const onLimitChange = (e, data) => {
    dispatch({ type: 'SET_LIMIT', key: TAB_KEY, payload: data.value });

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const handleRowClick = row => {
    const batchRowDetails = _find(data.data, { id: row.id });

    Analytics.track(EVENTS.TABLE_ROW, {
      section: 'BAV',
      sub_section: 'Approve Batch',
      fileName: batchRowDetails.filename,
      rowId: row.id,
    });

    navigate(`/bav/batch/${row.id}/details`, {
      state: {
        batchRowDetails,
        toBeApproved: true,
      },
    });
  };

  const handleDownload = row => async e => {
    e.stopPropagation();

    setLoading(true);

    const response = await downloadBatchReport(row.id, row.status);

    Analytics.track(EVENTS.DOWNLOAD_REPORT, {
      section: 'BAV',
      sub_section: 'Approve Batch',
    });

    if (!response.error) {
      if (response.fileUrl) {
        triggerDownload({ type: 'URL', payload: response.fileUrl });
      } else {
        triggerDownload(
          { type: 'DATA', payload: decodeFile(response.file) },
          getFileName(row.filename, row.id, row.status),
        );
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Text className="my-2" color="bodyLight">
        All batch files that are pending for approval are shown here.{' '}
        <a
          href={KNOW_MORE.BAV.APPROVE_BATCH}
          target="_blank"
          data-event-name="Link"
        >
          Know more
        </a>
      </Text>

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
    </>
  );
};

export default ApproveBatchBankAccount;
