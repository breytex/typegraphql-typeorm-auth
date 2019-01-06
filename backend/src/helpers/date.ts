
const checkIfNotExpired = (dateTime: Date, lifetimeMin: number) => {
    dateTime.setMinutes(dateTime.getMinutes() + lifetimeMin)
    const now = new Date()

    return now.getTime() < dateTime.getTime()
}

export { checkIfNotExpired }