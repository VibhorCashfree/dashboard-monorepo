import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render, screen, fireEvent } from '@testing-library/react';
import { Theme } from '@cashfree-intl/coherent';

// Services
import * as FundSourcesService from 'services/fundSources';

// Components
import FileUpload from '..';

// Helpers
import { getFileIcon } from '../helpers';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

beforeEach(() => {
  jest.mock('services/fundSources');

  jest
    .spyOn(FundSourcesService, 'upload')
    .mockImplementation(() => Promise.resolve({}));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.clearAllMocks();
});

describe('FileUpload', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Theme>
        <FileUpload
          accept="application/pdf"
          checkList={['Max file size: 5 MB', 'File type: .pdf']}
          error="File exceeded upload limit"
          onChange={jest.fn()}
          onError={jest.fn()}
          onReset={jest.fn()}
        />
      </Theme>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });

  test('checks render', async () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    const onReset = jest.fn();

    render(
      <Theme>
        <FileUpload
          accept="image/png"
          checkList={['Max file size: 5 MB', 'File type: .png']}
          error="File exceeded upload limit"
          onChange={onChange}
          onError={onError}
          onReset={onReset}
        />
      </Theme>,
    );

    expect(screen.queryByText('- Max file size: 5 MB')).toBeInTheDocument();
    expect(screen.queryByText('- File type: .png')).toBeInTheDocument();
    expect(
      screen.queryByText('File exceeded upload limit'),
    ).toBeInTheDocument();

    expect(screen.queryByText('Choose a file')).toBeInTheDocument();

    const input = screen.getByTestId('file');
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(FundSourcesService.upload).toHaveBeenCalled();

    // expect(onChange).toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(onReset).not.toHaveBeenCalled();
  });

  test('changing props', async () => {
    const onChange = jest.fn();
    const onError = jest.fn();
    const onReset = jest.fn();

    render(
      <Theme>
        <FileUpload
          accept="image/png"
          viaAPI={false}
          checkList={['Max file size: 5 MB', 'File type: .png']}
          error="File exceeded upload limit"
          onChange={onChange}
          onError={onError}
          onReset={onReset}
        />
      </Theme>,
    );

    const input = screen.getByTestId('file');
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    fireEvent.change(input, {
      target: { files: [file] },
    });

    expect(FundSourcesService.upload).not.toHaveBeenCalled();

    expect(onChange).toHaveBeenCalled();
  });

  test('getFileIcon()', () => {
    expect(getFileIcon('text/csv').props.src).toEqual('IMAGE_MOCK');
    expect(getFileIcon('application/vnd.ms-excel').props.src).toEqual(
      'IMAGE_MOCK',
    );
    expect(getFileIcon('application/pdf').props.src).toEqual('IMAGE_MOCK');
  });

  test('Styled: shallow render & match the snapshot', () => {
    Object.keys(StyledComponents).forEach((key) => {
      const StyledComponent = StyledComponents[key];

      const tree = renderer
        .create(
          <Theme>
            <StyledComponent />
          </Theme>,
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
