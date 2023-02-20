import { Wrapper } from './styles'
import Image from 'next/image'
import Loading from '../../components/Skeleton'
import { ThemeContext } from 'styled-components'
import { useContext, useState, useEffect } from 'react'

interface ComponentProps {
  photo?: string
  previewPhoto?: string
  username?: string
  dataLoading: boolean
  width: number
  height: number
}

const UserPhoto: React.FC<ComponentProps> = ({
  photo,
  previewPhoto,
  username,
  dataLoading,
  width,
  height,
}) => {
  const themeContext = useContext(ThemeContext)
  const background = themeContext.colors.gray2.replace('#', '')
  const color = themeContext.colors.text.replace('#', '')

  const [photoUrl, setPhotoUrl] = useState('')

  useEffect(() => {
    if (previewPhoto) {
      setPhotoUrl(previewPhoto)
    } else {
      if (photo) {
        setPhotoUrl(`${process.env.BASE_API}/image/${photo}`)
      } else {
        setPhotoUrl(
          `https://ui-avatars.com/api/?length=2&rounded=true&background=${background}&color=${color}&size=200&name=${username}`
        )
      }
    }
  }, [previewPhoto, photo, dataLoading, username])

  return (
    <Wrapper>
      {dataLoading ? (
        <Loading circle width={width} height={height} />
      ) : (
        photoUrl && (
          <Image
            src={photoUrl}
            blurDataURL={photoUrl}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt="User Avatar"
          />
        )
      )}
    </Wrapper>
  )
}

export default UserPhoto
