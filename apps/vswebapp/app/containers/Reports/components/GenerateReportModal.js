import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
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
  toast,
  Popup,
  Grid,
  Row,
  Column,
  Form,
  Conditional,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _upperCase from 'lodash/upperCase';

// Providers
import { AccountContext } from 'providers/AccountProvider';

// Services
import { generateReport } from 'services/reports';

// Constants
import { DATE_OPTIONS_WITH_TODAY as DATE_OPTIONS } from 'constants/date';
import {
  REQUIRED_FIELDS,
  FILE_EXTENSIONS,
  CURRENT_DATE,
  VKYC_REPORTS,
} from '../constants';

// Components
import Icon from 'components/Icon';
import TriggerRange from './TriggerRange';

// Utils
import { nameValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import {
  getFileFormatOptions,
  getReportColumns,
  getVKYCOptions,
} from '../utils';

// Styled
import { FlexGrid, BtnContainer } from 'styled/common';

const GenerateReportModal = ({
  reportType,
  onClose,
  setReportType,
  onSubmit,
}) => {
  const { fundSourceDetails, preferences } = useContext(AccountContext);

  const [formObj, setFormObj] = useState({
    fileFormat: Object.values(FILE_EXTENSIONS)[0],
    reportName: `${reportType.text}-${CURRENT_DATE}`,
    dateValue: DATE_OPTIONS[0],
  });

  const [errorObj, setErrorObj] = useState({});

  const onColumnChange = (name, checkStatus) => {
    let newColumns;
    let allChecked;

    if (name === 'ALL') {
      newColumns = reportType.columns.map(column => ({
        ...column,
        checked: checkStatus,
      }));

      allChecked = checkStatus;
    } else {
      newColumns = reportType.columns.map(column => {
        if (column.type === name) {
          return { ...column, checked: !column.checked };
        }
        return column;
      });

      allChecked = newColumns.every(item => item.checked);
    }

    setReportType(prev => ({ ...prev, allChecked, columns: newColumns }));
  };

  const isVKYCReport = reportType.type === 'VKYC';
  const isStatementReport = reportType.type === 'ACCOUNT';
  const isOCRReport = [
    'AADHAAR_OCR_VERIFICATION',
    'PAN_OCR_VERIFICATION',
  ].includes(reportType.type);

  const checkedColumns = reportType.columns
    .filter(
      column =>
        !(
          ['AMOUNT_DEPOSITED', 'AMOUNT'].includes(column.type) &&
          !preferences.showAmountDeposited
        ),
    )
    .filter(column => column.checked)
    .map(column => column.type);

  useEffect(() => {
    if (!isVKYCReport || formObj.vkycReportType) {
      return;
    }

    setFormObj(prev => ({
      ...prev,
      vkycReportType: VKYC_REPORTS[0]?.type,
    }));
    setReportType(prev => ({
      ...prev,
      text: VKYC_REPORTS[0]?.name,
      allChecked: true,
      columns:
        VKYC_REPORTS[0]?.columns.map(column => ({
          ...column,
          label: column.name,
          type: column.value,
          checked: true,
        })) || [],
    }));
  }, [isVKYCReport, setFormObj, formObj]);

  const handleChange = (e, { name, value }) => {
    let error;

    switch (name) {
      case 'reportName':
        // Removing leading text and trimmed at final submission to allow space between texts
        error = nameValidation('Report name', value.trim());
        break;
    }

    setErrorObj(prev => ({ ...prev, [name]: error }));
    setFormObj(prev => ({ ...prev, [name]: value.replace(/^\s+/, '') }));

    if (isVKYCReport && name === 'vkycReportType') {
      setReportType(prev => ({
        ...prev,
        text: prev.name,
        allChecked: true,
        columns:
          VKYC_REPORTS.find(report => report.type === value)?.columns.map(
            column => ({
              ...column,
              label: column.name,
              type: column.value,
              checked: true,
            }),
          ) || [],
      }));
    }
  };

  const changeShowAll = (e, data) => {
    onColumnChange('ALL', data.checked);
  };

  const handleGenerateReport = async e => {
    e.preventDefault();

    const [startDate, endDate] = formObj.dateValue.range;

    const queryObj = {
      reportType: isVKYCReport ? formObj.vkycReportType : reportType.type,
      name: formObj.reportName.trim(),
      fileFormat: formObj.fileFormat,
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

    if (isOCRReport) {
      queryObj.additionalFilters = {
        product: _upperCase(reportType.type.split('_')[0]),
      };
    }

    if (isStatementReport) {
      queryObj.additionalFilters = {
        fundSourceIds: [_get(fundSourceDetails, 'fundSourceId', '')],
      };
    }

    const response = await generateReport(queryObj);

    if (!response.error) {
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

  const handleDateChange = data => {
    setFormObj(prev => ({
      ...prev,
      dateValue: data,
    }));
  };

  const disabled =
    !isFormValid(formObj, errorObj, REQUIRED_FIELDS) || !checkedColumns.length;

  const reportColumns = getReportColumns(reportType, preferences);

  return (
    <Modal $maxWidth="676" open>
      <ModalHeader>
        {reportType.text} Report
        <Cross
          onClick={resetAndClose}
          data-event-name="Form_GenerateReport_Icon_Close"
        />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleGenerateReport}>
            <Grid>
              <Conditional if={isVKYCReport}>
                <Row className="pb-0">
                  <Column width={8}>
                    <Text color="bodyLight" className="mb-1">
                      Choose Report Type
                    </Text>
                    <Dropdown
                      selection
                      fluid
                      style={{ width: '100%' }}
                      name="vkycReportType"
                      options={getVKYCOptions()}
                      value={formObj.vkycReportType}
                      onChange={handleChange}
                    />
                  </Column>
                </Row>
              </Conditional>
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
                <Column width={4}>
                  <Text color="bodyLight" className="mb-1">
                    File Format
                  </Text>
                  <Dropdown
                    selection
                    fluid
                    style={{ width: '100%' }}
                    name="fileFormat"
                    options={getFileFormatOptions()}
                    value={formObj.fileFormat}
                    onChange={handleChange}
                  />
                </Column>
              </Row>
              <Row className="mb-2">
                <Column width={8}>
                  <Form.Field>
                    <DateFilter
                      rangeSize={31}
                      value={formObj.dateValue}
                      options={DATE_OPTIONS}
                      onSelect={handleDateChange}
                      trigger={props => (
                        <TriggerRange
                          dateValue={formObj.dateValue}
                          options={DATE_OPTIONS}
                          currentDate={CURRENT_DATE}
                          {...props}
                        />
                      )}
                    />
                  </Form.Field>
                </Column>
                <Column width={8} />
              </Row>
            </Grid>
            <Form.Group grouped>
              <Text variant="h16" className="mt-1 mb-2">
                Choose Columns
              </Text>
              <Checkbox
                data-event-name="Checkbox_ShowAll"
                data-testid="show-all"
                className="mb-2"
                label={`Show All (${reportType.columns.length})`}
                checked={reportType.allChecked}
                onChange={changeShowAll}
              />
              <FlexGrid cols={3} wrap>
                {reportColumns.map(column => (
                  <Checkbox
                    data-event-name={`Checkbox_${column.type}`}
                    key={column.type}
                    className="mb-2"
                    label={column.label}
                    checked={column.checked}
                    onChange={() => onColumnChange(column.type)}
                  />
                ))}
              </FlexGrid>
            </Form.Group>
            <BtnContainer>
              <Button
                as="a"
                link
                onClick={onClose}
                data-event-name="Form_GenerateReport_SecondaryButton"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                data-event-name="Form_GenerateReport_PrimaryButton"
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

GenerateReportModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  reportType: PropTypes.object.isRequired,
  onColumnChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
};

export default GenerateReportModal;
