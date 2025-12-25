import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Space,
  DateFilter,
  Icon as CoherentIcon,
  Popup,
  Toggle,
  Text,
  Card,
  ConfirmModal,
} from '@cashfree-intl/coherent';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _startCase from 'lodash/startCase';
import _capitalize from 'lodash/capitalize';
import _isEmpty from 'lodash/isEmpty';
import _pick from 'lodash/pick';

// Components
import Icon from 'components/Icon';
import FilterPopover from 'components/FilterPopover';
import FilterChips from 'components/FilterChips';
import PaginatedTable from 'components/PaginatedTable';

// Containers
import Modals from 'containers/ModalsKycLink';

// Constants
import EVENTS from 'constants/analytics';
import { DATE_OPTIONS, DEFAULT_VALUE, FORMATS } from 'constants/date';
import {
  filtersConfig,
  labelByStatus,
  options,
  TAB_KEY,
  COLUMN_ID,
} from './constants';
import { MODAL_TYPES } from 'containers/ModalsKycLink/constants';

// Styled
import { FilterRowContainer, Action } from 'styled/common';

// Providers
import { ListContext } from 'providers/ListProvider';
import { AccountContext } from 'providers/AccountProvider';

// Utils
import Analytics from 'utils/analytics';
import { emitUserValidation, formatFiltersFromQuery } from 'utils/common';
import { getChips } from 'utils/chips';
import { getCursor, getPaginationInfo } from 'utils/pagination';

// Services
import {
  getRole,
  getRoleCount,
  getRoleStatus,
  enableRole,
  deleteRole,
} from 'services/vkyc';

// Helpers
import { formattedDate } from 'helpers/common';

// Hooks
import usePrevious from 'hooks/usePrevious';
import useHasMount from 'hooks/useHasMount';

const AllAuditor = ({ parentFetchCounter, addSpecificRole }) => {
  const queryFilters = formatFiltersFromQuery();

  const [modalType, setModalType] = useState();
  const [loading, setLoading] = useState(false);
  const [fetchCounter, setFetchCounter] = useState(0);
  const [stats, setStats] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [auditorToDelete, setAuditorToDelete] = useState(null);

  const navigate = useNavigate();
  const { preferences } = useContext(AccountContext);
  const { state, dispatch } = useContext(ListContext);

  const {
    dateValue,
    limit,
    currentPage,
    filters,
    searchBy,
    key,
    data,
    reset,
  } = state;

  const hasMount = useHasMount();

  const previousPage = usePrevious(currentPage);

  useEffect(() => {
    if (hasMount) {
      return;
    }

    dispatch({
      type: 'RESET',
      key: TAB_KEY,
    });
  }, [fetchCounter]);

  useEffect(() => {
    (async function fetchData() {
      if ((hasMount && data) || !_isEmpty(queryFilters)) {
        return;
      }

      console.log('reached auditor');

      const status = Object.keys(filters);

      const queryObj = {
        status: status.filter(v => v !== 'search'),
        size: limit,
        role: 'AUDITOR',
      };

      if (filters.search) {
        queryObj[searchBy] = filters.search;
      }

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        queryObj.startDate = formattedDate(
          startDate,
          FORMATS.DATE_WITHOUT_TIME,
        );
        queryObj.endDate = formattedDate(endDate, FORMATS.DATE_WITHOUT_TIME);
      }

      const isFirstPage = currentPage === 1;

      const [cursorKey, cursorValue] = getCursor(
        data,
        previousPage,
        currentPage,
      );

      queryObj[cursorKey] = cursorValue;

      setLoading(true);

      const queryWithoutRange = _omit(queryObj, 'startDate', 'endDate');

      const statsPromise = getRoleStatus(queryObj);
      const dataPromise = getRole(queryWithoutRange);
      const countPromise = isFirstPage && getRoleCount(queryWithoutRange);

      const response = await dataPromise;
      const statsResponse = await statsPromise;

      dispatch({
        type: 'SET_DATA',
        key: TAB_KEY,
        payload: response,
      });

      if (!statsResponse.error) {
        setStats(statsResponse?.statusCounts);
      }

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
  }, [
    currentPage,
    limit,
    dateValue,
    filters,
    fetchCounter,
    key,
    reset,
    parentFetchCounter,
  ]);

  const { rowData, ...paginationInfo } = getPaginationInfo(data, currentPage);

  const FORMATTED_COLUMN_ID = [
    ...COLUMN_ID,
    {
      accessorKey: 'action',
      header: ' ',
      align: 'right',
      cell: row => {
        const handleEnableRole = action => async e => {
          e.stopPropagation();
          const response = await enableRole({
            ..._pick(row, ['id', 'email', 'name']),
            role: 'AUDITOR',
            action,
          });

          if (!response.error) {
            setFetchCounter(prev => prev + 1);
          }
        };

        const handleDeleteRole = async e => {
          e.stopPropagation();
          setAuditorToDelete(row);
          setShowDeleteModal(true);
        };

        return (
          <Space alignItems="center" justifyContent="flex-end" gap={2}>
            <Toggle
              active={row?.status === 'ACTIVE'}
              onToggle={handleEnableRole(
                row?.status === 'ACTIVE' ? 'disable' : 'enable',
              )}
            />
            <Popup
              position="bottom"
              content="Delete"
              trigger={
                <Action onClick={handleDeleteRole}>
                  <Icon name="delete" />
                </Action>
              }
            />
          </Space>
        );
      },
    },
  ];

  const handleDateChange = dateValue => {
    dispatch({ type: 'SET_DATE_VALUE', key: TAB_KEY, payload: dateValue });

    Analytics.track(EVENTS.TABLE_DATE_FILTERS, {
      section: 'FORMS',
      sub_section: 'All',
      date_value: dateValue,
    });
  };

  const handleRemove = key => {
    const isRangeFilter = key === 'RANGE';

    const type = isRangeFilter ? 'SET_DATE_VALUE' : 'SET_FILTERS';
    const payload = isRangeFilter ? DEFAULT_VALUE : _omit(filters, key);

    Analytics.track(EVENTS.CLEAR_FILTERS, {
      section: 'FORMS',
      sub_section: 'All',
    });

    dispatch({
      type,
      key: TAB_KEY,
      payload,
    });
  };

  const handleFiltersChange = (filters, searchBy) => {
    dispatch({ type: 'SET_FILTERS', key: TAB_KEY, payload: filters });
    dispatch({ type: 'SET_SEARCH_BY', key: TAB_KEY, payload: searchBy });

    Analytics.track(EVENTS.TABLE_FILTERS, {
      section: 'FORMS',
      sub_section: 'All',
      filters,
      search_by: searchBy,
    });
  };

  const onLimitChange = (e, data) => {
    dispatch({ type: 'SET_LIMIT', key: TAB_KEY, payload: data.value });

    Analytics.track(EVENTS.CHANGE_PAGE_LIMIT, {
      size: data.value,
    });
  };

  const onPageChange = type =>
    dispatch({ type: 'SET_CURRENT_PAGE', key: TAB_KEY, payload: type });

  const confirmDeleteRole = async () => {
    const response = await deleteRole({
      ..._pick(auditorToDelete, ['id', 'email', 'name']),
      role: 'AUDITOR',
    });

    if (!response.error) {
      setFetchCounter(prev => prev + 1);
    }
    
    setShowDeleteModal(false);
    setAuditorToDelete(null);
  };

  return (
    <div className="mt-4">
      <Space direction="column" gap={3}>
        <DateFilter
          rangeSize={31}
          value={dateValue}
          options={DATE_OPTIONS}
          onSelect={handleDateChange}
        />

        <Space gap={1.5} alignItems="center" wrap>
          {stats?.map(stat => (
            <Card
              style={{ width: '120px', minWidth: '120px' }}
              className="p-2 m-0"
            >
              <Space direction="column" gap={0.5}>
                <Text
                  variant="b12"
                  color="bodyLight"
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {_capitalize(_startCase(stat?.status))}
                </Text>
                <Text variant="h20">{stat?.count}</Text>
              </Space>
            </Card>
          ))}
        </Space>
      </Space>
      <FilterRowContainer>
        <div>
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
      </FilterRowContainer>

      <PaginatedTable
        data={rowData}
        limit={limit}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        tableHeading={FORMATTED_COLUMN_ID}
        fetching={loading}
        emptyTableComponent={{
          text: 'Start by adding an auditor',
          description: 'Any agents and auditors created will live here.',
          icon: <CoherentIcon name="noRecordsTableIcon" />,
          action: (
            <Button
              primary
              icon={
                <CoherentIcon name="plus" fill="white" width={16} height={16} />
              }
              onClick={() => addSpecificRole('AUDITOR')}
            >
              Add Auditor
            </Button>
          ),
        }}
        {...paginationInfo}
      />
      
      {showDeleteModal && (
        <ConfirmModal
          danger
          title="Delete Auditor"
          confirmText="Delete"
          onClose={() => {
            setShowDeleteModal(false);
            setAuditorToDelete(null);
          }}
          onConfirm={confirmDeleteRole}
        >
          <Text variant="p14" color="bodyLight">
            Are you sure you want to delete the auditor "{auditorToDelete?.name}"?
          </Text>
        </ConfirmModal>
      )}
    </div>
  );
};

export default AllAuditor;
