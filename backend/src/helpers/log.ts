const log = (text: string, { error = false, lines = false } = {}) => {
    if (process.env.NODE_ENV === "development") {
        if (lines) { console.log("---------------------------") }

        if (error) {
            console.error(text)
        } else {
            console.log(text)
        }

        if (lines) { console.log("---------------------------") }
    }
}

export default log