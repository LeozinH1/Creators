import styled from 'styled-components'
import { PhotoCamera, Save, Clear } from 'styled-icons/material'
import Button from '../Elements/Button'

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;

  > input {
    display: none;
  }
`
export const ButtonSecondary = styled(Button)`
  padding: 8px 13px;

  &:hover {
    box-shadow: none;
  }

  @media screen and (max-width: 1200px) {
    span {
      display: none;
    }
  }
`

export const CancelButton = styled(ButtonSecondary)`
  background-color: ${(props) => props.theme.colors.error};
`

export const CameraIcon = styled(PhotoCamera)`
  width: 20px;
  min-width: 20px;
  color: #fff;
`

export const SaveIcon = styled(Save)`
  width: 25px;
  min-width: 25px;
  color: #fff;
`

export const ClearIcon = styled(Clear)`
  width: 25px;
  min-width: 25px;
  color: #fff;
`
