import { checkIfNotExpired } from "../helpers/date"


test('checkIfNotExpiredFunction', () => {
    expect(checkIfNotExpired(new Date, 10)).toBe(true)
    expect(checkIfNotExpired(new Date("01-01-2015"), 10)).toBe(false)
})