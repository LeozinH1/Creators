import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;

    > label {
        color: ${(props) => props.theme.colors.gray4};
        font-weight: 700;
        font-size: 0.85rem;
    }

    @media screen and (max-width: 800px) {
        flex-direction: column;
        align-items: stretch;
    }
`
