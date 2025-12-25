import styled from 'styled-components';

export const StyledBanner = styled.section<{
  $backgroundImage: any;
  children: React.ReactNode;
}>`
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-color: ${(props) => props.theme.COLORS.primary};
  background-size: cover;
  padding: 2rem;
  border-radius: 12px;
  min-height: 294px;

  display: flex;
  justify-content: space-between;

  .text-section {
    max-width: 600px;

    .description {
      max-width: 90%;

      @media only screen and (min-width: 1250px) {
        max-width: none;
      }
    }
  }

  .embed-section {
    align-self: center;
    max-width: 434px;
    width: 45%;
    @media only screen and (min-width: 1440px) {
      max-width: 600px;
    }

    .ui.image {
      border-radius: 8px;
      border: 1px ${(props) => props.theme.COLORS.white}66 solid;
      box-shadow: 0 0 0 6px ${(props) => props.theme.COLORS.white}1a;
    }
  }

  p {
    max-width: 680px;
  }
`;

export const StyledTitle = styled.div`
  line-height: 28px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

export const StyledFeature = styled.div<{ children: React.ReactNode }>`
  .title {
    position: relative;
    padding-bottom: 18px;
    font-size: 20px;
    line-height: 24px;
    font-family: ${(props) => props.theme.FONTS.semi_bold};
    margin-bottom: 22px;

    &:after {
      background-color: ${(props) => props.theme.COLORS.primary};
      left: 0;
      bottom: 0;
      content: '';
      display: block;
      height: 2px;
      position: absolute;
      width: 49px;
    }
  }
`;
