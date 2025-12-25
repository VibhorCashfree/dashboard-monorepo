import styled from 'styled-components';

export const SectionHeader = styled.p<{
  active: boolean;
  children: React.ReactNode;
}>`
  background-color: ${(props) =>
    props.active ? props.theme.COLORS.selected : props.theme.COLORS.white};
  padding: 0.5rem 2rem;
  font-family: ${(props) => props.theme.FONTS.medium};
  display: flex;
  justify-content: space-between;

  i.chevron.icon {
    color: ${(props) => props.theme.COLORS.primary};
  }
`;
