import styled from 'styled-components'

interface StyleProps {
    background?: boolean
}

export const Wrapper = styled.div<StyleProps>`
    display: flex;
    margin-bottom: 50px;
    align-items: flex-start;
    gap: 20px;

    > span {
        min-width: 200px;
        font-weight: 700;
        text-transform: uppercase;
        line-height: 25px;
        color: ${(props) => props.theme.colors.gray4};

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;

        > svg {
            width: 30px;
            min-width: 30px;
        }
    }

    > div {
        background: ${({ background }) =>
            background ? (props) => props.theme.colors.gray1 : 'none'};
        border-radius: 5px;
        padding: ${({ background }) => (background ? '40px' : '0')};
        width: 100%;
        align-self: stretch;
    }

    @media screen and (max-width: 1200px) {
        flex-direction: column;

        > span {
            justify-content: flex-start;
        }
    }
`
