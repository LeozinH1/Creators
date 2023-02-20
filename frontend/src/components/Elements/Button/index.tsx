import { ButtonHTMLAttributes } from 'react'
import { ButtonStyle } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <ButtonStyle type="submit" {...rest}>
            {children}
        </ButtonStyle>
    )
}

export default Button
