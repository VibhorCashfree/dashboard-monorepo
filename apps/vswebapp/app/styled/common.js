import styled, { css } from 'styled-components';
import { Space } from '@cashfree-intl/coherent';

export const BackButtonWrapper = styled.nav`
  display: inline-block;
  cursor: pointer;
  margin-bottom: 1rem;

  * {
    vertical-align: middle;
  }
`;

export const FilterRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  margin-top: 1rem;
  align-items: flex-start;

  > div {
    display: flex;
    align-items: center;

    &:first-of-type {
      align-items: flex-start;
      button {
        margin-right: 1rem;
      }
    }
  }
`;

const flexStyles = css`
  display: flex;
  flex-direction: ${props => props.direction};
  gap: ${props => (props.gap ? props.gap * 8 : 0)}px;
  flex-wrap: ${props => props.wrap && 'wrap'};
  align-items: ${props => props.alignItems};
  justify-content: ${props => props.justifyContent};
`;

const colsStyles = props =>
  props.cols &&
  `        
    flex-basis: ${100 / props.cols}%;
    max-width: ${100 / props.cols}%;      
  `;

export const FlexGrid = styled.div`
  ${flexStyles}

  > * {
    flex: 1;
    ${colsStyles}
  }
`;

const containStyles = props =>
  props.contain &&
  `
width: 100%;
margin-left: 0;
`;

export const Divider = styled.div`
  background-color: ${props => props.theme.COLORS.bg};
  height: 1px;
  margin: ${props => (props.noMargin ? 0 : '1.5rem 0')};
  width: calc(100% + 3rem);
  margin-left: -1.5rem;

  ${containStyles}
`;

export const BtnContainer = styled.div`
  text-align: ${props => props.textAlign || 'right'};
  margin-top: 1.5rem;
`;

export const BatchDetailsFilterWrapper = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  align-items: center;

  & > div:first-child {
    border: 1px solid #75757580;
    border-radius: 6px;
    margin-right: 1rem;
  }
`;

export const HoverCopy = styled.div`
  color: ${props => props.theme.COLORS.bodyLight};
  position: relative;

  span {
    max-width: calc(100% - 28px);
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: inherit;
  }

  svg {
    display: none;
  }

  &:hover svg {
    display: inline-block;
    cursor: pointer;
    border-radius: 50%;
    background: ${props => props.theme.COLORS.hover};
  }
`;

export const EmptyTableView = styled.div.attrs({ children: 'No record found' })`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 126px;
  background: ${props => props.theme.COLORS.white};
  border-radius: 8px;
  font-size: 1rem;
`;

export const PageHeading = styled.h3`
  font-family: ${props => props.theme.FONTS.semi_bold};
  margin-bottom: 2rem;

  span {
    font-family: ${props => props.theme.FONTS.normal};
  }
`;

export const DetailsRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  gap: 16px;

  > div:nth-child(1) {
    flex: 3;
  }

  > div:nth-child(2) {
    flex: 5;
  }

  > div:nth-child(3) {
    flex: 3;
  }

  > div:nth-child(4) {
    flex: 5;
  }
`;

export const AlignedRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: flex-start;
  gap: 16px;

  > div {
    flex: 1;
    text-align: left;
  }
`;

export const ModalRow = styled.div`
  display: flex;
  margin-bottom: 12px;
  gap: 16px;
  width: 100%;
  align-items: center;

  > div:nth-child(1) {
    flex: ${props => (props.singleRow ? 2.2 : 5)};
    text-align: left;
  }

  > div:nth-child(2) {
    flex: ${props => (props.singleRow ? 9 : 7)};
    text-align: left;
  }
`;

export const Action = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background: ${props => props.theme.COLORS.hover};
  }
`;

export const StyledBanner = styled.section`
  background-image: ${props => `url(${props.$backgroundImage})`};
  background-color: ${props => props.theme.COLORS.primary};
  background-size: cover;
  border-radius: 12px;
`;

export const ProductTag = styled.div`
  width: max-content;
  padding: 5px 8px;
  background-color: ${props => props.theme.COLORS.selected};
  border-radius: 2px;
  color: ${props => props.theme.COLORS.primary};
  font-family: ${props => props.theme.FONTS.semi_bold};
  font-size: 12px;
  line-height: 15px;
`;

export const StyledRateBanner = styled(Space)`
  background: ${props => props.theme.COLORS.warning}1a;
`;
