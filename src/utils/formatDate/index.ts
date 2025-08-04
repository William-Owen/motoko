import dayjs from "dayjs"

/**
 * Supported date input types for utility functions
 */
type DateInput = Date | string | null | undefined

/**
 * Formats a date to "DD MMM, YYYY" format
 * @param date - The date to format
 * @returns Formatted date string or empty string if invalid
 * @example
 * formatDate(new Date('2024-01-15')) // "15 Jan, 2024"
 * formatDate(null) // ""
 * formatDate('invalid') // ""
 */
const date = (date: DateInput): string => {
	if (!date) return ""

	const dayJsDate = dayjs(date)
	return dayJsDate.isValid() ? dayJsDate.format("DD MMM, YYYY") : ""
}

/**
 * Formats a date to "DD MMM, YYYY, HH:mm" format
 * @param date - The date to format
 * @returns Formatted datetime string or empty string if invalid
 * @example
 * formatDateTime(new Date('2024-01-15T14:30:00')) // "15 Jan, 2024, 14:30"
 * formatDateTime(null) // ""
 */
const dateTime = (date: DateInput): string => {
	if (!date) return ""

	const dayJsDate = dayjs(date)
	return dayJsDate.isValid() ? dayJsDate.format("DD MMM, YYYY, HH:mm") : ""
}

/**
 * Calculates time difference between two dates in human-readable format
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns Formatted time difference or empty string if invalid dates
 * @example
 * timeDifference('2024-01-15T10:00:00', '2024-01-15T12:30:00') // "2h 30m"
 * timeDifference('2024-01-15T10:00:00', '2024-01-15T10:15:00') // "15min"
 * timeDifference('2024-01-15T10:00:00', '2024-01-15T10:00:00') // "< 1min"
 */
const difference = (startDate: DateInput, endDate: DateInput): string => {
	if (!(startDate && endDate)) return ""

	const start = dayjs(startDate)
	const end = dayjs(endDate)

	if (!(start.isValid() && end.isValid())) return ""

	const diffMinutes = end.diff(start, "minutes")

	if (diffMinutes === 0) return "< 1min"
	if (diffMinutes < 60) return `${diffMinutes}min`

	const hours = Math.floor(diffMinutes / 60)
	const minutes = diffMinutes % 60

	return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`
}

const formatDate = {
	date,
	dateTime,
	difference,
}

export default formatDate
