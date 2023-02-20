import { createContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type User = {
    id: string
    name: string
    email: string
    banner?: string
    avatar: string
    custom_url?: string
    description?: string
}

type Creator = {
    id: string
    user_id: string
    creator_name: string
    description: string
    avatar: string
    banner: string
    plan_id: string
    price: number
    custom_url: string
    google_ua: string
    status: boolean
    created_at: Date
}

type SignInData = {
    email: string
    password: string
}

type AuthContextType = {
    dataLoading: boolean
    user: User
    creator: Creator
    isAuthenticated: boolean
    signIn: (data: SignInData) => Promise<void>
    signOut: () => void
    refresh: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User>({} as User)
    const [creator, setCreator] = useState<Creator>({} as Creator)
    const [dataLoading, setDataLoading] = useState(true)
    const [refreshData, setRefreshData] = useState(false)

    const refresh = () => setRefreshData(!refreshData)

    const isAuthenticated = !!user.id

    useEffect(() => {
        const { 'creators-token': token } = parseCookies()

        if (token) {
            api.get('/sessions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                setUser(response.data.user)
                setCreator(response.data.creator)
                setDataLoading(false)
            })
        } else {
            setDataLoading(false)
        }
    }, [refreshData])

    const updateUser = async () => {
        // TO DO
    }
    const updateCreator = async () => {
        // TO DO
    }

    const signIn = async ({ email, password }: SignInData) => {
        api.post('/sessions', {
            email,
            password,
        })
            .then((response) => {
                setCookie(null, 'creators-token', response.data.token, {
                    maxAge: 60 * 60 * 24, // 1 day
                    path: '/',
                })

                api.defaults.headers[
                    'Authorization'
                ] = `Bearer ${response.data.token}`

                setUser(response.data.user)
                setCreator(response.data.creator)
                setDataLoading(false)

                Router.push(
                    `/user/${
                        response.data.user.custom_url || response.data.user.id
                    }`
                )
            })
            .catch((err) => {
                toast.error(err.response.data.message, {
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

    const signOut = () => {
        // destroyCookie({}, 'creators-token')

        setCookie(null, 'creators-token', '', {
            maxAge: -1,
            path: '/',
        })

        Router.reload()
    }

    return (
        <AuthContext.Provider
            value={{
                dataLoading,
                user,
                creator,
                isAuthenticated,
                signIn,
                signOut,
                refresh,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
