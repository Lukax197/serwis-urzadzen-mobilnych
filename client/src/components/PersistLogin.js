import {Outlet} from "react-router-dom"
import { useState, useEffect } from "react"
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import useLocalStorage from "../hooks/useLocalStorage"
import decodeJWT from 'jwt-decode'

const PresistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const {auth, setAuth} = useAuth()
    const [persist] = useLocalStorage('persist', true)

    useEffect(() => {
        let isMounted = true
        
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            }
            catch (err) {
                console.err(err)
            }
            finally {
                isMounted && setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

        return () => isMounted = false
    }, [])

    useEffect(() => {
        if(auth?.accessToken) {
            const accessToken = auth?.accessToken
            const username = decodeJWT(auth?.accessToken).UserInfo.username
            const roles = decodeJWT(auth?.accessToken).UserInfo.roles
            const id = decodeJWT(auth?.accessToken).UserInfo.id
            setAuth({accessToken, id, username, roles})
        }
    }, [isLoading])

    return (
        <>
            <Outlet />
        </>
    )
}

export default PresistLogin