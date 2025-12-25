import React, { useRef, useState, FC } from 'react';
import { Image, Space, Text, Button, Cross } from '@cashfree-intl/coherent';

// Images
import uploadIcon from 'images/upload.svg';

// Services
import { upload } from 'services/fundSources';

// Constants
import { SIZE_LIMIT } from 'constants/common';
import { TYPE_BY_MIME } from './constants';

// Hocs
import withErrorBoundary from 'components/ErrorBoundary/hocs';

// Helpers
import { getFileIcon } from './helpers';

// Styled
import { StyledUpload } from './styled';

// Types
import type { Props } from './types';

const FileUpload: FC<Props> = ({
  accept,
  error,
  value,
  checkList,
  viaAPI = true,
  onChange,
  onError,
  onReset,
}) => {
  const [fileData, setFileData] = useState<File | null>(null);

  const ref = useRef<HTMLInputElement | null>(null);

  if (value) {
    return (
      <>
        <StyledUpload
          alignItems="center"
          justifyContent="space-between"
          className="p-3 mb-1"
        >
          <Text as="span" variant="p14">
            {getFileIcon(fileData?.type as keyof typeof TYPE_BY_MIME)}
            {fileData?.name}
          </Text>
          <Cross size="md" onClick={onReset} />
        </StyledUpload>
        <Text variant="b12" color="danger">
          {error}
        </Text>
      </>
    );
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = Array.from(e.target.files as FileList);

    if (file.size > SIZE_LIMIT) {
      onError('File Size Limit Exceeded');
      return;
    }

    setFileData(file);

    if (!viaAPI) {
      onChange(e, { name: ref.current?.name || '', value: file });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await upload(formData);
    onChange(e, { name: ref.current?.name || '', value: response });
  };

  return (
    <>
      <StyledUpload
        alignItems="center"
        justifyContent="space-between"
        className="py-2 px-3 mb-1"
      >
        <Space direction="column" alignItems="center" gap={1}>
          <Image src={uploadIcon} style={{ width: '24px' }} />
          <Button
            data-event-name="Primary_Button"
            type="button"
            size="small"
            primary
            onClick={() => ref.current?.click()}
          >
            Choose a file
          </Button>
        </Space>
        <Space direction="column" gap={1}>
          {checkList.map((check) => (
            <Text key={check} variant="b12" color="bodyLight">
              - {check}
            </Text>
          ))}
        </Space>
        <input
          hidden
          data-testid="file"
          type="file"
          name="file"
          accept={accept}
          ref={ref}
          onChange={handleChange}
        />
      </StyledUpload>
      <Text variant="b12" color="danger">
        {error}
      </Text>
    </>
  );
};

export default withErrorBoundary(FileUpload);
