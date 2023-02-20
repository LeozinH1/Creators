import { InputHTMLAttributes, forwardRef } from 'react'
import { Wrapper, InputStyle, WarnIcon, InputWrapper } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const Input: React.FC<InputProps> = forwardRef(
  ({ children, hasError, ...props }, ref: React.Ref<HTMLInputElement>) => {
    return (
      <Wrapper className={hasError ? 'error' : ''}>
        <InputWrapper>
          <InputStyle ref={ref} {...props} />
          {hasError && <WarnIcon />}
        </InputWrapper>
        {children}
      </Wrapper>
    )
  }
)

Input.displayName = 'Input'

export default Input
