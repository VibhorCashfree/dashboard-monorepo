import styled from 'styled-components';
import type { AlertProps, StyledProps } from './types';

const stylesByType = (props: StyledProps) => {
  const border = props.bordered
    ? `1px solid ${props.theme.COLORS[props.type || 'info']}`
    : 'none';

  return `
    background: ${props.theme.COLORS[props.type || 'info']}1a;      
    border: ${border};
    `;
};

const stylesByCompact = (props: AlertProps) =>
  props.compact ? 'width: max-content;' : '';

const styledBySize = (props: {
  size?: 'sm' | 'md';
  children: React.ReactNode;
}) => {
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

export const StyledAlert = styled.div<StyledProps>`
  ${stylesByType}

  display: flex;
  gap: 1.5rem;
  align-items: center;
  color: ${(props: StyledProps) => props.theme.COLORS.body};
  font-family: ${(props: StyledProps) => props.theme.FONTS.semi_bold};
  border-radius: ${(props: StyledProps) => (props.rounded ? 8 : 0)}px;
  padding: 12px 16px;

  ${stylesByCompact}
`;

export const StyledContent = styled.div<{
  size?: 'sm' | 'md';
  children: React.ReactNode;
}>`
  ${styledBySize}
  flex: auto;
`;

export const StyledActions = styled.div`
  flex: 1;
  text-align: right;
  min-width: fit-content;
`;
