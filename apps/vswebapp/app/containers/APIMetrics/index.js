import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  Loader,
  Popup,
  Space,
  Paper,
  Text,
  DateFilter,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  APIMetricsGraph,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';

// Constants
import {
  DATE_OPTIONS,
  KNOW_MORE_BY_API,
  METRIC_INFO_BY_TYPE,
  METRIC_TYPE,
  VRS,
  options,
} from './constants';

// Components
import Icon from 'components/Icon';
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';

// Services
import { getMetrics } from 'services/developers';

// Styled
import { BackButtonWrapper } from 'styled/common';
import { StyledDropdownMenu } from './styled';

// Utils
import Analytics from 'utils/analytics';

const APIMetrics = () => {
  const [selectedAPI, setSelectedAPI] = useState(options[0].value);
  const [data, setData] = useState();
  const [dateValue, setDateValue] = useState(DATE_OPTIONS[0]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      const [method, path] = selectedAPI.split(' ');

      const body = { method, path };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        body.startDate = moment(startDate).unix();
        body.endDate = moment(endDate).unix();
      }

      setLoading(true);

      const response = await Promise.all([
        getMetrics({ ...body, metricType: METRIC_TYPE.LATENCY }),
        getMetrics({ ...body, metricType: METRIC_TYPE.ERROR }),
        getMetrics({ ...body, metricType: METRIC_TYPE.STATUS_CODE }),
      ]);

      setData(response);

      setLoading(false);
    })();
  }, [dateValue, selectedAPI]);

  const handleDateChange = dateValue => {
    setDateValue(dateValue);
  };

  const getDropdownItems = group =>
    Object.keys(group).map(subGroupKey => {
      const items = Object.keys(group[subGroupKey]).map(itemKey => {
        const item = group[subGroupKey][itemKey];

        return (
          <DropdownItem
            onClick={() => {
              setSelectedAPI(itemKey);
              Analytics.track('Dropdown_API', {
                value: itemKey,
              });
            }}
            key={itemKey}
          >
            <Text>{item.text}</Text>
          </DropdownItem>
        );
      });

      return (
        <>
          <DropdownHeader>
            <Text variant="b12" color="bodyLight">
              {subGroupKey}
            </Text>
          </DropdownHeader>
          {items}
          <DropdownDivider className="mb-0" />
        </>
      );
    });

  if (loading) {
    return <Loader active />;
  }

  const [latencyData = [], errorData = [], statusCodeData = []] = data;

  return (
    <>
      <Space gap={2} alignItems="center" className="my-3 metrics-filters">
        <DateFilter
          rangeSize={7}
          value={dateValue}
          options={DATE_OPTIONS}
          onSelect={handleDateChange}
        />
        <Dropdown
          button
          icon={null}
          style={{ minWidth: 328 }}
          trigger={
            <Space justifyContent="space-between">
              <Text>{selectedAPI}</Text>
              <Icon
                name={open ? 'chevron-up' : 'chevron-down'}
                className="ml-1"
              />
            </Space>
          }
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          <StyledDropdownMenu
            direction="left"
            style={{ minWidth: '95%' }}
            scrolling
          >
            {getDropdownItems(VRS)}
          </StyledDropdownMenu>
        </Dropdown>

        {_get(KNOW_MORE_BY_API[selectedAPI], 'url', '') && (
          <a
            href={KNOW_MORE_BY_API[selectedAPI].url}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {KNOW_MORE_BY_API[selectedAPI].text}
          </a>
        )}
      </Space>

      <Paper className="mb-4">
        <Text variant="h16" color="bodyLight" className="mb-2">
          {METRIC_INFO_BY_TYPE[METRIC_TYPE.ERROR].text}
          <Popup
            position="right center"
            content={METRIC_INFO_BY_TYPE[METRIC_TYPE.ERROR].info}
            trigger={
              <span>
                <Icon
                  name="info"
                  className="pointer ml-1"
                  verticalAlign="top"
                />
              </span>
            }
          />
        </Text>
        <APIMetricsGraph
          data={errorData.data}
          dataKeys={errorData.dataKeys}
          width="95%"
          height={530}
        />
      </Paper>

      <Paper className="mb-4">
        <Text variant="h16" color="bodyLight" className="mb-2">
          {METRIC_INFO_BY_TYPE[METRIC_TYPE.LATENCY].text}
          <Popup
            position="right center"
            content={METRIC_INFO_BY_TYPE[METRIC_TYPE.LATENCY].info}
            trigger={
              <span>
                <Icon
                  name="info"
                  className="pointer ml-1"
                  verticalAlign="top"
                />
              </span>
            }
          />
        </Text>
        <APIMetricsGraph
          data={latencyData.data}
          dataKeys={latencyData.dataKeys}
          maxDomain={latencyData.maxData}
          formatter={val => `${val}s`}
          width="95%"
          height={530}
        />
      </Paper>

      <Paper className="mb-4">
        <Text variant="h16" color="bodyLight" className="mb-2">
          {METRIC_INFO_BY_TYPE[METRIC_TYPE.SUCCESS_CODE].text}
          <Popup
            position="right center"
            content={METRIC_INFO_BY_TYPE[METRIC_TYPE.SUCCESS_CODE].info}
            trigger={
              <span>
                <Icon
                  name="info"
                  className="pointer ml-1"
                  verticalAlign="top"
                />
              </span>
            }
          />
        </Text>
        <APIMetricsGraph
          data={statusCodeData.data}
          dataKeys={statusCodeData.dataKeys}
          maxDomain={100}
          formatter={val => `${val} %`}
          width="95%"
          height={530}
        />
      </Paper>
    </>
  );
};

export default APIMetrics;
