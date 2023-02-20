import styled from 'styled-components'

export const ButtonStyle = styled.button`
    transition: 0.1s;
    padding: 13px 35px;
    border: none;
    background-color: ${(props) => props.theme.colors.primary};
    color: #ffff;
    border-radius: 4px;
    font-size: 0.9rem;

    &:hover {
        filter: grayscale(0.2);
        box-shadow: 0px 0px 8px ${(props) => props.theme.colors.primary};
    }

    &:disabled {
        background-color: ${(props) => props.theme.colors.gray2};
        cursor: default;
        color: ${(props) => props.theme.colors.gray4};

        &:hover {
            box-shadow: none;
        }
    }
`
