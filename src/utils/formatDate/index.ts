/**
 * Supported date input types for utility functions
 */
type DateInput = Date | string | null | undefined

/**
 * Checks if a date is valid
 */
const isValidDate = (date: Date): boolean => !Number.isNaN(date.getTime())

/**
 * Safely creates a Date object from various inputs
 */
const createDate = (input: DateInput): Date | null => {
	if (!input) return null
	const date = new Date(input)
	return isValidDate(date) ? date : null
}

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
	const d = createDate(date)
	if (!d) return ""

	const day = d.getDate().toString().padStart(2, "0")
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	const month = months[d.getMonth()]
	const year = d.getFullYear()

	return `${day} ${month}, ${year}`
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
	const d = createDate(date)
	if (!d) return ""

	const datePart = formatDate.date(d)
	const hours = d.getHours().toString().padStart(2, "0")
	const minutes = d.getMinutes().toString().padStart(2, "0")

	return `${datePart}, ${hours}:${minutes}`
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
	const start = createDate(startDate)
	const end = createDate(endDate)

	if (!(start && end)) return ""

	const diffMs = end.getTime() - start.getTime()
	const diffMinutes = Math.floor(diffMs / (1000 * 60))

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
