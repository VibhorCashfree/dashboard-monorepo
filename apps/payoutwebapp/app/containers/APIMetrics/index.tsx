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
} from '@cashfree-intl/coherent';

// Services
import { getMetrics } from 'services/developers';

// Utils
import Analytics from 'utils/analytics';

// Constants
import {
  MENU,
  SUBMENU,
  LABEL_BY_MENU,
  LABEL_BY_SUBMENU,
} from 'constants/menuItems';
import EVENTS from 'constants/events';
import {
  DATE_RANGE_OPTIONS,
  KNOW_MORE_BY_API,
  METRIC_INFO_BY_TYPE,
  METRIC_TYPE,
  PAYOUTS,
  CASHGRAMS,
  options,
} from './constants';

// Components
import Icon from 'components/Icon';
import PageHeader from 'components/PageHeader';
import MetaTags from 'components/MetaTags';
import LineChart from './components/LineChart';

// Styled
import { BackButtonWrapper } from 'styled/common';
import { StyledDropdownMenu } from './styled';

const APIMetrics: React.FC = () => {
  const [selectedAPI, setSelectedAPI] = useState(options[0].value);
  const [data, setData] = useState<AnyObject[]>();
  const [dateValue, setDateValue] = useState(DATE_RANGE_OPTIONS[0]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchData() {
      const [method, path] = selectedAPI.split(' ');

      const body: {
        method: string;
        path: string;
        startDate?: number;
        endDate?: number;
      } = { method, path };

      if (dateValue.range) {
        const [startDate, endDate] = dateValue.range;

        body.startDate = moment(startDate).unix();
        body.endDate = moment(endDate).unix();
      }

      setLoading(true);

      const response: any[] = await Promise.all([
        getMetrics({ ...body, metricType: METRIC_TYPE.ERROR }),
        getMetrics({ ...body, metricType: METRIC_TYPE.LATENCY }),
        getMetrics({ ...body, metricType: METRIC_TYPE.STATUS_CODE }),
      ]);

      setData(response);

      setLoading(false);
    })();
  }, [dateValue, selectedAPI]);

  const handleDateChange = (dateValue: DateRangeValue): void => {
    setDateValue(dateValue);

    Analytics.track(EVENTS.DATE_FILTERS, {
      section: LABEL_BY_MENU[MENU.DEVELOPERS],
      sub_section: LABEL_BY_SUBMENU[SUBMENU.API_METRICS],
      date_value: dateValue,
    });
  };

  const getDropdownItems = (group: AnyObject) =>
    Object.keys(group).map((subGroupKey) => {
      const items = Object.keys(group[subGroupKey]).map((itemKey: string) => {
        const item = group[subGroupKey][itemKey];

        return (
          <DropdownItem
            onClick={() => {
              setSelectedAPI(itemKey);
              Analytics.track('Dropdown_Selected_API', { value: itemKey });
            }}
            key={itemKey}
          >
            <Text>{item.text}</Text>
          </DropdownItem>
        );
      });

      return (
        <>
          <DropdownHeader key={subGroupKey}>
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

  const [errorData, latencyData, statusCodeData] = data as AnyObject[];

  return (
    <>
      <PageHeader embedKey="DEVELOPERS">
        {LABEL_BY_SUBMENU[SUBMENU.API_METRICS]}
      </PageHeader>
      <MetaTags title={LABEL_BY_SUBMENU[SUBMENU.API_METRICS]} />

      <BackButtonWrapper onClick={() => navigate(-1)}>
        <Icon name="chevron-left" />
        <Text as="a" className="link ml-1">
          Back
        </Text>
      </BackButtonWrapper>
      <Space gap={2} alignItems="center" className="mb-4">
        <DateFilter
          rangeSize={7}
          value={dateValue}
          options={DATE_RANGE_OPTIONS}
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
            style={{ minWidth: '100%' }}
            scrolling
          >
            <DropdownHeader>
              <Text variant="b12" color="primary">
                Payouts
              </Text>
            </DropdownHeader>
            {getDropdownItems(PAYOUTS)}
            <DropdownHeader>
              <Text variant="b12" color="primary">
                Cashgrams
              </Text>
            </DropdownHeader>
            {getDropdownItems(CASHGRAMS)}
          </StyledDropdownMenu>
        </Dropdown>

        {KNOW_MORE_BY_API[selectedAPI as keyof typeof KNOW_MORE_BY_API].url && (
          <a
            href={
              KNOW_MORE_BY_API[selectedAPI as keyof typeof KNOW_MORE_BY_API].url
            }
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {
              KNOW_MORE_BY_API[selectedAPI as keyof typeof KNOW_MORE_BY_API]
                .text
            }
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
        <LineChart data={errorData.data} dataKeys={errorData.dataKeys} />
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
        <LineChart
          data={latencyData.data}
          dataKeys={latencyData.dataKeys}
          formatter={(val: number) => `${val}s`}
        />
      </Paper>

      <Paper className="mb-4">
        <Text variant="h16" color="bodyLight" className="mb-2">
          {METRIC_INFO_BY_TYPE[METRIC_TYPE.STATUS_CODE].text}
          <Popup
            position="right center"
            content={METRIC_INFO_BY_TYPE[METRIC_TYPE.STATUS_CODE].info}
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
        <LineChart
          data={statusCodeData.data}
          dataKeys={statusCodeData.dataKeys}
          formatter={(val: number) => `${val}%`}
        />
      </Paper>
    </>
  );
};

export default APIMetrics;
