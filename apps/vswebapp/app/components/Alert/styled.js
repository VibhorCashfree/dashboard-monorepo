import styled from 'styled-components';

const stylesByType = props => {
  const border = props.bordered
    ? `1px solid ${props.theme.COLORS[props.type]}`
    : 'none';

  return `
    background: ${props.theme.COLORS[props.type]}1a;
    border: ${border};
    `;
};

const stylesByCompact = props => (props.compact ? 'width: max-content;' : '');

const styledBySize = props => {
  switch (props.size) {
    case 'sm':
      return `font-size: 0.75rem;
      line-height: 16px;`;

    case 'md':
      return `font-size: 0.875rem;
        line-height: 18px;`;

    default:
      return `font-size: 0.875rem;
        line-height: 18px;`;
  }
};

export const StyledAlert = styled.div`
  ${stylesByType}

  display: flex;
  gap: 1.5rem;
  align-items: center;
  color: ${props => props.theme.COLORS.body};
  font-family: ${props => props.theme.FONTS.semi_bold};
  border-radius: ${props => (props.rounded ? 8 : 0)}px;
  padding: 12px 16px;

  ${stylesByCompact}
`;

export const StyledContent = styled.div`
  ${styledBySize}
  flex: auto;
`;

export const StyledActions = styled.div`
  flex: 1;
  text-align: right;
  min-width: fit-content;
`;
