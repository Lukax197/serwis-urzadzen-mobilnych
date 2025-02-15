import axios from "../api/axios"
import useAuth from "./useAuth"

const useLogout = () => {
    const { auth, setAuth } = useAuth()

    const logout = async () => {
        setAuth({})
        try {
            const response = await axios.get('/auth/logout', {
                    withCredentials: true
                }
            )
        }
        catch (err) {
            console.log(err)
        }
    }

    return logout
}

export default useLogout