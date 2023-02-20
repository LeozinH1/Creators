import { FormHTMLAttributes, useState, useContext, useCallback } from 'react'

import { Teste } from './styles'
import { useForm } from 'react-hook-form'
import { api } from '../../../services/api'
import { AuthContext } from '../../../contexts/AuthContext'

import Input from '../../Elements/Input'
import Button from '../../Elements/Button'
import ToggleSwitch from '../../Elements/ToggleSwitch'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type FormProps = FormHTMLAttributes<HTMLFormElement>

interface RegisterData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
  is_creator: boolean
  price: number
}

import CurrencyInput from '../../Elements/CurrencyInput'

const RegisterForm: React.FC<FormProps> = ({ ...rest }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    getValues,
  } = useForm()
  const { signIn } = useContext(AuthContext)

  const [is_creator, setIsCreator] = useState(false)
  const toggleIsCreator = () => setIsCreator(!is_creator)

  const [value, setValue] = useState(0)
  const handleValueChange = useCallback((val) => {
    setValue(val)
  }, [])

  async function handleSignup({
    name,
    email,
    password,
    passwordConfirmation,
  }: RegisterData) {
    await api
      .post('/users', {
        name,
        email,
        password,
        passwordConfirmation,
        isCreator: is_creator,
        price: value / 100,
      })
      .then(async (response) => {
        await signIn({
          email,
          password,
        })
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
      })
  }

  const checkPass = (pass1: string, pass2: string) => {
    if (pass1 === pass2) {
      clearErrors('passMatch')
    } else {
      setError('passMatch', {
        type: 'passMatch',
        message: 'As senhas digitadas não coincidem',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <div>
        <label>Nome</label>
        <Input
          type="text"
          {...register('name', {
            required: {
              value: true,
              message: '',
            },
            pattern: {
              value: /^[a-z0-9 _]+$/i,
              message: 'Seu nome não pode conter caracteres especiais.',
            },
          })}
          autoComplete="name"
          hasError={errors.name}
        >
          {errors.name && <label role="alert">{errors.name.message}</label>}
        </Input>
      </div>

      <div>
        <label>Email</label>
        <Input
          type="email"
          {...register('email', {
            required: {
              value: true,
              message: '',
            },
          })}
          autoComplete="email"
          hasError={errors.email}
        >
          {errors.email && <label role="alert">{errors.email.message}</label>}
        </Input>
      </div>

      <div>
        <label>Senha</label>
        <Input
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: '',
            },
            minLength: {
              value: 6,
              message: 'Sua senha deve possuir no mínimo 6 caracteres.',
            },
            maxLength: {
              value: 30,
              message: 'Sua senha deve possuir no máximo 30 caracteres.',
            },
            onChange: (event) =>
              checkPass(event.target.value, getValues('passwordConfirmation')),
          })}
          autoComplete="password"
          hasError={errors.password || errors.passMatch}
        >
          {errors.password && (
            <label role="alert">{errors.password.message}</label>
          )}
        </Input>
      </div>

      <div>
        <label>Confirmar Senha</label>
        <Input
          type="password"
          {...register('passwordConfirmation', {
            required: {
              value: true,
              message: '',
            },
            onChange: (event) =>
              checkPass(event.target.value, getValues('password')),
          })}
          hasError={errors.passwordConfirmation || errors.passMatch}
        >
          {errors.passMatch && (
            <label role="alert">{errors.passMatch.message}</label>
          )}
        </Input>
      </div>

      {is_creator && (
        <>
          <div>
            <label>Valor mensal</label>
            <CurrencyInput
              max={10000}
              onValueChange={handleValueChange}
              value={value}
            />
          </div>
        </>
      )}

      <Teste>
        <ToggleSwitch
          width={60}
          height={30}
          checked={is_creator}
          onChange={toggleIsCreator}
          handleDiameter={30}
          text={'Perfil de Criador'}
        />

        <Button>Cadastrar</Button>
      </Teste>
    </form>
  )
}

export default RegisterForm
