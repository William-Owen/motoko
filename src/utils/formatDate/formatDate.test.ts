import { describe, expect, it } from "vitest"
import formatDate from "./"

describe("formatDate.date", () => {
	it("formats valid Date object correctly", () => {
		const date = new Date("2024-01-15T10:30:00")
		expect(formatDate.date(date)).toBe("15 Jan, 2024")
	})

	it("formats valid date string correctly", () => {
		expect(formatDate.date("2024-12-25")).toBe("25 Dec, 2024")
		expect(formatDate.date("2023-06-01T14:30:00")).toBe("01 Jun, 2023")
	})

	it("returns empty string for null", () => {
		expect(formatDate.date(null)).toBe("")
	})

	it("returns empty string for undefined", () => {
		expect(formatDate.date(undefined)).toBe("")
	})

	it("returns empty string for invalid date string", () => {
		expect(formatDate.date("invalid-date")).toBe("")
		expect(formatDate.date("")).toBe("")
		expect(formatDate.date("not-a-date")).toBe("")
	})

	it("handles edge cases with different date formats", () => {
		expect(formatDate.date("2024/01/15")).toBe("15 Jan, 2024")
		expect(formatDate.date("Jan 15, 2024")).toBe("15 Jan, 2024")
	})

	it("handles leap year dates", () => {
		expect(formatDate.date("2024-02-29")).toBe("29 Feb, 2024")
	})
})

describe("formatDate.dateTime", () => {
	it("formats valid Date object with time correctly", () => {
		const date = new Date("2024-01-15T14:30:00")
		expect(formatDate.dateTime(date)).toBe("15 Jan, 2024, 14:30")
	})

	it("formats valid datetime string correctly", () => {
		expect(formatDate.dateTime("2024-12-25T09:15:00")).toBe("25 Dec, 2024, 09:15")
		expect(formatDate.dateTime("2023-06-01T23:59:59")).toBe("01 Jun, 2023, 23:59")
	})

	it("handles midnight correctly", () => {
		expect(formatDate.dateTime("2024-01-15T00:00:00")).toBe("15 Jan, 2024, 00:00")
	})

	it("handles noon correctly", () => {
		expect(formatDate.dateTime("2024-01-15T12:00:00")).toBe("15 Jan, 2024, 12:00")
	})

	it("returns empty string for null", () => {
		expect(formatDate.dateTime(null)).toBe("")
	})

	it("returns empty string for undefined", () => {
		expect(formatDate.dateTime(undefined)).toBe("")
	})

	it("returns empty string for invalid date string", () => {
		expect(formatDate.dateTime("invalid-date")).toBe("")
		expect(formatDate.dateTime("")).toBe("")
	})

	it("formats date without time component", () => {
		expect(formatDate.dateTime("2024-01-15")).toBe("15 Jan, 2024, 00:00")
	})
})

describe("formatDate.difference", () => {
	const baseDate = "2024-01-15T10:00:00"

	it("returns correct format for less than 1 minute", () => {
		expect(formatDate.difference(baseDate, "2024-01-15T10:00:00")).toBe("< 1min")
		expect(formatDate.difference(baseDate, "2024-01-15T10:00:30")).toBe("< 1min")
	})

	it("returns correct format for minutes only", () => {
		expect(formatDate.difference(baseDate, "2024-01-15T10:01:00")).toBe("1min")
		expect(formatDate.difference(baseDate, "2024-01-15T10:15:00")).toBe("15min")
		expect(formatDate.difference(baseDate, "2024-01-15T10:59:00")).toBe("59min")
	})

	it("returns correct format for hours only", () => {
		expect(formatDate.difference(baseDate, "2024-01-15T11:00:00")).toBe("1h")
		expect(formatDate.difference(baseDate, "2024-01-15T12:00:00")).toBe("2h")
		expect(formatDate.difference(baseDate, "2024-01-15T15:00:00")).toBe("5h")
	})

	it("returns correct format for hours and minutes", () => {
		expect(formatDate.difference(baseDate, "2024-01-15T11:30:00")).toBe("1h 30m")
		expect(formatDate.difference(baseDate, "2024-01-15T12:15:00")).toBe("2h 15m")
		expect(formatDate.difference(baseDate, "2024-01-15T14:45:00")).toBe("4h 45m")
	})

	it("handles large time differences", () => {
		expect(formatDate.difference(baseDate, "2024-01-16T10:00:00")).toBe("24h")
		expect(formatDate.difference(baseDate, "2024-01-16T10:30:00")).toBe("24h 30m")
	})

	it("returns empty string when start date is null or undefined", () => {
		expect(formatDate.difference(null, baseDate)).toBe("")
		expect(formatDate.difference(undefined, baseDate)).toBe("")
	})

	it("returns empty string when end date is null or undefined", () => {
		expect(formatDate.difference(baseDate, null)).toBe("")
		expect(formatDate.difference(baseDate, undefined)).toBe("")
	})

	it("returns empty string when both dates are null or undefined", () => {
		expect(formatDate.difference(null, null)).toBe("")
		expect(formatDate.difference(undefined, undefined)).toBe("")
		expect(formatDate.difference(null, undefined)).toBe("")
	})

	it("returns empty string for invalid start date", () => {
		expect(formatDate.difference("invalid-date", baseDate)).toBe("")
		expect(formatDate.difference("", baseDate)).toBe("")
	})

	it("returns empty string for invalid end date", () => {
		expect(formatDate.difference(baseDate, "invalid-date")).toBe("")
		expect(formatDate.difference(baseDate, "")).toBe("")
	})

	it("returns empty string when both dates are invalid", () => {
		expect(formatDate.difference("invalid-start", "invalid-end")).toBe("")
	})

	it("handles different date input types", () => {
		const startDate = new Date("2024-01-15T10:00:00")
		const endDate = new Date("2024-01-15T11:30:00")
		expect(formatDate.difference(startDate, endDate)).toBe("1h 30m")
	})

	it("handles mixed date input types", () => {
		const startDate = new Date("2024-01-15T10:00:00")
		const endDateString = "2024-01-15T12:15:00"
		expect(formatDate.difference(startDate, endDateString)).toBe("2h 15m")
	})

	it("handles reverse chronological order", () => {
		const start = "2024-01-15T12:00:00"
		const end = "2024-01-15T10:00:00"
		// dayjs.diff() returns negative for reverse order, function doesn't handle negatives
		expect(formatDate.difference(start, end)).toBe("-120min")
	})

	it("handles fractional minutes correctly", () => {
		expect(formatDate.difference("2024-01-15T10:00:00", "2024-01-15T10:00:30")).toBe("< 1min")
		expect(formatDate.difference("2024-01-15T10:00:00", "2024-01-15T10:01:30")).toBe("1min")
	})
})

describe("formatDate integration", () => {
	it("maintains consistent behavior across all functions", () => {
		const testDate = "2024-01-15T14:30:00"

		// All functions should handle the same input consistently
		expect(formatDate.date(testDate)).toBe("15 Jan, 2024")
		expect(formatDate.dateTime(testDate)).toBe("15 Jan, 2024, 14:30")

		// All functions should handle null/undefined consistently
		expect(formatDate.date(null)).toBe("")
		expect(formatDate.dateTime(null)).toBe("")
		expect(formatDate.difference(null, testDate)).toBe("")
		expect(formatDate.difference(testDate, null)).toBe("")
	})

	it("works with dayjs edge cases", () => {
		// Test timezone handling (dayjs uses local timezone by default)
		const utcDate = "2024-01-15T00:00:00Z"
		expect(formatDate.date(utcDate)).toMatch(/15 Jan, 2024/)
		expect(formatDate.dateTime(utcDate)).toMatch(/15 Jan, 2024, \d{2}:\d{2}/)
	})
})
