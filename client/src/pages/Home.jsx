import React, { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import LoginModel from "../components/LoginModel"
import { useDispatch, useSelector } from "react-redux"
import { Coins } from "lucide-react"
import axios from "axios"
import { serverUrl } from "../App"
import { setuserData } from "../redux/userSlice.js"
import { useNavigate } from "react-router-dom"

function Home() {

    const highlights = [
        "AI Generated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ]

    const [openLogin, SetopenLogin] = useState(false)
    const [openProfile, SetopenProfile] = useState(false)
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setuserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-lg font-semibold">
                        GenWeb.ai
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="hidden md:inline text-zinc-400 hover:text-white cursor-pointer"
                            onClick={() => navigate("/pricing")}>
                            Pricing
                        </div>

                        {userData && <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5
                        border border-white/5 text-sm cursor-pointer hover:bg-white/10 transition"
                            onClick={() => navigate("/pricing")}>
                            <Coins className="text-yellow-400" />
                            <span className="text-zinc-300">Credits</span>
                            <span>{userData.credits}</span>
                            <span className="font-semibold">+</span>
                        </div>
                        }
                        {!userData ? <button onClick={() => { SetopenLogin(true) }} className="px-4 py-2 rounded-lg border border-white/20 cursor-pointer hover:border-white/10 text-sm">
                            Get Started
                        </button>
                            :
                            <div className="relative">
                                <button className="flex items-center" onClick={() => { SetopenProfile(!openProfile) }}>
                                    <img src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} className="w-9 h-9 rounded-full border border-white/20 object-cover" />
                                </button>
                                <AnimatePresence>
                                    {openProfile &&
                                        <>
                                            <motion.div
                                                initial={{ y: -10, opacity: 0, scale: 0.95 }}
                                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className="absolute  right-0 mt-4 w-60 z-50 bg-[#0b0b0b] rounded-xl
                                                border border-white/10 shadow-2xl overflow-hidden">
                                                <div className="px-4 py-3 border-b border-white/10">
                                                    <p className="text-sm font-medium truncate">{userData.name}</p>
                                                    <p className="text-sx text-zinc-300 truncate">{userData.email}</p>
                                                </div>
                                                <button onClick={() => navigate("/dashboard")} className="w-full px-4 py-3 text-left text-sm hover:bg-white/5 ">
                                                    Dashboard
                                                </button>
                                                <button onClick={handleLogOut} className="w-full px-4 py-3 text-left text-red-400 text-sm hover:bg-white/5">
                                                    Logout
                                                </button>
                                            </motion.div>
                                        </>
                                    }
                                </AnimatePresence>
                            </div>
                        }
                    </div>
                </div>
            </motion.div>

            <section className="pt-44 pb-32 text-center">
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight">Build Stunning websites <br />
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">With AI</span>
                </motion.h1>
                <motion.p
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg">
                    Describe your idea and let AI generate a modern,
                    responsive, productive-ready website.
                </motion.p>

                <button onClick={() => userData ? navigate("/dashboard") : SetopenLogin(true)} className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12 cursor-pointer">
                    {userData ? "Go to Dashboard" : "Get Started"}
                </button>

            </section>

            <section className="max-w-7xl mx-auto px-6 py-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {highlights.map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-white/5 border border-white/5 p-8">
                            <h1 className="text-xl font-semibold mb-3">{h}</h1>
                            <p className="text-zinc-400 text-sm">
                                GenWeb.ai builds real websites - clean code,
                                animations, responsiveness and scalable structure.
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <footer className="border-t border-white/10 py-10 text-sm text-center text-zinc-500">
                &copy; {new Date().getFullYear()} GenWeb.ai
            </footer>

            {openLogin && <LoginModel open={openLogin} onClose={() => { SetopenLogin(false) }} />}
        </div>
    )
}

export default Home