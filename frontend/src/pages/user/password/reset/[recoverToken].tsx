import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { Container, Box, Title } from '../../../../styles/pages/RecoverPassword'
import Input from '../../../../components/Elements/Input'
import Button from '../../../../components/Elements/Button'
import { useForm } from 'react-hook-form'
import { api } from '../../../../services/api'
import { AxiosError, AxiosResponse } from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type resetData = {
  new_pass: string
  conf_pass: string
}

const Auth: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    getValues,
  } = useForm()

  const resetPassword = async ({ new_pass, conf_pass }: resetData) => {
    await api
      .post('/users/reset/password', {
        recoverToken: Router.query.recoverToken,
        new_pass,
        conf_pass,
      })
      .then((res: AxiosResponse) => {
        console.log(res.data)
        toast.success('Senha alterada com sucesso!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        Router.push('/auth')
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
    <>
      <Head>
        <title>Redefinir Senha</title>
      </Head>

      <Container>
        <Box>
          <Title>REDEFINIR SENHA</Title>
          <form onSubmit={handleSubmit(resetPassword)}>
            <div>
              <label>Nova senha</label>
              <Input
                type="password"
                {...register('new_pass', {
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
                    checkPass(event.target.value, getValues('conf_pass')),
                })}
                hasError={errors.new_pass || errors.passMatch}
              >
                {errors.new_pass && (
                  <label role="alert">{errors.new_pass.message}</label>
                )}
              </Input>
            </div>

            <div>
              <label>Confirmar senha</label>
              <Input
                type="password"
                {...register('conf_pass', {
                  required: {
                    value: true,
                    message: '',
                  },
                  onChange: (event) =>
                    checkPass(event.target.value, getValues('new_pass')),
                })}
                hasError={errors.conf_pass || errors.passMatch}
              >
                {errors.passMatch && (
                  <label role="alert">{errors.passMatch.message}</label>
                )}
              </Input>
            </div>
            <Button>Redefinir Senha</Button>
          </form>
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  }
}

export default Auth
