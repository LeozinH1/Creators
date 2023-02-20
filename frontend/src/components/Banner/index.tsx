import { Wrapper } from './styles'
import { Container } from '../../styles/layout'
import UserDropdown from '../../components/UserDropdown'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface ComponentProps {
  userBanner?: string
  previewBanner?: string
  dataLoading: boolean
}

const Banner: React.FC<ComponentProps> = ({
  children,
  userBanner,
  previewBanner,
}) => {
  const [bannerUrl, setBannerUrl] = useState('')

  useEffect(() => {
    if (previewBanner) {
      setBannerUrl(previewBanner)
    } else {
      if (userBanner) {
        setBannerUrl(`${process.env.BASE_API}/image/${userBanner}`)
      } else {
        setBannerUrl('')
      }
    }
  }, [userBanner, previewBanner])

  return (
    <>
      <Wrapper>
        {bannerUrl && (
          <Image
            src={bannerUrl}
            blurDataURL={bannerUrl}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="User Banner"
          />
        )}
        <Container>
          <UserDropdown />
          {children}
        </Container>
      </Wrapper>
    </>
  )
}

export default Banner
