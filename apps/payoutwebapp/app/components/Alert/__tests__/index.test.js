import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Theme, Button } from '@cashfree-intl/coherent';

// Components
import Alert from '..';

// Styled
import * as StyledComponents from '../styled';

const shallowRenderer = new ShallowRenderer();

describe('Alert', () => {
  test('shallow render & match the snapshot', () => {
    shallowRenderer.render(
      <Alert className="mb-3" type="success" compact bordered rounded>
        <Alert.Content size="md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Alert.Content>
        <Alert.Actions>
          <Button size="small" primary>
            Porro a quos
          </Button>
        </Alert.Actions>
      </Alert>,
    );

    const output = shallowRenderer.getRenderOutput();
    expect(output).toMatchSnapshot();
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
