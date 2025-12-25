import styled, { css } from 'styled-components';
import { ModalHeader } from '@cashfree-intl/coherent';

export const StepModalHeader = styled(ModalHeader)`
  header {
    font-size: 1.25rem;
    font-family: ${(props) => props.theme.FONTS.medium};

    .ui.tiny.label {
      border-radius: 0;
      background: ${(props) => props.theme.COLORS.placeholder};
      color: ${(props) => props.theme.COLORS.white};
      margin-left: 2rem;
      padding: 2px 8px;
      font-size: 0.75rem;
      line-height: 16px;
      font-family: ${(props) => props.theme.FONTS.semi_bold};
    }
  }
`;

export const BackButtonWrapper = styled.nav<{
  children: React.ReactNode;
  onClick: () => void;
}>`
  display: inline-block;
  cursor: pointer;
  margin-bottom: 1rem;

  * {
    vertical-align: middle;
  }
`;

export const FilterRowContainer = styled.div<{
  className?: string;
  children: React.ReactNode;
}>`
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

const flexStyles = css<{
  className?: string;
  cols?: number;
  direction?: string;
  gap?: number[];
  wrap?: boolean;
  alignItems?: string;
  justifyContent?: string;
  children: React.ReactNode;
}>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: ${(props) =>
    props.gap ? `${props.gap[0] * 8}px ${props.gap[1] * 8}px` : '0px'};
  flex-wrap: ${(props) => props.wrap && 'wrap'};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
`;

const colsStyles: any = (props: { cols?: number }) =>
  props.cols &&
  `
    flex-basis: ${100 / props.cols}%;
    max-width: ${100 / props.cols}%;
  `;

export const FlexGrid = styled.div<{
  className?: string;
  cols?: number;
  direction?: string;
  gap?: number[];
  wrap?: boolean;
  alignItems?: string;
  justifyContent?: string;
  children: React.ReactNode;
}>`
  ${flexStyles}

  > * {
    flex: 1;
    ${colsStyles}
  }
`;

const containStyles = (props: { contain?: boolean; className?: string }) =>
  props.contain &&
  `
width: 100%;
margin-left: 0;
`;

export const Divider = styled.div<{ contain?: boolean; className?: string }>`
  background-color: ${(props) => props.theme.COLORS.bg};
  height: 1px;
  margin: 1.5rem 0;
  width: calc(100% + 3rem);
  margin-left: -1.5rem;

  ${containStyles}
`;

export const BtnContainer = styled.div<{
  className?: string;
  textAlign?: string;
  children: React.ReactNode;
}>`
  text-align: ${(props) => props.textAlign || 'right'};
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
  color: ${(props) => props.theme.COLORS.bodyLight};
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
  }
`;

export const PageHeading = styled.h3`
  font-family: ${(props) => props.theme.FONTS.semi_bold};

  span {
    font-family: ${(props) => props.theme.FONTS.normal};
  }
`;

export const DetailsRow = styled.div<{
  className?: string;
  children: React.ReactNode;
}>`
  display: flex;
  margin-bottom: 16px;
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

export const Action = styled.div<{
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
}>`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    border-radius: 50%;
    background: ${(props) => props.theme.COLORS.hover};
  }
`;

export const StyledBanner = styled.section<{ $backgroundImage: any }>`
  background-image: ${(props) => `url(${props.$backgroundImage})`};
  background-color: ${(props) => props.theme.COLORS.primary};
  background-size: cover;
  padding: 1.5rem 2rem;
  border-radius: 12px;
`;

export const StyledTourTooltip = styled.div`
  padding: 1rem 1.5rem;
  background: linear-gradient(89.91deg, #240253 5.58%, #2b037b 91.7%);
  background-blend-mode: multiply;
  mix-blend-mode: normal;
  border-radius: 12px;
`;

export const ProductTag = styled.div`
  width: max-content;
  padding: 5px 8px;
  background-color: ${(props) => props.theme.COLORS.selected};
  border-radius: 2px;
  color: ${(props) => props.theme.COLORS.primary};
  font-family: ${(props) => props.theme.FONTS.semi_bold};
  font-size: 12px;
  line-height: 15px;
`;

export const CodeWrapper = styled.div<{
  className?: string;
  children: React.ReactNode;
}>`
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.COLORS.disabled};
  border-radius: 6px;
  text-align: left;
  overflow-x: auto;
  white-space: pre-wrap;
  font-size: 12px;
  background: ${(props) => props.theme.COLORS.white};
  line-height: 1.4;

  pre {
    margin: 0;
  }
`;
