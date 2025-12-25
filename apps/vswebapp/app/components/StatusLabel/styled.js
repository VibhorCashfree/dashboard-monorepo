import styled from 'styled-components';

// Utils
import { getStatusColor } from './utils';

const getAnimationStyles = props => {
  const color = getStatusColor(props.$status, props.theme.COLORS);

  return props.animation
    ? `
    background: ${color} -webkit-gradient(linear, 100% 0, 0 0, from(${color}), color-stop(0.5, #ffffff), to(${color}));
    background-repeat: no-repeat;
    -webkit-background-size: 30px 100%;
    -webkit-background-clip: text;
    -webkit-animation-name: shimmer;
    -webkit-animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    -webkit-text-fill-color: transparent;`
    : '';
};

const getStylesByProps = props => {
  switch (true) {
    case props.animation:
      return getAnimationStyles(props);

    case props.filled: {
      const color = getStatusColor(props.$status, props.theme.COLORS);
      const background = `${color}18`;

      return `
        background: ${background};
        padding: 3px 8px;
        border-radius: 2px;  
    `;
    }
  }
};

export const StyledLabel = styled.span`
  color: ${props => getStatusColor(props.$status, props.theme.COLORS)};
  line-height: initial;
  font-size: 0.875rem;
  display: inline-block;

  ${getStylesByProps};
`;
