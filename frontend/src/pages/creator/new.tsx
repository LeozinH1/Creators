import type { NextPage, GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useState, useCallback } from 'react'
import { Container, Content } from '../../styles/layout'
import Footer from '../../components/Footer'
import { useForm } from 'react-hook-form'
import Button from '../../components/Elements/Button'
import Input from '../../components/Elements/Input'
import CurrencyInput from '../../components/Elements/CurrencyInput'
import Banner from '../../components/Banner'
import Head from 'next/head'
import UserInfo from '../../components/UserInfo'
import Textarea from '../../components/Elements/Textarea'
import { AxiosError, AxiosResponse } from 'axios'
import { api } from '../../services/api'
import Router from 'next/router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { getAPIClient } from '../../services/axios'

const NewCreator: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { refresh } = useContext(AuthContext)

  const [value, setValue] = useState(0)
  const handleValueChange = useCallback((val) => {
    setValue(val)
  }, [])

  const [name, setName] = useState('Creator Name')
  const nameChanged = useCallback((e) => {
    if (e.target.value) {
      setName(e.target.value)
    } else {
      setName('Creator Name')
    }
  }, [])

  const [description, setDescription] = useState('')
  const descriptionChanged = useCallback((e) => {
    setDescription(e.target.value)
  }, [])

  const handleSave = async () => {
    api
      .post('/creators', {
        creator_name: name,
        description,
        price: value / 100,
      })
      .then((res: AxiosResponse) => {
        refresh()
        Router.push(`/creator/${res.data.id}`)
      })
      .catch((err: AxiosError) => {
        toast.error(`${err.response?.data.message}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        console.log(err.response)
      })
  }

  return (
    <>
      <Head>
        <title>Criar Perfil</title>
      </Head>

      <Banner userBanner={''} previewBanner={''} dataLoading={false} />

      <UserInfo
        avatar={''}
        name={name}
        description={description}
        dataLoading={false}
      />

      <Container>
        <Content background>
          <form onSubmit={handleSubmit(handleSave)}>
            <div>
              <label>Nome</label>
              <Input
                {...register('creator_name', {
                  required: {
                    value: true,
                    message: '',
                  },
                })}
                onBlur={nameChanged}
                placeholder="Creator Name"
                maxLength={50}
                hasError={errors.creator_name}
              />
            </div>

            <div>
              <label>Descrição</label>
              <Textarea
                maxLength={200}
                {...register('creator_description')}
                onBlur={descriptionChanged}
                placeholder="Sem informações."
              />
            </div>

            <div>
              <label>Valor da Assinatura Mensal</label>
              <CurrencyInput
                max={10000}
                onValueChange={handleValueChange}
                value={value}
              />
            </div>

            <Button>Criar Perfil</Button>
          </form>
        </Content>
      </Container>

      <Footer />
    </>
  )
}

export default NewCreator

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check if user logged
  const { 'creators-token': token } = parseCookies(ctx)
  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  // Check if user is already a creator
  const apiClient = getAPIClient(ctx)
  const getCreator = await apiClient.get('/sessions')

  if (getCreator.data.creator) {
    return {
      redirect: {
        destination: `/creator/${
          getCreator.data.creator.custom_url || getCreator.data.creator.id
        }`,
        permanent: false,
      },
    }
  }

  // If user logged and not a creator, return the page
  return {
    props: {},
  }
}
