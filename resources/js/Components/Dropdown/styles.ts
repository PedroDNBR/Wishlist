import { Theme } from '@/styles/styled';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { readableColor } from 'polished';
import styled, { css } from 'styled-components';

export const Content = styled(DropdownMenu.Content)`
  ${({ theme }) => css`
    background: ${theme.white[100]};
    color: #000;
    margin: 0 10px;
    padding: 0.25rem;
    border-radius: 0 7.5px 7.5px 7.5px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    z-index: 9999;
  `}
`;

export const Portal = styled(DropdownMenu.Portal)`
  ${({ theme }) => css`
    background: ${theme.white[100]};
    z-index: 9999;
  `}
`;

interface TriggerProps {
  theme: Theme;
  error?: boolean;
}

export const Trigger = styled(DropdownMenu.Trigger)`
  ${({ theme, error }: TriggerProps) => css`
    background: ${theme.white[100]};
    color: #000;
    border-radius: 100rem;
    font-weight: bold;
    width: 1.35rem;
    height: 1.35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    ${error && css`
      border: 1px solid ${theme.red};
    `}
  `}
`;

interface ItemProps {
  theme: object;
  color: string;
}

export const Item = styled(DropdownMenu.Item)`
  ${({ color }: ItemProps) => css`
    color: ${readableColor(color)};
    background: ${color};
    padding: 0.4rem;
    border-radius: 7.5px;
  `}
`;

