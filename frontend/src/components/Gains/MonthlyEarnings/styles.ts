import styled from 'styled-components'

import { DateRange } from 'styled-icons/material-rounded'

export const Wrapper = styled.div`
    color: ${(props) => props.theme.colors.gray4};
    font-weight: 700;

    display: flex;
    align-items: center;
    gap: 20px;

    span {
        color: ${(props) => props.theme.colors.green};
        font-weight: 700;
        font-size: 3rem;
    }

    label {
        &::before {
            content: '/ ';
        }
    }

    @media screen and (max-width: 800px) {
        flex-direction: column;
        gap: 5px;

        border-bottom: 1px solid ${(props) => props.theme.colors.gray2};
        padding-bottom: 20px;
        margin-bottom: 20px;

        > svg {
            display: none;
        }

        label {
            &::before {
                content: '';
            }
        }
    }
`

export const MonthlyIcon = styled(DateRange)`
    width: 2rem;
    min-width: 2rem;
    color: ${(props) => props.theme.colors.gray4} !important;
`
