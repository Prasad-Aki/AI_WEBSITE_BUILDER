import axios from "axios"

const openRouterUrl = "https://openrouter.ai/api/v1/chat/completions"
const model = "deepseek/deepseek-chat"

export const generateResponse = async (prompt) => {
    try {
        const res = await axios.post(
            openRouterUrl,
            {
                model: model,
                messages: [
                    {
                        role: "system",
                        content: "You must return only raw JSON."
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY || process.env.OPENROURTER_API_KEY}`,
                    'Content-Type': 'application/json',
                }
            }
        )
        return res.data.choices[0].message.content
    } catch (error) {
        const errDetails = error.response ? JSON.stringify(error.response.data) : error.message
        throw new Error("openRouter Error: " + errDetails)
    }
}