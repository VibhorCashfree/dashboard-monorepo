import React, { useState } from 'react';
import {
  toast,
  Text,
  Form,
  Cross,
  Button,
  Popup,
  Modal,
  ModalHeader,
  ModalContent,
  ModalDescription,
} from '@cashfree-intl/coherent';
import _get from 'lodash/get';
import _omit from 'lodash/omit';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Services
import { updateDetails } from 'services/fundSources';

// Utils
import { fundSourceNameValidation } from 'utils/formValidation';
import isFormValid from 'utils/isFormValid';
import { hasFormUpdated } from '../utils';

// Components
import Icon from 'components/Icon';
import FileUpload from 'components/FileUpload';

// Constants
import { FILE_SIZE_CHECK } from 'constants/common';
import { FS_DISPLAY_TYPE } from 'constants/fundSources';
import { errorByMessage, REQUIRED_FIELDS, STATUS } from '../constants';

// Styled
import { BtnContainer } from 'styled/common';

// Types
import type { UpdateDetailsModalProps } from '../types';

const UpdateDetailsModal: React.FC<UpdateDetailsModalProps> = ({
  selectedRow,
  onResponse,
  onClose,
}) => {
  const [formObj, setFormObj] = useState<AnyObject>({
    displayName: selectedRow.displayName,
  });
  const [errorObj, setErrorObj] = useState<AnyObject>({});
  const [loading, setLoading] = useState(false);

  const isCreditCard: boolean =
    selectedRow.fsDisplayType === FS_DISPLAY_TYPE.CREDIT_CARD &&
    selectedRow.status === STATUS.DEACTIVATED;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const body: { displayName: string; fileKey?: string } = {
      displayName: formObj.displayName,
    };

    if (isCreditCard && formObj.file) {
      body.fileKey = formObj.file;
    }

    const response = await updateDetails(selectedRow.fundSourceId, body);

    if ('error' in response) {
      const message: string = _get(response, 'error.message', '');

      if (message === 'FUND_SOURCE_NAME_EXISTS') {
        const error = errorByMessage[message];

        if (error) {
          setErrorObj((prev) => ({
            ...prev,
            [error.key]: error.text,
          }));
        } else {
          toast.error(message);
        }
      }
    } else {
      toast.success('Fund Source name updated successfully');
      onResponse();
    }

    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    { name, value }: { name: string; value: string },
  ): void => {
    let error: string | undefined | null;

    switch (name) {
      case 'displayName':
        error = fundSourceNameValidation(value);
        break;
    }

    setErrorObj((prev) => ({ ...prev, [name]: error }));
    setFormObj((prev) => ({ ...prev, [name]: value }));
  };

  const disabled =
    !isFormValid(formObj, errorObj, REQUIRED_FIELDS.UPDATE_DETAILS) ||
    hasFormUpdated(selectedRow, formObj) ||
    loading;

  return (
    <Modal $maxWidth="480" open>
      <ModalHeader>
        Update Details
        <Cross data-event-name="Close_Icon_Update_Details" onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Input
                width={10}
                name="displayName"
                data-testid="display-name"
                label={
                  <Text color="bodyLight" className="mb-1">
                    Fund Source Name
                    <Popup
                      position="right center"
                      content="Unique name for the fund source."
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
                }
                value={formObj.displayName}
                error={errorObj.displayName}
                onChange={handleChange}
              />
            </Form.Group>
            {isCreditCard && (
              <>
                <Text color="bodyLight" className="mb-1">
                  Latest Credit Card Statement
                  <Popup
                    position="right center"
                    content="Upload the latest credit card statement for the month. This is required to verify the card details and approve the card for making transfers."
                    trigger={
                      <span>
                        <Icon name="info" className="pointer ml-1" />
                      </span>
                    }
                  />
                </Text>
                <FileUpload
                  accept="application/pdf"
                  checkList={[FILE_SIZE_CHECK, 'File type: .pdf']}
                  error={errorObj.file}
                  value={formObj.file}
                  onChange={handleChange}
                  onError={(error: string) =>
                    setErrorObj((prev) => ({ ...prev, file: error }))
                  }
                  onReset={() => setFormObj((prev) => _omit(prev, ['file']))}
                />
              </>
            )}
            <BtnContainer>
              <Button
                data-event-name="Secondary_Button_Update_Details"
                as="a"
                link
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                data-event-name="Primary_Button_Update_Details"
                type="submit"
                className="ml-4"
                primary
                disabled={disabled}
                loading={loading}
              >
                Update
              </Button>
            </BtnContainer>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default withErrorBoundary(UpdateDetailsModal);
