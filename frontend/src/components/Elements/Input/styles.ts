import styled from 'styled-components'
import { ErrorOutline } from 'styled-icons/material'

export const InputWrapper = styled.div`
  position: relative;
`

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.error {
    ${InputWrapper} {
      > input {
        box-shadow: 0 0 0 1pt ${(props) => props.theme.colors.error};
      }
    }
  }
`

export const InputStyle = styled.input`
  width: 100%;
  border: 1px solid #d8d8d8;
  font-size: 13px;

  background-color: ${(props) => props.theme.colors.gray2};
  border: none;
  padding: 15px;
  color: ${(props) => props.theme.colors.text};
  transition: 0.2s;
  border-radius: 4px;
  padding-right: 50px;

  &:focus {
    outline: none;
    border: none;
    box-shadow: 0 0 0 1pt ${(props) => props.theme.colors.primary};
  }
`

export const WarnIcon = styled(ErrorOutline)`
  width: 25px;
  min-width: 25px;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  color: ${(props) => props.theme.colors.error};
`
