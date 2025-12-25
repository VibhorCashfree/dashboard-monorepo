import styled from 'styled-components';

export const SectionHeader = styled.p`
  background-color: ${props =>
    props.active ? props.theme.COLORS.selected : props.theme.COLORS.white};
  padding: 0.5rem 2rem;
  font-family: ${props => props.theme.FONTS.medium};
  display: flex;
  justify-content: space-between;

  i.chevron.icon {
    color: ${props => props.theme.COLORS.primary};
  }
`;

export const StyledInputDropdown = styled.div`
  .ui.dropdown > .dropdown.icon {
    margin: 0;
    padding-left: 0.5rem;
    padding-right: 2px;
    color: ${props => props.theme.COLORS.primary};
    font-family: Icons;

    &:before {
      content: '\f078';
    }
  }

  .ui.dropdown .text {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 110px;
    white-space: nowrap;
    vertical-align: bottom;
    text-align: left;
  }

  .ui.active.visible.dropdown > .dropdown.icon {
    &:before {
      content: '\f077';
    }
  }

  .visible.menu.transition {
    margin-top: 0.5rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    border: none;

    .item {
      &.selected.active {
        background: ${props => props.theme.COLORS.selected};
        font-family: ${props => props.theme.FONTS.medium};
      }

      &:hover {
        background: ${props => props.theme.COLORS.hover};
      }
    }

    span.text {
      font-size: 0.875rem;
    }
  }

  .ui.label > img {
    height: auto !important;
  }
`;
