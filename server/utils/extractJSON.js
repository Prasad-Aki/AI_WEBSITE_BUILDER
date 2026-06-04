const extractJSON = async (rawtext) => {
    if (!rawtext) return
    const cleanedtext = rawtext
        .replace(/```json/gi, "")
        .replace(/```/gi, "")
        .trim()

    const firstbrace = cleanedtext.indexOf("{")
    const closebrace = cleanedtext.lastIndexOf("}")

    if (firstbrace == -1 || closebrace == -1) return null

    const jsonStr = cleanedtext.slice(firstbrace, closebrace + 1)
    try {
        return JSON.parse(jsonStr)
    } catch (err) {
        console.log("JSON PARSE FAILED")
        return null
    }
}

export default extractJSON