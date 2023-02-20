import styled from 'styled-components'

import { Close } from '@styled-icons/ionicons-solid'

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 2000;
  top: 0;

  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media screen and (max-width: 1200px) {
    background-color: none;
    backdrop-filter: none;
  }
`

export const ModalBox = styled.div`
  background-color: ${(props) => props.theme.colors.gray1};
  width: 600px;
  border-radius: 5px;
  padding: 30px;
  overflow: hidden;
  position: relative;
  animation: scaleVertical 0.3s linear both;

  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`

export const CloseIcon = styled(Close)``

export const ModalClose = styled.button`
  position: absolute;
  right: 20px;
  width: 40px;
  height: 40px;
  background: none;
  color: ${(props) => props.theme.colors.text};
  border: none;
  border-radius: 5px;
  transition: 0.2s;

  ${CloseIcon} {
    color: ${(props) => props.theme.colors.gray3};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.gray2};
  }
`

export const ModalTitle = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
`

export const ModalContent = styled.div`
  margin: 20px 0;
`

export const ModalFooter = styled.div``
