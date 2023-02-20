import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Response<T> = [T, Dispatch<SetStateAction<T>>]

function usePersistedState<T>(key: string, initialState: T): Response<T> {
    const [state, setState] = useState(initialState)
    const [firstExec, setFirstExec] = useState(true)

    const loadStorageValue = (storageState?: any): void => {
        if (storageState) {
            setState(JSON.parse(storageState))
        } else {
            localStorage.setItem(key, JSON.stringify(initialState))
        }
        setFirstExec(false)
    }

    const updateStorageState = (storageState: any): void => {
        if (storageState !== state) {
            localStorage.setItem(key, JSON.stringify(state))
        }
    }

    useEffect(() => {
        const storageState = localStorage.getItem(key)

        if (firstExec) {
            loadStorageValue(storageState)
        } else {
            updateStorageState(storageState)
        }
    }, [key, state])

    return [state, setState]
}

export default usePersistedState
