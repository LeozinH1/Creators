import { useState, useEffect } from 'react'

type Response = {
    width: number
    height: number
}

const useWindowSize = (): Response => {
    const [windowSize, setWindowSize] = useState({} as Response)

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}

export default useWindowSize
