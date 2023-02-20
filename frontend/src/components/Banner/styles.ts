import styled from 'styled-components'

import {
  Wrapper as UserDropdown,
  Auth as UserAuth,
} from '../UserDropdown/styles'

import { Wrapper as ChangeBanner } from '../ChangeBanner/styles'

export const Wrapper = styled.div`
  height: 300px;
  width: 100%;
  background: linear-gradient(
    100deg,
    ${(props) => props.theme.colors.gray1} 0%,
    ${(props) => props.theme.colors.background} 100%
  );

  position: relative;

  ${UserDropdown}, ${UserAuth} {
    position: absolute;
    top: 13px;
    right: 0;
  }

  ${ChangeBanner} {
    position: absolute;
    right: 0;
    bottom: 10px;
  }
`
