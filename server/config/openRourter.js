const openRourterUrl = "https://openrouter.ai/api/v1/chat/completions"
const model = "deepseek/deepseek-chat"

export const generateResponse = async (prompt) => {
    const res = await fetch(openRourterUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENROURTER_API_KEY}`,

            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        }),
    });

    if (!res.ok) {
        const err = await res.text()
        throw new Error("openRouter Error" + err)
    }
    const data = await res.json()
    return data.choices[0].message.content
}