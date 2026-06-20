import React from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { serverUrl } from "../App"
import axios from "axios"
import { useState } from "react"

function LiveSite() {

    const { id } = useParams()
    const [html, Sethtml] = useState("")

    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-slug/${id}`, { withCredentials: true })
                Sethtml(result.data.latestCode)

            } catch (error) {
                console.log("site not found" + error)
            }
        }
        handleGetWebsite()
    }, [id])



    return (
        <iframe title="Live Site" srcDoc={html}
            className="w-screen h-screen border-none"
            sandbox="allow-scripts allow-forms" />
    )
}

export default LiveSite