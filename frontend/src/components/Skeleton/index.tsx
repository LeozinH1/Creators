import Skeleton, { SkeletonTheme, SkeletonProps } from 'react-loading-skeleton'

import { ThemeContext } from 'styled-components'
import { useContext } from 'react'

const loading: React.FC<SkeletonProps> = ({ ...props }) => {
    const themeContext = useContext(ThemeContext)

    return (
        <>
            <SkeletonTheme
                color={themeContext.colors.gray1}
                highlightColor={themeContext.colors.gray2}
            >
                <p>
                    <Skeleton {...props} duration={0.5} />
                </p>
            </SkeletonTheme>
        </>
    )
}

export default loading
