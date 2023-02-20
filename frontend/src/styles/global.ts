import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

    :root {
        --toastify-color-dark: ${(props) => props.theme.colors.gray1};
        --toastify-color-success: ${(props) => props.theme.colors.primary};
        --toastify-color-error: ${(props) => props.theme.colors.error};
        --toastify-text-color-light: ${(props) => props.theme.colors.text};
        --toastify-text-color-dark: ${(props) => props.theme.colors.text};
    }


    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font: 500 1rem Poppins, sans-serif;
    }

    html, body {
        background: ${(props) => props.theme.colors.background};
        color: ${(props) => props.theme.colors.text};
    }

    button{
        cursor: pointer;
    }

    a{
        color: ${(props) => props.theme.colors.text};
        text-decoration: none;
        font-weight: 500;

        &:hover{
            filter: grayscale(.2);
        }
    }

    b{
        font-weight: 700;
    }

    hr{
        border: 1px solid ${(props) => props.theme.colors.gray2};
        background: none;
    }

    label[role='alert']{
        color: ${(props) => props.theme.colors.error};
        margin-top: 5px;
        display: block;
        font-size: 0.8rem;
    }


    form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        > button {
            align-self: flex-end;
        }

        div{

          small{
            display: block;
            font-size: 0.8rem;
            margin-bottom: 5px;
          }
        }
    }

    ::-moz-selection {
        color: ${(props) => props.theme.colors.text};
        background: ${(props) => props.theme.colors.primary};
    }

    ::selection {
        color: ${(props) => props.theme.colors.text};
        background: ${(props) => props.theme.colors.primary};
    }


    #nprogress .bar {
      background: ${(props) => props.theme.colors.primary}; !important;
    }

    #nprogress .spinner-icon {
      display: none;
    }


    @keyframes scaleVertical{
        0% {
            transform: scaleY(0)
        }

        60% {
            transform: scaleY(1)
        }

        80% {
            transform: scaleY(0.9)
        }

        100% {
            transform: scaleY(1)
        }
    }



    @keyframes zoomIn{
        0% {
            transform: scale(0)
        }

        50% {
            transform: scale(1)
        }

        70% {
            transform: scale(0.9)
        }

        100% {
            transform: scale(1)
        }
    }
`
