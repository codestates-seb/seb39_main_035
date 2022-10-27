import styled, { css } from 'styled-components';
import { darken } from 'polished';

export interface ButtonProps {
  color: 'pink' | 'mint' | 'skyblue' | 'gray';
  disabled?: boolean;
  fullWidth?: boolean;
  middleWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const COLOR = {
  pink: css`
    background: #ffbfc5;
    &:hover {
      background: ${darken(0.05, `#FFBFC5`)};
    }
  `,
  mint: css`
    background: #b3dbd8;
    &:hover {
      background: ${darken(0.05, `#B3DBD8`)};
    }
  `,
  skyblue: css`
    background: #a8d1e7;
    &:hover {
      background: ${darken(0.05, `#A8D1E7`)};
    }
  `,
  gray: css`
    background: #cccccc;
    color: black;
    &:hover {
      background: ${darken(0.05, `#b9b9b9`)};
    }
  `,
};

const DISABLED = css`
  cursor: not-allowed;
  background: #747474;
`;

const FULLWIDTH = css`
  width: 100%;
  justify-content: center;
`;
const MIDDLEWIDTH = css`
  width: 120px;
  margin: 10px;
`;

const Wrapper = styled.button<ButtonProps>`
  cursor: pointer;
  border: none;
  font-size: 0.875rem;
  padding: 0.6rem 1.25rem;
  white-space: nowrap;
  text-align: center;
  color: #f9f9f9;
  border-radius: 0.3rem;
  margin: 0.6rem auto;
  width: 5.6rem;
  ${(props) => props.color && COLOR[props.color]}
  ${(props) => props.disabled && DISABLED}
  ${(props) => props.fullWidth && FULLWIDTH}
  ${(props) => props.middleWidth && MIDDLEWIDTH}
`;

const Button = ({
  onClick,
  color,
  disabled,
  fullWidth,
  middleWidth,
  children,
}: ButtonProps) => {
  return (
    <Wrapper
      onClick={onClick}
      color={color}
      disabled={disabled}
      fullWidth={fullWidth}
      middleWidth={middleWidth}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
