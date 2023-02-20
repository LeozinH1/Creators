import styled from 'styled-components'

import { Paid } from 'styled-icons/material-rounded'

export const Wrapper = styled.div`
    color: ${(props) => props.theme.colors.gray4};
    font-weight: 700;
    margin-bottom: 30px;

    display: flex;
    align-items: center;
    gap: 20px;

    span {
        font-size: 2rem;
        color: ${(props) => props.theme.colors.gray4};
        font-weight: 700;
    }

    label {
        &::before {
            content: '/ ';
        }
    }

    @media screen and (max-width: 800px) {
        flex-direction: column;
        gap: 5px;

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

export const TotalIcon = styled(Paid)`
    width: 2rem;
    min-width: 2rem;
    color: ${(props) => props.theme.colors.gray4};
`
