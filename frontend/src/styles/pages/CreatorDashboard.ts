import styled from 'styled-components'
import { RotateRight, Paid } from '@styled-icons/material'
import { Paypal } from 'styled-icons/fa-brands'

export const WithdrawStatus = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    > div {
        display: flex;
        gap: 5px;
        align-items: center;
    }

    > span {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 10px;
    }
`

export const StatusIcon = styled(RotateRight)`
    min-width: 30px;
    max-width: 30px;
    min-height: 30px;
    max-height: 30px;
    color: ${(props) => props.theme.colors.gray4};
`

export const ValueIcon = styled(Paid)`
    min-width: 30px;
    max-width: 30px;
    min-height: 30px;
    max-height: 30px;
    color: ${(props) => props.theme.colors.gray4};
`

export const ReceiverIcon = styled(Paypal)`
    min-width: 30px;
    max-width: 30px;
    min-height: 30px;
    max-height: 30px;
    color: ${(props) => props.theme.colors.gray4};
`
