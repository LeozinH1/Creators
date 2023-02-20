import {
    Wrapper,
    ProfilePhoto,
    UserName,
    UserDescription,
    EditPhotoBtn,
} from './styles'

import Loading from '../Skeleton'
import UserPhoto from '../UserPhoto'

import { useState } from 'react'

interface ComponentProps {
    avatar?: string
    name?: string
    description?: string
    dataLoading: boolean
    editable?: boolean
    openEditModal?: () => void
}

const UserInfo: React.FC<ComponentProps> = ({
    children,
    avatar,
    name,
    description,
    dataLoading,
    editable,
    openEditModal,
}) => {
    const [btnClass, setBtnClass] = useState('')

    const mouseEnter = () => setBtnClass('hovered')
    const mouseLeave = () => setBtnClass('')

    return (
        <Wrapper>
            <ProfilePhoto onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                <UserPhoto
                    photo={avatar}
                    username={name}
                    width={130}
                    height={130}
                    dataLoading={dataLoading}
                />
                {editable && (
                    <EditPhotoBtn className={btnClass} onClick={openEditModal}>
                        Alterar
                    </EditPhotoBtn>
                )}
            </ProfilePhoto>

            <UserName>
                {dataLoading ? <Loading width={250} height={50} /> : name}
            </UserName>

            <UserDescription>
                {dataLoading ? (
                    <>
                        <Loading width={300} height={20} />
                        <Loading width={350} height={20} />
                        <Loading width={300} height={20} />
                    </>
                ) : description ? (
                    description
                ) : (
                    'Sem informações.'
                )}
            </UserDescription>

            {children}
        </Wrapper>
    )
}

export default UserInfo
