import type { NextPage, GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useContext, useState, useEffect, useRef } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Container, Content } from '../../styles/layout'
import { api } from '../../services/api'
import ContentItem from '../../components/ContentItem'
import Banner from '../../components/Banner'
import UserInfo from '../../components/UserInfo'
import ItemSubscribe from '../../components/ItemSubscribe'
import Footer from '../../components/Footer'
import Head from 'next/head'
import Loading from '../../components/Skeleton'
import { EventAvailable } from '@styled-icons/material'

import { useForm } from 'react-hook-form'
import Button from '../../components/Elements/Button'
import Input from '../../components/Elements/Input'
import Textarea from '../../components/Elements/Textarea'
import strToUrl from '../../utils/stringToUrl'

import { Settings, VpnKey } from '@styled-icons/material'
import { AxiosError, AxiosResponse } from 'axios'

import ChangeBanner from '../../components/ChangeBanner'
import ChangePhoto, { ComponentHandles } from '../../components/ChangePhoto'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface changePassword {
  old_pass: string
  new_pass: string
  conf_pass: string
}

interface editUser {
  name?: string
  custom_url?: string
  description?: string
}

interface Subscription {
  id: string
  creator_id: {
    id: string
    user_id: string
    creator_name: string
    description: string
    avatar?: string
    banner?: string
    custom_url?: string
    plan_id: string
    price: number
    status: boolean
    created_at: Date
    updated_at: Date
  }
  user_id: string
  status: string
  approve_link: string
  next_billing: Date
  subscription_id: string
  cancel_reason?: string
  payer_id: string
  created_at: Date
  updated_at: Date
}

const UserDashboard: NextPage = () => {
  const { dataLoading, user, refresh } = useContext(AuthContext)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [subsLoading, setSubsLoading] = useState(true)

  const {
    formState: { errors: errors1 },
    register: register1,
    handleSubmit: handleSubmit1,
    setValue: setValue1,
    getValues: getValues1,
  } = useForm()

  const {
    formState: { errors: errors2 },
    register: register2,
    handleSubmit: handleSubmit2,
    getValues: getValues2,
    setError: setError2,
    clearErrors: clearErrors2,
  } = useForm()

  useEffect(() => {
    api.get('/subscribe').then((response) => {
      setSubscriptions(response.data)
      setSubsLoading(false)
    })
  }, [])

  const changePassword = ({
    old_pass,
    new_pass,
    conf_pass,
  }: changePassword): void => {
    api
      .post('/users/update/password', {
        old_pass,
        new_pass,
        conf_pass,
      })
      .then((res: AxiosResponse) => {
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

  const handleUpdateUser = async ({
    name,
    custom_url,
    description,
  }: editUser) => {
    api
      .post('/users/update', {
        name,
        custom_url,
        description,
      })
      .then(() => {
        refresh()
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
        toast.success('Informações alteradas com sucesso!', {
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
      .catch((err) => {
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

  const convertToUrl = () => {
    const val = getValues1()
    setValue1('custom_url', strToUrl(val.custom_url))
  }

  const [previewBanner, setPreviewBanner] = useState('')

  const refBanner = useRef<HTMLInputElement>(null)
  const refPhoto = useRef<HTMLInputElement>(null)

  const changePhotoRef = useRef<ComponentHandles>(null)

  const checkPass = (pass1: string, pass2: string) => {
    if (pass1 === pass2) {
      clearErrors2('passMatch')
    } else {
      setError2('passMatch', {
        type: 'passMatch',
        message: 'As senhas digitadas não coincidem',
      })
    }
  }

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <Banner
        userBanner={user?.banner}
        previewBanner={previewBanner}
        dataLoading={dataLoading}
      >
        <ChangeBanner
          setPreviewBanner={setPreviewBanner}
          refBanner={refBanner}
          type="users"
        />
      </Banner>

      <UserInfo
        avatar={user?.avatar}
        name={user?.name}
        description={user?.description}
        dataLoading={dataLoading}
        editable
        openEditModal={() => changePhotoRef.current?.openModal()}
      />

      <ChangePhoto
        avatar={user?.avatar}
        user_name={user?.name}
        refPhoto={refPhoto}
        type="users"
        dataLoading={dataLoading}
        ref={changePhotoRef}
      />

      <Container>
        <Content>
          <ContentItem background>
            <span>
              <Settings /> editar
            </span>
            <div>
              <form onSubmit={handleSubmit1(handleUpdateUser)}>
                <div>
                  <label>Nome de Exibição</label>
                  <Input
                    {...register1('name', {
                      minLength: {
                        value: 3,
                        message:
                          'Seu nome deve possuir no minimo 3 caracteres.',
                      },
                      maxLength: {
                        value: 30,
                        message:
                          'Seu nome deve possuir no máximo 30 caracteres.',
                      },
                      pattern: {
                        value: /^[a-z0-9 _]+$/i,
                        message:
                          'Seu nome não pode conter caracteres especiais.',
                      },
                    })}
                    placeholder={user?.name}
                    hasError={errors1.name}
                  >
                    {errors1.name && (
                      <label role="alert">{errors1.name.message}</label>
                    )}
                  </Input>
                </div>

                <div>
                  <label>URL Personalizada</label>
                  <small>
                    Link personalizado para acessar seu perfil de usuário.
                  </small>
                  <Input
                    {...register1('custom_url', {
                      minLength: {
                        value: 4,
                        message:
                          'Sua url personalizada deve possuir no mínimo 4 caracteres.',
                      },
                      maxLength: {
                        value: 30,
                        message:
                          'Sua url personalizada deve possuir no máximo 30 caracteres.',
                      },
                    })}
                    hasError={errors1.custom_url}
                    placeholder={user?.custom_url || user?.id}
                    onBlur={convertToUrl}
                  >
                    {errors1.custom_url && (
                      <label role="alert">{errors1.custom_url.message}</label>
                    )}
                  </Input>
                </div>

                <div>
                  <label>Sobre Mim</label>
                  <Textarea
                    {...register1('description')}
                    placeholder={user?.description || 'Sem informações.'}
                    maxLength={200}
                  />
                </div>
                <Button> Salvar </Button>
              </form>
            </div>
          </ContentItem>
          <ContentItem>
            <span>
              <EventAvailable />
              minhas assinaturas
            </span>
            <div>
              {subsLoading ? (
                <Loading circle width={80} height={80} />
              ) : subscriptions.length > 0 ? (
                subscriptions.map((subscription: Subscription) => (
                  <ItemSubscribe
                    key={subscription.id}
                    creatorId={subscription.creator_id.id}
                    creatorName={subscription.creator_id.creator_name}
                    creatorAvatar={subscription.creator_id.avatar}
                    subscriptionId={subscription.id}
                    nextBill={subscription.next_billing}
                    price={subscription.creator_id.price}
                    custom_url={subscription.creator_id.custom_url}
                    status={subscription.status}
                    dataLoading={false}
                  />
                ))
              ) : (
                <span>Você não tem nenhuma assinatura ativa.</span>
              )}
            </div>
          </ContentItem>
          <ContentItem background>
            <span>
              <VpnKey />
              alterar senha
            </span>
            <div>
              <form onSubmit={handleSubmit2(changePassword)}>
                <div>
                  <label>Senha Atual</label>
                  <Input
                    type="password"
                    {...register2('old_pass', {
                      required: {
                        value: true,
                        message: '',
                      },
                    })}
                    hasError={errors2.old_pass}
                  >
                    {errors2.old_pass && (
                      <label role="alert">{errors2.old_pass.message}</label>
                    )}
                  </Input>
                </div>

                <div>
                  <label>Nova Senha</label>
                  <Input
                    type="password"
                    {...register2('new_pass', {
                      minLength: {
                        value: 6,
                        message:
                          'Sua senha deve possuir no mínimo 6 caracteres.',
                      },
                      maxLength: {
                        value: 30,
                        message:
                          'Sua senha deve possuir no máximo 30 caracteres.',
                      },
                      required: {
                        value: true,
                        message: '',
                      },
                      onChange: (event) =>
                        checkPass(event.target.value, getValues2('conf_pass')),
                    })}
                    hasError={errors2.new_pass || errors2.passMatch}
                  >
                    {errors2.new_pass && (
                      <label role="alert">{errors2.new_pass.message}</label>
                    )}
                  </Input>
                </div>

                <div>
                  <label>Confirmar Senha</label>
                  <Input
                    type="password"
                    {...register2('conf_pass', {
                      required: {
                        value: true,
                        message: '',
                      },
                      onChange: (event) =>
                        checkPass(event.target.value, getValues2('new_pass')),
                    })}
                    hasError={errors2.conf_pass || errors2.passMatch}
                  >
                    {errors2.passMatch && (
                      <label role="alert">{errors2.passMatch.message}</label>
                    )}
                  </Input>
                </div>

                <Button>Salvar</Button>
              </form>
            </div>
          </ContentItem>
        </Content>
      </Container>

      <Footer />
    </>
  )
}

export default UserDashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'creators-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
