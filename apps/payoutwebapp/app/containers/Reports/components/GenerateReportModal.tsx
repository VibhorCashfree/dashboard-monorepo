import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import moment from 'moment';
import {
  Form,
  Grid,
  Row,
  Column,
  Text,
  Button,
  Cross,
  Checkbox,
  Dropdown,
  DateFilter,
  Modal,
  ModalDescription,
  ModalContent,
  ModalHeader,
  Popup,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _pickBy from 'lodash/pickBy';
import _identity from 'lodash/identity';
import _keyBy from 'lodash/keyBy';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { generateReport } from 'services/reports';

// Constants
import { FILE_TYPE } from 'constants/common';
import {
  REQUIRED_FIELDS,
  CURRENT_DATE,
  DATE_RANGE_OPTIONS,
  DATE_RANGE_OPTIONS_WITH_TODAY,
} from '../constants';

// Helpers
import { getFundSourcesOptions } from 'helpers/fundSources';

// Utils
import Analytics from 'utils/analytics';
import { requiredValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { getFileFormatOptions, isFundSourceValid } from '../utils';

// Components
import Icon from 'components/Icon';
import TriggerRange from './TriggerRange';

// Styled
import { FlexGrid, BtnContainer } from 'styled/common';

// Types
import type { GenerateReportModalProps } from '../types';

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({
  reportType,
  fundSources,
  onClose,
  onColumnChange,
  onSubmit,
  onFundSourceChange,
}) => {
  const [formObj, setFormObj] = useState<AnyObject>(() => {
    const allFundSourceIds = fundSources.map(
      (fundSource) => fundSource.fundSourceId,
    );

    return {
      fileFormat: FILE_TYPE.CSV,
      reportName: `${reportType.text}-${CURRENT_DATE}`,
      dateValue:
        reportType.type === 'RECON_REPORT'
          ? DATE_RANGE_OPTIONS[0]
          : DATE_RANGE_OPTIONS_WITH_TODAY[0],
      fundSourcesCheckStatus: allFundSourceIds.reduce(
        (fundSource, item) => ({ ...fundSource, [item]: true }),
        {},
      ),
    };
  });

  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const checkedColumns = reportType.columns
    .filter((column) => column.checked)
    .map((column) => column.type);

  const fundSourceById = _keyBy(fundSources, 'fundSourceId');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value: val }: { name: string; value: string },
  ) => {
    let error: string | undefined | null;

    const value = typeof val === 'string' ? val.trim() : val;

    switch (name) {
      case 'reportName':
        error = requiredValidation(value);
        break;

      case 'fundSourceId':
        onFundSourceChange(fundSourceById[value].fsDisplayType);
        error = requiredValidation(value);

        Analytics.track('Dropdown_fundSourceId', { value });
        break;

      case 'fileFormat':
        Analytics.track('Dropdown_fileFormat', { value });
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowAll = (
    e: React.ChangeEvent<HTMLInputElement>,
    data: { checked: boolean },
  ) => {
    onColumnChange('ALL', data.checked);
  };

  const checkedFundSources = Object.keys(
    _pickBy(formObj.fundSourcesCheckStatus, _identity),
  ).map((fundSourceId) => parseInt(fundSourceId));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const [startDate, endDate] = formObj.dateValue.range;

    const queryObj: {
      reportType: string;
      name: string;
      filters: {
        filterType: string;
        value: string;
      }[];
      columns: string[];
      fileFormat?: FILE_TYPE | 'XLSX';
      additionalFilters?: { fundSourceIds: number[] };
    } = {
      reportType: reportType.type,
      name: formObj.reportName,
      filters: [
        {
          filterType: 'fromDate',
          value: moment(startDate).format('DD MMM YYYY'),
        },
        {
          filterType: 'toDate',
          value: moment(endDate).format('DD MMM YYYY'),
        },
      ],
      columns: checkedColumns,
    };

    if (reportType.type !== 'RECON_REPORT') {
      queryObj.fileFormat =
        formObj.fileFormat === FILE_TYPE.XLS ? 'XLSX' : formObj.fileFormat;
    }

    if (
      reportType.hasFundSource ||
      ['PO_ACCOUNT', 'RECON_REPORT'].includes(reportType.type)
    ) {
      queryObj.additionalFilters = {
        fundSourceIds: reportType.hasFundSource
          ? checkedFundSources
          : [formObj.fundSourceId!],
      };
    }

    const response = await generateReport(queryObj);

    setLoading(false);

    if (!('error' in response)) {
      toast.success(response.message);

      if (onSubmit) {
        onSubmit();
      }
    }

    resetAndClose();
  };

  const resetAndClose = () => {
    onColumnChange('ALL', true);
    onClose();
  };

  const handleDateChange = (data: any) => {
    setFormObj((prev) => ({
      ...prev,
      dateValue: data,
    }));
  };

  const handleFundSourceChange = (key: string) =>
    setFormObj((prev) => ({
      ...prev,
      fundSourcesCheckStatus: {
        ...prev.fundSourcesCheckStatus,
        [key]: !prev.fundSourcesCheckStatus[key],
      },
    }));

  const fundSourceOptions = getFundSourcesOptions(
    fundSources.filter((fundSource) =>
      reportType.type === 'RECON_REPORT'
        ? _get(fundSource, 'preferences.ENABLE_RECON_REPORT') === '1'
        : true,
    ),
    'fundSourceId',
  );

  const disabled =
    !isFormValid(formObj, errorObj, REQUIRED_FIELDS) ||
    !(
      ['PAYOUT_RISK_DETAILS', 'RECON_REPORT'].includes(reportType.type) ||
      checkedColumns.length
    ) ||
    !isFundSourceValid(formObj, reportType);

  return (
    <Modal $maxWidth="676" open>
      <ModalHeader>
        {reportType.text} Report
        <Cross
          data-event-name="Close_Icon_Generate_Report"
          onClick={resetAndClose}
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Grid>
              <Row className="pb-0">
                <Column width={8}>
                  <Form.Input
                    fluid
                    label={
                      <label className="mb-1">
                        Report Name
                        <Popup
                          content="Report will be generated
                      with the name specified here."
                          trigger={
                            <span>
                              <Icon
                                name="info"
                                className="pointer ml-1"
                                verticalAlign="top"
                              />
                            </span>
                          }
                          position="right center"
                        />
                      </label>
                    }
                    data-testid="report-name"
                    name="reportName"
                    error={errorObj.reportName}
                    value={formObj.reportName}
                    onChange={handleChange}
                  />
                </Column>
                {reportType.type !== 'RECON_REPORT' && (
                  <Column width={4}>
                    <Text color="bodyLight" className="mb-1">
                      File Format
                    </Text>
                    <Dropdown
                      selection
                      fluid
                      name="fileFormat"
                      options={getFileFormatOptions()}
                      value={formObj.fileFormat}
                      onChange={handleChange}
                    />
                  </Column>
                )}
              </Row>
              <Row className="mb-2">
                <Column width={8}>
                  <Form.Field>
                    <DateFilter
                      rangeSize={reportType.type === 'CASHGRAM' ? 31 * 3 : 31}
                      value={formObj.dateValue}
                      options={
                        reportType.type === 'RECON_REPORT'
                          ? DATE_RANGE_OPTIONS
                          : DATE_RANGE_OPTIONS_WITH_TODAY
                      }
                      min={
                        reportType.type === 'RECON_REPORT'
                          ? moment().subtract(6, 'months').toDate()
                          : undefined
                      }
                      onSelect={handleDateChange}
                      trigger={(props: AnyObject) => (
                        <TriggerRange
                          dateValue={formObj.dateValue}
                          options={
                            reportType.type === 'RECON_REPORT'
                              ? DATE_RANGE_OPTIONS
                              : DATE_RANGE_OPTIONS_WITH_TODAY
                          }
                          currentDate={CURRENT_DATE}
                          {...props}
                        />
                      )}
                    />
                  </Form.Field>
                </Column>
                <Column width={8}>
                  {['PO_ACCOUNT', 'RECON_REPORT'].includes(reportType.type) && (
                    <Form.Field style={{ width: 299 }}>
                      <Text color="bodyLight" className="mb-1">
                        Fund Source
                      </Text>
                      <Dropdown
                        selection
                        name="fundSourceId"
                        options={fundSourceOptions}
                        placeholder="Choose Fund Source"
                        value={formObj.fundSourceId}
                        error={errorObj.fundSourceId}
                        onChange={handleChange}
                      />
                    </Form.Field>
                  )}
                </Column>
              </Row>
            </Grid>
            {reportType.hasFundSource && (
              <Form.Group grouped>
                <Text variant="h16" className="mt-1 mb-2">
                  Choose Fund Sources
                </Text>
                <FlexGrid cols={3} wrap>
                  {Object.keys(formObj.fundSourcesCheckStatus).map((key) => (
                    <Checkbox
                      key={key}
                      label={
                        <label className="mb-2">
                          <Text
                            className="text-ellipsis"
                            style={{ width: 150 }}
                          >
                            {fundSourceById[key].displayName || '–'}
                          </Text>
                        </label>
                      }
                      checked={formObj.fundSourcesCheckStatus[key]}
                      onChange={() => handleFundSourceChange(key)}
                    />
                  ))}
                </FlexGrid>
              </Form.Group>
            )}
            {reportType.columns.length > 0 && (
              <Form.Group grouped>
                <Text variant="h16" className="mt-1 mb-2">
                  Choose Columns
                </Text>
                <Checkbox
                  data-testid="show-all"
                  className="mb-2"
                  label={`Show All (${reportType.columns.length})`}
                  checked={reportType.allChecked}
                  onChange={toggleShowAll}
                />
                <FlexGrid cols={3} wrap>
                  {reportType.columns.map((column) => (
                    <Checkbox
                      className="mb-2"
                      key={column.label}
                      label={column.label}
                      checked={column.checked}
                      onChange={() => onColumnChange(column.type, false)}
                    />
                  ))}
                </FlexGrid>
              </Form.Group>
            )}
            <BtnContainer>
              <Button
                data-event-name="Secondary_Button_Generate_Report"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Generate_Report"
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
              >
                Generate Report
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = ({ fundSources }: { fundSources: AnyObject[] }) => ({
  fundSources,
});

const withConnect = connect(mapStateToProps);

export default withErrorBoundary(withConnect(GenerateReportModal));
