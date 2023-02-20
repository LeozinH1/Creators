import { Wrapper } from './styles'

interface ComponentProps {
    background?: boolean
}

const Button: React.FC<ComponentProps> = ({ children, background }) => {
    return <Wrapper background={background}>{children}</Wrapper>
}

export default Button
