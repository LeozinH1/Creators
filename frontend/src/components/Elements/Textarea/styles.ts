import styled from 'styled-components'

export const TextareaStyle = styled.textarea`
    width: 100%;
    height: 100%;
    font-size: 13px;
    padding: 15px;

    color: ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.gray2};
    resize: none;

    border-radius: 4px;

    border: none;
    outline: none;
    transition: 0.2s;

    &:focus {
        box-shadow: 0 0 0 1pt ${(props) => props.theme.colors.primary};
    }
`

interface WrapperProps {
    max: number
}

export const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    position: relative;

    > label {
        margin-bottom: 5px;
        display: block;
    }

    // Character count
    > div {
        font-size: 0.9rem;
        position: absolute;
        right: 20px;
        bottom: 10px;
        color: ${({ max }) =>
            max < 1
                ? (props) => props.theme.colors.error
                : (props) => props.theme.colors.gray4};
    }
`
