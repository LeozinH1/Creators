import { Tooltip, UserBanner, TooltipContent } from './styles'
import Link from 'next/link'
import ItemCircle from '../ItemCircle'
import UserPhoto from '../UserPhoto'
import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import useWindowSize from '../../utils/useWindowSize'

interface ComponentProps {
  user_id: string
  user_name: string
  user_description?: string
  user_banner?: string
  user_avatar?: string
  custom_url?: string
  isCreator?: boolean
  dataLoading: boolean
}

const UserTooltip: React.FC<ComponentProps> = ({
  user_id,
  user_name,
  user_description,
  user_banner,
  user_avatar,
  custom_url,
  isCreator,
  dataLoading,
}) => {
  const [blobBanner, setBlobBanner] = useState('')

  useEffect(() => {
    if (user_banner) {
      setBlobBanner(`${process.env.BASE_API}/image/${user_banner}`)
    }
  }, [user_banner, isCreator])

  const [tooltip, setTooltip] = useState(false)
  const reference = useRef<HTMLDivElement>(null)
  const windowSize = useWindowSize()
  const [tooltipClass, setTooltipClass] = useState('float-center')

  const mouseHover = useCallback(() => {
    setTooltip(true)
  }, [])

  const mouseLeave = useCallback(() => {
    setTooltip(false)
  }, [])

  useEffect(() => {
    if (tooltip) {
      if (reference.current) {
        const screenX = windowSize.width

        if (screenX < 1000) {
          const tooltip_left = reference.current.getBoundingClientRect().x
          const tooltip_width = reference.current.scrollWidth
          const margin_width = 20
          const elementX = tooltip_left + tooltip_width / 2 + margin_width

          // OVERFLOWED |     | >>>
          if (elementX > screenX) {
            // FLOAT <<<
            setTooltipClass('float-left')
          }

          // OVERFLOWED <<< |     |
          if (elementX <= 320) {
            // FLOAT >>>
            setTooltipClass('float-right')
          }
        } else {
          setTooltipClass('float-center')
        }
      }
    }
  }, [tooltip])

  return (
    <ItemCircle>
      {tooltip && (
        <Tooltip ref={reference} className={tooltipClass}>
          <UserBanner>
            {blobBanner && (
              <Image
                src={blobBanner}
                layout="fill"
                objectFit="cover"
                unoptimized={true}
                alt="User Profile Photo"
              />
            )}
          </UserBanner>

          <ItemCircle>
            <UserPhoto
              photo={user_avatar}
              width={80}
              height={80}
              username={user_name}
              dataLoading={dataLoading}
            />
          </ItemCircle>

          <TooltipContent>
            <span> {user_name} </span>
            <p> {user_description || 'Sem informações.'} </p>
          </TooltipContent>
        </Tooltip>
      )}

      <Link
        href={`/${isCreator ? 'creator' : 'user'}/${custom_url || user_id}`}
        key={user_id}
      >
        <a onMouseEnter={mouseHover} onMouseLeave={mouseLeave}>
          {
            <UserPhoto
              photo={user_avatar}
              width={80}
              height={80}
              username={user_name}
              dataLoading={dataLoading}
            />
          }
        </a>
      </Link>
    </ItemCircle>
  )
}

export default UserTooltip
