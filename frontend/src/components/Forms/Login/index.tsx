import { FormHTMLAttributes, useContext, useRef, useCallback } from 'react'

import { Teste, RecoverContent } from './styles'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../../contexts/AuthContext'
import Input from '../../Elements/Input'
import Button from '../../Elements/Button'
import Modal, { ModalHandles } from '../../Modal'

import {
  ModalTitle,
  ModalContent,
  ModalClose,
  CloseIcon,
} from '../../Modal/styles'

import { api } from '../../../services/api'
import { AxiosError } from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type FormProps = FormHTMLAttributes<HTMLFormElement>

type SignData = {
  email: string
  password: string
}

type RecoverData = {
  email: string
}

const LoginForm: React.FC<FormProps> = ({ ...rest }) => {
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm()

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm()

  const { signIn } = useContext(AuthContext)

  async function handleSign({ email, password }: SignData) {
    await signIn({
      email,
      password,
    })
  }

  const recoverModal = useRef<ModalHandles>(null)

  const openModal = useCallback((e) => {
    e.preventDefault()
    recoverModal.current?.openModal()
  }, [])

  const closeModal = useCallback(() => {
    recoverModal.current?.closeModal()
  }, [])

  const handleRecover = ({ email }: RecoverData) => {
    api
      .post('/users/remember/password', { user_email: email })
      .then(() => {
        closeModal()
        toast.success(
          'Acesse o email da conta informada e siga as instruções para redefinir sua senha.',
          {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          }
        )
      })
      .catch((err: AxiosError) => {
        toast.error(err.response?.data.message, {
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

  return (
    <>
      <form onSubmit={handleSubmit1(handleSign)}>
        <div>
          <label>Email</label>
          <Input
            type="email"
            {...register1('email', {
              required: {
                value: true,
                message: '',
              },
            })}
            autoComplete="email"
            hasError={errors1.email}
          >
            {errors1.email && (
              <label role="alert">{errors1.email.message}</label>
            )}
          </Input>
        </div>

        <div>
          <label>Senha</label>
          <Input
            type="password"
            {...register1('password', {
              required: {
                value: true,
                message: '',
              },
            })}
            autoComplete="password"
            hasError={errors1.password}
          >
            {errors1.password && (
              <label role="alert">{errors1.password.message}</label>
            )}
          </Input>
        </div>

        <Teste>
          <Button>Entrar</Button>
          <button onClick={(e) => openModal(e)} className="btnLink">
            Esqueci minha senha
          </button>
        </Teste>
      </form>

      <Modal ref={recoverModal}>
        <ModalClose onClick={closeModal}>
          <CloseIcon />
        </ModalClose>

        <ModalTitle>Redefinir Senha</ModalTitle>

        <ModalContent>
          <RecoverContent>
            <p>
              Por favor, preencha o campo abaixo com email da conta que deseja
              redefinir a senha. Enviaremos um email de recuperação para o email
              informado.
            </p>

            <form onSubmit={handleSubmit2(handleRecover)}>
              <label>Email</label>
              <Input
                {...register2('email', {
                  required: {
                    value: true,
                    message: '',
                  },
                })}
                type="email"
                placeholder="email@domain.com"
                hasError={errors2.email}
              >
                {errors2.email && (
                  <label role="alert">{errors2.email.message}</label>
                )}
              </Input>
              <Button>Enviar</Button>
            </form>
          </RecoverContent>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginForm
