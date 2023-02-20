import styled from 'styled-components'

export const Wrapper = styled.div`
    background-color: ${(props) => props.theme.colors.gray2};
    padding: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    height: 50px;
    transition: 0.2s;
    width: 100%;

    > label {
        font-weight: 700;
        font-size: 1rem;
        margin: 0 10px;
    }

    > input {
        border: none;
        background: none;
        outline: none;
        width: 100%;
        height: 100%;
        font-weight: 500;
        color: ${(props) => props.theme.colors.text};
        font-size: 1rem;

        margin: 0 !important;
    }

    &:focus-within {
        box-shadow: 0 0 0 1pt ${(props) => props.theme.colors.primary};
    }
`
