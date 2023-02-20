import type { NextPage, GetServerSideProps } from 'next'
import { AuthContext } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { Container, Content } from '../../styles/layout'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Banner from '../../components/Banner'
import Footer from '../../components/Footer'
import Button from '../../components/Elements/Button'
import Link from 'next/link'
import Loading from '../../components/Skeleton'
import UserInfo from '../../components/UserInfo'
import Formatter from '../../utils/formatCurrency'
import { parseCookies } from 'nookies'
import { format, subHours } from 'date-fns'
import Modal, { ModalHandles } from '../../components/Modal'
import { ThumbUp as LikeFill } from '@styled-icons/material'
import { ThumbUp as LikeLine } from '@styled-icons/material-outlined'
import Router from 'next/router'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import Input from '../../components/Elements/Input'
import Textarea from '../../components/Elements/Textarea'
import Switch from '../../components/Elements/ToggleSwitch'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Users } from '@styled-icons/fa-solid'
import { UserStar } from '@styled-icons/remix-fill'

import {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  ChangeEvent,
} from 'react'

import {
  LoadingIcon,
  SubscribeButton,
  SubscriptionLoading,
  PaypalIcon,
  CheckIcon,
  BuyFooter,
  BuyInfo,
  PostWrapper,
  PostItem,
  PostBanner,
  PostContent,
  NewPost,
  PostFooter,
  ShowMore,
  PostInfo,
  EndPosts,
  DelPost,
  BannerPreview,
  LoadImage,
  RemoveImage,
} from '../../styles/pages/CreatorProfile'

import {
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalClose,
  CloseIcon,
} from '../../components/Modal/styles'

interface CreatorData {
  id: string
  user_id: string
  creator_name: string
  description: string
  avatar: string
  banner: string
  plan_id: string
  status: boolean
  price: number
  created_at: Date
}

type Like = {
  id: string
  postId: string
  user_id: string
  created_at: Date
  updated_at: Date
}

type Post = {
  id: string
  creator_id: string
  banner: string
  title: string
  body: string
  public: boolean
  created_at: string
  updated_at: string
  likes?: Like[]
}

type PostForm = {
  banner: string
  title: string
  body: string
  isPublic: boolean
}

type PageProps = {
  base_api: string
}

const CreatorProfile: NextPage<PageProps> = ({ base_api }) => {
  const [creatorData, setCreatorData] = useState<CreatorData>()
  const [isLoading, setIsLoading] = useState(false)
  const [isMember, setIsMember] = useState(true)
  const [isOwn, setIsOwn] = useState(false)
  const [creatorLoading, setCreatorLoading] = useState(true)
  const [btnClass, setBtnClass] = useState('')
  const { isAuthenticated, creator, user } = useContext(AuthContext)
  const router = useRouter()
  const creator_id = router.query.creator_id

  useEffect(() => {
    if (creator_id) {
      api
        .get(`/creators/${creator_id}`)
        .then((response) => {
          setCreatorData(response.data)
          setCreatorLoading(false)

          if (isAuthenticated) {
            if (response.data.user_id == user?.id) {
              setIsOwn(true)
            } else {
              setIsOwn(false)
            }
          }
        })
        .catch((err) => {
          router.push('/error_on_get_creator_profile')
          console.log(err.response.data)
        })

      if (isAuthenticated) {
        api
          .get(`/subscribe/${creator_id}/ismember`)
          .then((response) => {
            if (response.data.is_member) {
              setIsMember(true)
            } else {
              setIsMember(false)
            }
          })
          .catch(() => {
            setIsMember(false)
          })
      }
    }
  }, [creator_id, creator, user])

  const toggleClass = (): void => {
    if (btnClass == '') {
      setBtnClass('visible')
    } else {
      setBtnClass('')
    }
  }

  const handleSubscribe = (): void => {
    setIsLoading(true)
    api
      .post(`/subscribe/${creator_id}`)
      .then((response) => {
        setIsLoading(false)
        router.push(response.data.approve_link)
      })
      .catch((err) => {
        console.log(err.response.data)
        setIsLoading(false)
      })
  }

  const subscribeModal = useRef<ModalHandles>(null)
  const openModal = useCallback(() => {
    subscribeModal.current?.openModal()
  }, [])

  const closeModal = useCallback(() => {
    subscribeModal.current?.closeModal()
  }, [])

  const newPostModal = useRef<ModalHandles>(null)
  const openNewPostModal = useCallback(() => {
    newPostModal.current?.openModal()
  }, [])

  const closeNewPostModal = useCallback(() => {
    newPostModal.current?.closeModal()
  }, [])

  const [posts, setPosts] = useState<Post[]>([])
  const [endPosts, setEndPosts] = useState(false)
  const [hasPosts, setHasPosts] = useState(false)

  useEffect(() => {
    api
      .get(`/posts/${Router.query.creator_id}/1`)
      .then((res) => {
        setPosts(res.data.posts)
        if (res.data.results > 0) {
          setHasPosts(true)
        }

        if (res.data.total_pages == res.data.click) {
          setEndPosts(true)
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const [clicks, setClicks] = useState(2)
  const showMore = async () => {
    api
      .get(`/posts/${Router.query.creator_id}/${clicks}`)
      .then((res) => {
        setPosts([...posts, ...res.data.posts])
        setClicks(clicks + 1)

        if (res.data.total_pages == res.data.click) {
          setEndPosts(true)
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  //////////////////////////////////////////////////////// LIKE & UNLIKE

  const like = async (post_id: string) => {
    api
      .post(`/posts/like/${post_id}`)
      .then((response) => {
        if (!posts) return
        const newPosts: Post[] = posts.map((post: Post) =>
          post.id == response.data.id ? response.data : post
        )

        setPosts(newPosts)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  const unlike = async (post_id: string) => {
    api
      .post(`/posts/unlike/${post_id}`)
      .then((response) => {
        if (!posts) return
        const newPosts: Post[] = posts.map((post: Post) =>
          post.id == response.data.id ? response.data : post
        )

        setPosts(newPosts)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }

  //////////////////////////////////////////////////////// NEW POST

  const [isPublic, setIsPublic] = useState(false)
  const toggleIsPublic = () => {
    setIsPublic(!isPublic)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const createPost = async (data: PostForm) => {
    const formData = new FormData()

    if (refBanner.current.files[0]) {
      formData.append(
        'banner',
        refBanner.current.files[0],
        refBanner.current.files[0].name
      )
    }

    const requestData = {
      ...data,
      isPublic,
    }
    formData.append('data', JSON.stringify(requestData))

    api
      .post('/posts', formData)
      .then((res) => {
        toast.success('Publicado com sucesso!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        closeNewPostModal()
        setPosts([res.data, ...posts])
      })
      .catch((err) => {
        toast.error('Ocorreu um erro ao criar a publicação!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        })
        console.log(err)
      })
  }

  const [previewBanner, setPreviewBanner] = useState('')
  const refBanner = useRef<any>()

  const bannerChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const blob = URL.createObjectURL(e.target.files[0])
      setPreviewBanner(blob)
    } else {
      setPreviewBanner('')
    }
  }

  const [managePosts, setManagePosts] = useState(false)
  const toggleManagePosts = () => {
    setManagePosts(!managePosts)
  }

  const delPost = async (post_id: string) => {
    api
      .delete(`/posts/${post_id}`)
      .then(() => {
        setPosts(posts.filter((post) => post.id !== post_id))
      })
      .catch((err) => {
        console.log(err.response)
      })
  }

  const loadImage = (e: any) => {
    e.preventDefault()
    refBanner.current?.click()
  }

  const removeImage = (e: any) => {
    e.preventDefault()
    if (refBanner.current) {
      refBanner.current.value = ''
      setPreviewBanner('')
    }
  }

  return (
    <>
      <Head>
        <title>Creator</title>
      </Head>

      <Banner userBanner={creatorData?.banner} dataLoading={creatorLoading} />

      <Container>
        <UserInfo
          avatar={creatorData?.avatar}
          name={creatorData?.creator_name}
          description={creatorData?.description}
          dataLoading={creatorLoading}
        >
          {creatorLoading ? (
            <Loading width={200} height={50} />
          ) : (
            !isOwn &&
            isAuthenticated && (
              <SubscribeButton>
                {isMember ? (
                  <Button disabled>
                    <CheckIcon /> Membro!
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={openModal}
                      onMouseEnter={toggleClass}
                      onMouseLeave={toggleClass}
                    >
                      Vire Membro
                    </Button>
                    <div className={btnClass}>
                      <span>VANTAGENS</span>
                      <ul>
                        <li>- Acesso a publicações.</li>
                        <li>- Sorteios.</li>
                        <li>- Cupons de desconto.</li>
                        <li>- Chat dos membros.</li>
                        <li>- Divulgue seu conteúdo.</li>
                      </ul>
                    </div>
                    <span>{Formatter(creatorData?.price)}</span>
                  </>
                )}
              </SubscribeButton>
            )
          )}
        </UserInfo>

        <Navbar />

        <Content>
          <PostWrapper>
            {isAuthenticated && isOwn && (
              <>
                <Button
                  onClick={toggleManagePosts}
                  style={{
                    alignSelf: 'flex-end',
                    filter: managePosts ? '' : 'grayscale(1)',
                  }}
                >
                  Gerenciar Posts
                </Button>

                <NewPost>
                  <h1>PUBLICAÇÕES PARA MEMBROS</h1>
                  <button onClick={openNewPostModal}>
                    Compartilhe algo interessante com sua comunidade...
                  </button>
                </NewPost>
              </>
            )}

            {posts &&
              posts.map((post) => (
                <>
                  <PostItem>
                    {managePosts && (
                      <DelPost>
                        <button
                          onClick={() => delPost(post.id)}
                          title="Excluir"
                        >
                          -
                        </button>
                      </DelPost>
                    )}

                    {post.banner && (
                      <PostBanner>
                        <Image
                          src={`${base_api}/image/${post.banner}`}
                          layout="fill"
                          objectFit="cover"
                          objectPosition={'center'}
                          alt="Post Image"
                          blurDataURL={`${base_api}/image/${post.banner}`}
                          placeholder="blur"
                        />
                      </PostBanner>
                    )}

                    <PostContent>
                      {post.title && <h1>{post.title}</h1>}

                      <p>{post.body}</p>

                      <PostFooter>
                        <div>
                          {isAuthenticated &&
                            (post.likes?.find(
                              (like) => like.user_id == user.id
                            ) ? (
                              <button onClick={() => unlike(post.id)}>
                                <LikeFill width={25} />
                              </button>
                            ) : (
                              <button onClick={() => like(post.id)}>
                                <LikeLine width={25} />
                              </button>
                            ))}

                          <span>{post.likes?.length} Likes</span>
                        </div>

                        <PostInfo>
                          {post.public && (
                            <>
                              <Users width={25} title="Vísivel para todos" />
                              <span>|</span>
                            </>
                          )}
                          <span>
                            {format(
                              subHours(new Date(post.created_at), 3),
                              'HH:mm - dd/MM/yy'
                            )}
                          </span>
                        </PostInfo>
                      </PostFooter>
                    </PostContent>
                  </PostItem>
                </>
              ))}

            {hasPosts ? (
              endPosts ? (
                <EndPosts>
                  <span>Não há mais posts ptara mostrar...</span>
                </EndPosts>
              ) : (
                <ShowMore>
                  <button onClick={showMore}>mostrar mais</button>
                </ShowMore>
              )
            ) : (
              <EndPosts>
                <span>Não há publicações para mostrar...</span>
              </EndPosts>
            )}
          </PostWrapper>
        </Content>
      </Container>

      <Footer />

      <Modal ref={newPostModal}>
        <ModalClose onClick={closeNewPostModal}>
          <CloseIcon />
        </ModalClose>

        <ModalTitle>NOVA PUBLICAÇÃO</ModalTitle>

        <ModalContent>
          <form onSubmit={handleSubmit(createPost)}>
            <BannerPreview>
              {previewBanner && (
                <Image
                  src={previewBanner}
                  layout="fill"
                  objectFit="cover"
                  alt="Banner Preview"
                />
              )}

              {previewBanner ? (
                <RemoveImage onClick={(e) => removeImage(e)}>x</RemoveImage>
              ) : (
                <LoadImage onClick={(e) => loadImage(e)}>+</LoadImage>
              )}
            </BannerPreview>

            <input
              type="file"
              onChange={bannerChanged}
              ref={refBanner}
              accept="image/*"
              style={{ display: 'none' }}
            />

            <div>
              <label>Titulo</label>
              <Input {...register('title')} />
            </div>

            <div>
              <label>Conteúdo *</label>
              <Textarea
                {...register('body', {
                  required: {
                    value: true,
                    message: 'Este campo é obrigatório.',
                  },
                })}
              />
              {errors.body && <label role="alert">{errors.body.message}</label>}
            </div>

            <Switch
              text="Público"
              onChange={toggleIsPublic}
              checked={isPublic}
            />

            <Button
              style={{
                alignSelf: 'stretch',
              }}
            >
              Publicar
            </Button>
          </form>
        </ModalContent>
      </Modal>

      <Modal ref={subscribeModal}>
        <ModalTitle>DETALHES DA COMPRA</ModalTitle>

        <ModalContent>
          <BuyInfo>
            <p>
              Assinatura mensal do canal <b>{creatorData?.creator_name}</b>.
            </p>
            <span> {Formatter(creatorData?.price)} </span>
          </BuyInfo>
        </ModalContent>

        <ModalFooter>
          <BuyFooter>
            <span>Renovação automática após 30 dias.</span>

            <p>
              Você pode cancelar a renovação automática quando quiser, basta
              acessar o painel de usuário. Ao realizar o pagamento você aceita
              os
              <Link href={'/terms'}>
                <a> Termos de Uso </a>
              </Link>{' '}
              do PLATAFORM_NAME.
            </p>

            <div>
              <button onClick={closeModal}> voltar </button>

              <div>
                <SubscriptionLoading isLoading={isLoading}>
                  <LoadingIcon />
                </SubscriptionLoading>

                <Button onClick={handleSubscribe}>
                  <PaypalIcon /> Pagar com Paypal
                </Button>
              </div>
            </div>
          </BuyFooter>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default CreatorProfile

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // // Check if user logged
  // const { 'creators-token': token } = parseCookies(ctx)
  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/auth',
  //       permanent: false,
  //     },
  //   }
  // }

  // Return page
  return {
    props: {
      base_api: process.env.BASE_API,
    },
  }
}
