import axios from "axios"
import react, { useEffect } from "react"
import { serverUrl } from "../App"
import { useDispatch } from "react-redux"
import { setuserData } from "../redux/userSlice.js"

function UseGetCurrentUser() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/user/me`, { withCredentials: true })
                dispatch(setuserData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        getCurrentUser()
    }, [])
}

export default UseGetCurrentUser