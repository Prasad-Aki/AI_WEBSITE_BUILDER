import axios from 'axios'
import react, { useRef } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { useState } from 'react'
import { Code2, MessageSquare, Monitor, Rocket, Send, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Editor from '@monaco-editor/react'
import { useDispatch } from 'react-redux'
import { updateCredits } from '../redux/userSlice'

function WebEditor() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [website, Setwebsite] = useState(null)
    const [error, Seterror] = useState("")
    const iframeRef = useRef(null)
    const [code, Setcode] = useState("")
    const [messages, Setmessages] = useState([])
    const [prompt, Setprompt] = useState("")
    const [updateLoading, SetupdateLoading] = useState(false)
    const [thinkingidx, Setthinkingidx] = useState(0)
    const [showCode, SetshowCode] = useState(false)
    const [showfullPreview, SetshowfullPreview] = useState(false)
    const [showChat, SetshowChat] = useState(false)

    const thinkingSteps = [
        "Understanding your request...",
        "Planning layout changes...",
        "Improving responsiveness...",
        "Applying animations...",
        "Finalizing update...",
    ]

    const handleUpdate = async () => {
        SetupdateLoading(true)
        Setmessages((m) => [...m, { role: "user", content: prompt }])
        Setprompt("")
        try {
            const result = await axios.post(`${serverUrl}/api/website/update/${id}`, { prompt }, { withCredentials: true })
            SetupdateLoading(false)
            Setmessages((m) => [...m, { role: "ai", content: result.data.message }])
            Setcode(result.data.code)
            if (result.data.remainingcredits !== undefined) {
                dispatch(updateCredits(result.data.remainingcredits))
            }
        } catch (error) {
            SetupdateLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        if (!updateLoading) return
        const i = setInterval(() => {
            Setthinkingidx((i) => (i + 1) % thinkingSteps.length)
        }, 1200)
        return () => clearInterval(i)
    }, [updateLoading])

    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
                Setwebsite(result.data)
                Setcode(result.data.latestCode)
                Setmessages(result.data.conversation)
            } catch (error) {
                console.log(error)
                Seterror(error.response?.data?.message)
            }
        }
        handleGetWebsite()
    }, [id])

    useEffect(() => {
        if (!iframeRef.current || !code) return
        const blob = new Blob([code], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        iframeRef.current.src = url

        return () => URL.revokeObjectURL(url)
    }, [code])

    if (error) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-red-400'>
                {error}
            </div>
        )
    }

    if (!website) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                Loading...
            </div>
        )
    }

    const handleDeploy = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${website._id}`, { withCredentials: true })
            console.log(result)
            Setwebsite(prev => ({ ...prev, deployed: true }))
            window.open(`${result.data.url}`, "_blank")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen w-screen flex bg-black text-white overflow-hidden'>
            <aside className='hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80    '>
                <Header />
                <>
                    <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`max-w-[85%] 
                    ${m.role === "user" ? "ml-auto" : "mr-auto"}`}>
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                        ${m.role === "user" ? "bg-white text-black" : "bg-white/5 border border-white/10 text-zinc-200"}`}>
                                    {m.content}
                                </div>
                            </div>
                        ))}

                        {updateLoading && <div className='max-w-[85%] mr-auto'>
                            <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic'>
                                {thinkingSteps[thinkingidx]}
                            </div>
                        </div>}

                    </div>
                    <div className='p-3 border-t border-white/10'>
                        <div className='flex gap-2'>
                            <input type="text" name="" id="" className='flex-1 resize-none rounded-2xl px-4 py-3 bg-white/10
                        border border-white/10 text-sm outline-none'  placeholder='Describe Changes...'
                                onChange={(e) => Setprompt(e.target.value)} value={prompt} />
                            <button className='px-3 py-3 bg-white text-black rounded-2xl'
                                onClick={handleUpdate}><Send size={14} /></button>
                        </div>
                    </div>
                </>

            </aside>

            <div className='flex-1 flex flex-col'>
                <div className='h-14 px-4 flex items-center justify-between border-b border-white/10 bg-black/80 '>
                    <span className='text-xs text-zinc-400'>Live Preview</span>
                    <div className='flex gap-2'>
                        {website.deployed ? "" :
                            <button className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500
                        text-sm font-semibold hover:scale-105 transition'
                                onClick={handleDeploy}><Rocket size={14} />Deploy</button>
                                }

                        <button className='p-2 lg:hidden' onClick={() => SetshowChat(true)}><MessageSquare size={18} /></button>

                        <button onClick={() => SetshowCode(true)} className='p-2'><Code2 size={18} /></button>
                        <button onClick={() => SetshowfullPreview(true)} className='p-2'><Monitor size={18} /></button>
                    </div>

                </div>
                <iframe ref={iframeRef} className='flex-1 w-full bg-white' sandbox="allow-scripts allow-forms" />
            </div>

            <AnimatePresence>
                {showCode && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] 
                    bg-[#1e1e1e] flex flex-col'>
                        <div className='h-12 px-4 flex justify-between items-center border-b border-white/10
                        bg-[#1e1e1e]'>
                            <span className='text-sm font-medium'>index.html</span>
                            <button onClick={() => SetshowCode(false)}><X size={18} /></button>
                        </div>
                        <Editor
                            // height="92vh"
                            theme="vs-dark"
                            value={code}
                            language='html'
                            onChange={(v) => Setcode(v)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showfullPreview && (
                    <motion.div
                        className='fixed inset-0 bg-black z-[9999]'>
                        <iframe className='w-full h-full bg-white' srcDoc={code || "<h1>Loading...</h1>"}></iframe>
                        <button
                            className='absolute top-4 right-4 p-2 bg-black/70
                        rounded-lg'
                            onClick={() => SetshowfullPreview(false)}><X /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showChat && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        className='fixed inset-0 bg-black z-[9999]'>

                        <Header />
                        <>
                            <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                                {messages.map((m, i) => (
                                    <div
                                        key={i}
                                        className={`max-w-[85%] 
                    ${m.role === "user" ? "ml-auto" : "mr-auto"}`}>
                                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                        ${m.role === "user" ? "bg-white text-black" : "bg-white/5 border border-white/10 text-zinc-200"}`}>
                                            {m.content}
                                        </div>
                                    </div>
                                ))}

                                {updateLoading && <div className='max-w-[85%] mr-auto'>
                                    <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic'>
                                        {thinkingSteps[thinkingidx]}
                                    </div>
                                </div>}

                            </div>
                            <div className='p-3 border-t border-white/10'>
                                <div className='flex gap-2'>
                                    <input type="text" name="" id="" className='flex-1 resize-none rounded-2xl px-4 py-3 bg-white/10
                        border border-white/10 text-sm outline-none'  placeholder='Describe Changes...'
                                        onChange={(e) => Setprompt(e.target.value)} value={prompt} />
                                    <button className='px-3 py-3 bg-white text-black rounded-2xl'
                                        onClick={handleUpdate}><Send size={14} /></button>
                                </div>
                            </div>
                        </>

                        <button
                            className='absolute top-4 right-4 p-2 bg-black/70
                        rounded-lg'
                            onClick={() => SetshowChat(false)}><X /></button>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    )

    function Header() {
        return (
            <div className='h-14 px-4 flex items-center justify-between border-b border-white/10 '>
                <span className='font-semibold truncate'>{website.title}</span>
            </div>
        )
    }


}

export default WebEditor