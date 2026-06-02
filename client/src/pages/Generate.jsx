import React from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { useState } from "react"
import axios from "axios"
import { serverUrl } from "../App"

function Generate() {
    const navigate = useNavigate()
    const [prompt, Setprompt] = useState("")

    const handelGenerateWebsite = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/website/generate`, { prompt }, { withCredentials: true })
            console.log(result)
        } catch (error) {
            console.log("error" + error)
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white">
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate("/")} className="p-2 rounded-lg hover:bg-white/10 transition"><ArrowLeft size={16} /></button>
                        <h1 className="text-lg font-semibold">GenWeb.ai</h1>
                    </div>
                </div>

            </div>
            <div className="max-w-6xl mx-auto py-16 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight md-5 ">Build Websites with
                        <span className="block bg-linear-to-r from-white to-zinc-400 bg-clip-text ">Real AI Power</span>
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mt-3 mx-auto">This process may take several minutes.
                        GenWeb.ai focuses on quality, not shortcuts.
                    </p>
                </motion.div>
                <div className="mb-14">
                    <h1 className="text-xl font-semibold mb-2">Describe your website</h1>
                    <div className="relative">
                        <textarea onChange={(e) => Setprompt(e.target.value)}
                            value={prompt} placeholder="Describe your website in detail..."
                            className="w-full h-56 p-6 rounded-xl bg-black/60 border border-white/10 outline-none
                            resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20"></textarea>

                    </div>
                </div>
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-14 py-4 rounded-xl font-semibold text-lg bg-white text-black"
                        onClick={handelGenerateWebsite}>
                        Generate Website
                    </motion.button>
                </div>
            </div>
        </div>

    )
}

export default Generate 