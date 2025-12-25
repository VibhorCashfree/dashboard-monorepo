import styled from 'styled-components';

export const StyledPaper = styled.div`
  & {
    width: 327px;
    padding: 0;
    background-color: ${props => props.theme.COLORS.white};
    border-radius: 8px;
    // min-height: 300px;

    header {
      padding: 1rem;
      background-color: ${props => props.theme.COLORS.bg};
      border-radius: 8px 8px 0 0;
    }

    section {
      padding: 1.5rem;
      padding-top: 1rem;

      a > img.ui.image {
        visibility: hidden;
      }
    }

    &:hover {
      box-shadow: 0px 3px 10px rgba(43, 45, 66, 0.14);

      section a > img.ui.image {
        visibility: visible;
      }
    }
  }
`;
