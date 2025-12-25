import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

// Components
import Wrapper from '__tests__/components/Wrapper';

// Pages
import Summary from '..';

jest.mock('containers/Summary', () => {
  // eslint-disable-next-line global-require
  const { Summary } = jest.requireActual('containers/Summary');

  const props = {
    availableBalance: {
      availableBalance: '0',
      balance: '9988386845.61',
      overdraft: '10000',
      fundsOnHold: '33997369.61',
    },
  };

  return {
    __esModule: true,
    Summary: () => () => <Summary {...props} />,
    default: () => () => <Summary {...props} />,
  };
});

const renderer = new ShallowRenderer();

describe('In Summary page', () => {
  test('shallow render & match the snapshot', () => {
    renderer.render(
      <Wrapper>
        <Summary />
      </Wrapper>,
    );

    const output = renderer.getRenderOutput();
    expect(output).toMatchSnapshot();
  });
});
