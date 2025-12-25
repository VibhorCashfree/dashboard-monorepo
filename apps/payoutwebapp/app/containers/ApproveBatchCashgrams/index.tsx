import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from '@cashfree-intl/coherent';

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
import { MODAL_TYPE } from './constants';

// Utils
import Analytics from 'utils/analytics';
import { getCursor } from 'utils/pagination';
import { getFileName, triggerDownload, decodeFile } from 'utils/common';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

// Services
import {
  getBatches,
  getBatchesCount,
  downloadBatchReport,
} from 'services/cashgrams';

// Providers
import { useList } from 'providers/ListProvider';

// Hocs
import withReadPermission from 'hocs/withReadPermission';

// Helpers
import { getFormattedRowData } from './helpers';

// Components
import MetaTags from 'components/MetaTags';
import PageHeader from 'components/PageHeader';
import DataTableWithPagination from 'components/DataTableWithPagination';
import Modals from './components/Modals';

const ApproveBatchCashgrams: React.FC = () => {
  const { state, dispatch } = useList();

  const { limit, currentPage, data, key } = state;

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

      const queryObj: PaginationQueryObj = {
        approveBatch: true,
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
  }, [currentPage, limit, key]);

  const handleDownload = (row: AnyObject) => async (e: React.MouseEvent) => {
    e.stopPropagation();

    const response = await downloadBatchReport(row.id);

    Analytics.track(EVENTS.DOWNLOAD_REPORT, {
      section: LABEL_BY_MENU[MENU.CASHGRAMS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.APPROVE_BATCH],
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

  const onLimitChange = (e: React.MouseEvent, data: { value: string }) =>
    dispatch({
      type: COMMON_ACTION_TYPE.SET_LIMIT,
      payload: data.value,
    });

  const handleRowClick = (row: { id: string }) => {
    navigate(
      `/${PATH_BY_MENU[MENU.CASHGRAMS]}/approve-batch/${row.id}/details`,
      {
        state: {
          batchRowDetails: row,
          toBeApproved: true,
        },
      },
    );
  };

  return (
    <>
      <PageHeader embedKey="CASHGRAMS_APPROVE_BATCH">
        {LABEL_BY_SUBMENU[SUBMENU.APPROVE_BATCH]}{' '}
        {LABEL_BY_MENU[MENU.CASHGRAMS]}
      </PageHeader>
      <MetaTags
        title={`${LABEL_BY_SUBMENU[SUBMENU.APPROVE_BATCH]} ${
          LABEL_BY_MENU[MENU.CASHGRAMS]
        }`}
      />

      <Text className="my-2" color="bodyLight">
        All batch files that are pending for approval are shown here.{' '}
        <a
          href={KNOW_MORE.CASHGRAMS.APPROVE_BATCH}
          target="_blank"
          rel="noopener noreferrer"
          data-event-name="Link"
        >
          Know more
        </a>
      </Text>

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
        <Modals modalType={modalType} setModalType={setModalType} />
      )}
    </>
  );
};

export default withReadPermission(ApproveBatchCashgrams, {
  code: 21705,
  description: 'approve Batch Cashgram',
});
