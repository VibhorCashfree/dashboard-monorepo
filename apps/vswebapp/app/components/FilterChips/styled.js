import styled from 'styled-components';

export const StyledChipsContainer = styled.div`
  && {
    max-width: ${props => props.$maxWidth || 680}px;
    min-height: 40px;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    display: flex;

    .ui.tiny.label {
      box-sizing: content-box;
      background-color: ${props => props.theme.COLORS.bg};
      border-radius: 2px;
      font-size: 0.75rem;
      color: ${props => props.theme.COLORS.body};
      font-family: ${props => props.theme.FONTS.semi_bold};
    }
  }
`;
