import {
  Wrapper,
  UserPhotoButton,
  UserIcon,
  CogIcon,
  CreatorIcon,
  NewCreatorIcon,
  DashboardIcon,
  ThemeIcon,
  FeedIcon,
  Auth,
} from './styles'

import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import Button from '../Elements/Button'
import Link from 'next/link'
import Loading from '../Skeleton'
import ToggleSwitch from '../Elements/ToggleSwitch'
import UserPhoto from '../UserPhoto'

const UserDropdown = () => {
  const [state, setState] = useState(false)
  const { dataLoading, isAuthenticated, user, creator, signOut } =
    useContext(AuthContext)
  const { toggleTheme, theme } = useContext(ThemeContext)

  if (!dataLoading) {
    if (isAuthenticated) {
      return (
        <Wrapper onMouseLeave={() => setState(false)} state={state}>
          <UserPhotoButton onMouseEnter={() => setState(true)}>
            <UserPhoto
              photo={user.avatar}
              width={50}
              height={50}
              username={user.name}
              dataLoading={dataLoading}
            />
          </UserPhotoButton>

          <ul>
            <li className="section-title">usuário</li>

            <li>
              <Link
                href={
                  user?.custom_url
                    ? `/user/${user?.custom_url}`
                    : `/user/${user?.id}`
                }
              >
                <a>
                  <UserIcon /> <span>Meu perfil</span>
                </a>
              </Link>
            </li>

            <li>
              <Link href={`/me/settings`}>
                <a>
                  <CogIcon /> <span>Configurações</span>
                </a>
              </Link>
            </li>

            <li className="section-title">criador</li>
            {creator ? (
              <>
                <li>
                  <Link
                    href={
                      creator?.custom_url
                        ? `/creator/${creator?.custom_url}`
                        : `/creator/${creator?.id}`
                    }
                  >
                    <a>
                      <CreatorIcon /> <span>Perfil criador</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/creator/dashboard">
                    <a>
                      <DashboardIcon /> <span>Dashboard criador</span>
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link href={`/creator/new`}>
                  <a>
                    <NewCreatorIcon /> <span>Perfil de Criador</span>
                  </a>
                </Link>
              </li>
            )}
            <li className="section-title">opções</li>
            <li>
              <label>
                <ThemeIcon /> <span>Modo Escuro</span>
                <ToggleSwitch
                  onChange={() => toggleTheme()}
                  checked={theme.title == 'dark'}
                  width={40}
                  height={20}
                />
              </label>
            </li>

            <li>
              <Button onClick={signOut}>Logout</Button>
            </li>
          </ul>
        </Wrapper>
      )
    } else {
      return (
        <Auth>
          <Link href="/auth">
            <a>Registre-se ou Entre</a>
          </Link>
        </Auth>
      )
    }
  } else {
    return (
      <Wrapper>
        <Loading circle width={50} height={50} />
      </Wrapper>
    )
  }
}

export default UserDropdown
