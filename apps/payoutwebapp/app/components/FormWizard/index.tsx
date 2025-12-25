import React, { useState, useEffect } from 'react';
import {
  Wizard,
  Space,
  Button,
  Text,
  Cross,
  ConfirmModal,
} from '@cashfree-intl/coherent';

// Utils
import isFormValid from 'utils/isFormValid';

// Components
import Drawer from 'components/Drawer';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Constants
import { ACTION_TYPE } from './constants';

// Styled
import {
  StyledHeader,
  StyledSidebar,
  MainContent,
  StyledFooter,
} from './styled';

// Types
import type { Props } from './types';

const FormWizard = ({
  header,
  closeConfirm,
  items,
  activeIndex = 0,
  onStepChange,
  onClose,
}: Props) => {
  const [formObj, setFormObj] = useState({});
  const [errorObj, setErrorObj] = useState({});
  const [actionType, setActionType] = useState<ACTION_TYPE>(ACTION_TYPE.EMPTY);

  useEffect(() => {
    setFormObj({});
    setErrorObj({});
  }, [activeIndex]);

  const handleSubmit = () => {
    setActionType(ACTION_TYPE.SUBMIT);
  };

  const onDone = (nextStepArg: number) => {
    if (activeIndex < items.length - 1) {
      const nextStep = nextStepArg || activeIndex + 1;

      onStepChange(nextStep);
    } else {
      onClose();
    }
  };

  const activeItem = items[activeIndex];

  const disabled = !isFormValid(
    formObj,
    errorObj,
    activeItem.requiredFields({
      formObj,
      errorObj,
    }),
  );

  const steps = items.map((item, index) => ({
    key: index,
    label: item.label,
    status: index < activeIndex ? 'COMPLETED' : '',
    disabled: index !== activeIndex,
  }));

  return (
    <>
      <Drawer>
        {/* Header */}
        <StyledHeader
          className="px-3 py-2"
          justifyContent="space-between"
          alignItems="center"
        >
          <div>
            <Text variant="h20" className="mb-1">
              {header.title}
            </Text>
            <Text color="bodyLight">{header.subTitle}</Text>
          </div>

          <div>
            {header.actionButtons && header.actionButtons({ setActionType })}
            <Cross
              data-event-name={`Close_Icon_${activeItem.label}`}
              size="lg"
              style={{ verticalAlign: 'middle' }}
              onClick={() => setActionType(ACTION_TYPE.CLOSE)}
            />
          </div>
        </StyledHeader>

        <Space>
          {/* Navigation */}
          <StyledSidebar direction="column" alignItems="space-between">
            <Wizard
              steps={steps}
              activeKey={steps[activeIndex].key}
              onStepClick={({ key }: { key: number }) => onStepChange(key)}
            />
          </StyledSidebar>

          {/* Body */}
          <MainContent>
            {activeItem.render({
              actionType,
              setActionType,
              formObj,
              setFormObj,
              errorObj,
              setErrorObj,
              onDone,
            })}
          </MainContent>
        </Space>

        {/* Footer */}
        <StyledFooter
          gap={4}
          alignItems="center"
          justifyContent="flex-end"
          className="px-3 py-2"
        >
          <Button
            data-event-name={`Secondary_Button_${activeItem.label}`}
            as="a"
            link
            onClick={() => setActionType(ACTION_TYPE.CLOSE)}
          >
            Cancel
          </Button>
          <Button
            data-event-name={`Primary_Button_${activeItem.label}`}
            primary
            disabled={disabled}
            loading={!disabled && actionType}
            onClick={handleSubmit}
          >
            Proceed
          </Button>
        </StyledFooter>
      </Drawer>

      {actionType === ACTION_TYPE.CLOSE && (
        <ConfirmModal
          title={closeConfirm.title}
          confirmText="Yes"
          confirmBtnEvent="Primary_Cancel_Fundsource_Addition"
          closeBtnEvent="Secondary_Cancel_Fundsource_Addition"
          closeCrossEvent="Close_Icon_Cancel_Fundsource_Addition"
          onConfirm={onClose}
          onClose={() => setActionType(ACTION_TYPE.EMPTY)}
        >
          <Text color="bodyLight">{closeConfirm.body}</Text>
        </ConfirmModal>
      )}
    </>
  );
};

export default withErrorBoundary(FormWizard);
