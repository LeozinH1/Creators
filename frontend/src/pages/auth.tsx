import type { NextPage, GetServerSideProps } from 'next'
import { Container, Wrap, ToggleForm } from '../styles/pages/Auth'
import { parseCookies } from 'nookies'

import FormLogin from '../components/Forms/Login'
import FormRegister from '../components/Forms/Register'
import Head from 'next/head'
import { useState } from 'react'

const Auth: NextPage = () => {
  const [state, setState] = useState(false)

  const toggleState = () => {
    setState(!state)
  }

  return (
    <>
      <Head>
        <title>Auth</title>
      </Head>

      <Container>
        <Wrap>
          <div style={{ display: state ? 'none' : 'block' }}>
            <h1>LOGIN</h1>
            <FormLogin />
            <ToggleForm>
              Não possuí uma conta?
              <button onClick={toggleState}>Criar conta</button>
            </ToggleForm>
          </div>

          <div style={{ display: state ? 'block' : 'none' }}>
            <h1>CADASTRO</h1>
            <FormRegister />
            <ToggleForm>
              Já possuí um conta?
              <button onClick={toggleState}>Fazer login</button>
            </ToggleForm>
          </div>
        </Wrap>
      </Container>
    </>
  )
}

export default Auth

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'creators-token': token } = parseCookies(ctx)

  if (token) {
    return {
      redirect: {
        destination: '/me/settings',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
