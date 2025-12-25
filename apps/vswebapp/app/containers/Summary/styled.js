import styled from 'styled-components';

export const StyledSwitch = styled.div`
  display: flex;
  gap: 8px;
  background: ${props => props.theme.COLORS.white};
  box-shadow: 0px 2px 6px rgb(0 0 0 / 12%);
  border-radius: 4px;
  cursor: pointer;

  span {
    padding: 5px 20px;
    flex: 1;
    margin: 4px;
    color: ${props => props.theme.COLORS.bodyLight};

    &.selected {
      background: ${props => props.theme.COLORS.primary};
      border-radius: 4px;
      color: ${props => props.theme.COLORS.white};
    }

    &:nth-of-type(1) {
      margin-right: 0;
    }

    &:nth-of-type(2) {
      margin-left: 0;
    }
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  margin-top: 1.5rem;
  position: relative;

  .recharts-wrapper {
    flex: auto 0 0;

    .recharts-surface {
      path.recharts-rectangle {
        filter: drop-shadow(0px 1px 0px white);
      }

      position: relative;
      // left: -36px;

      .recharts-yAxis,
      .recharts-xAxis {
        .recharts-cartesian-axis-tick {
          font-size: 0.75rem;
        }
      }
    }

    .recharts-tooltip-wrapper {
      z-index: 2;
    }
  }

  .custom-tooltip {
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.12);
  }

  .custom-legend {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-self: flex-start;
    gap: 8px;

    a {
      flex: 1;
      flex-basis: calc(50% - 8px);
      max-width: calc(50% - 8px);
      position: relative;
      border: 1px solid #e6e5e8;
      border-radius: 8px;
      padding: 8px 10px;
      align-self: flex-start;
      display: flex;
      text-decoration: none;

      .ui.image {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 6px;
        display: none;
      }

      &:hover {
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);
        .ui.image {
          display: block;
        }
      }

      .count {
        margin-top: 6px;
      }
    }
  }
`;

export const StyledTooltipInfo = styled.div`
  display: flex;
  margin-bottom: 8px;

  .details {
    & > * {
      margin: 0;
    }

    .title {
      font-size: 10px;
      line-height: 14px;
      color: #847f8d;
    }

    .count-value {
      font-family: ${props => props.theme.FONTS.medium};
      font-size: 10px;
      line-height: 16px;
      color: #2b2d42;
    }
  }

  &:after {
    content: ' ';
    position: absolute;
    top: 0%;
    left: 0%;
    margin-left: -10px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent white transparent transparent;
  }
`;

export const StyledColorDot = styled.span`
  height: 10px;
  width: 10px;
  background-color: ${props => props.$color};
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 0.5rem;
`;
