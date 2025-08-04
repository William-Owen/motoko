/**
 * Provides methods for formatting numbers in various ways including pretty print, international, file size, cost calculations, percentages, and currency formats.
 *
 * @example
 * ```typescript
 * import formatNumber from './formatNumber'
 *
 * // Pretty formatting
 * formatNumber.pretty(1500) // "1.5k"
 * formatNumber.pretty(2500000) // "2.5m"
 *
 * // File size formatting
 * formatNumber.fileSize(1024) // "1 KB"
 * formatNumber.fileSize(1048576, "valueOnly") // "1"
 *
 * // Currency formatting
 * formatNumber.currency(1234.56) // "$1,234.56"
 * ```
 */
const formatNumber = {
	/**
	 * Pretty prints a number by abbreviating it with 'k' for thousands, or 'm' for millions.
	 * Numbers under 1000 are returned as-is, optionally with fixed decimal places.
	 *
	 * @param {number} num - The number to be formatted. Must be a finite number.
	 * @param {number | null} [fixed] - Optional number of decimal places for numbers under 1000.
	 *                                  If null or undefined, returns the number as a string without formatting.
	 * @returns {string} The formatted string representing the number with 'k' for thousands, 'm' for millions,
	 *                   or the original number (optionally with fixed decimals) for values under 1000.
	 *
	 * @example
	 * ```typescript
	 * formatNumber.pretty(1500) // "1.5k"
	 * formatNumber.pretty(2500000) // "2.5m"
	 * formatNumber.pretty(999) // "999"
	 * formatNumber.pretty(123, 2) // "123.00"
	 * formatNumber.pretty(123, null) // "123"
	 * ```
	 */
	pretty: (num: number, fixed?: number | null): string => {
		if (num >= 1000000) {
			return `${(num / 1000000).toFixed(1)}m`
		}

		if (num >= 1000) {
			return `${(num / 1000).toFixed(1)}k`
		}

		return fixed ? num.toFixed(fixed) : num.toString()
	},

	/**
	 * Formats a number using the browser's local number format with appropriate thousand separators.
	 * Uses the user's locale settings to determine the formatting style.
	 *
	 * @param {number} num - The number to be formatted using locale-specific formatting.
	 * @returns {string} The number formatted according to the user's locale (e.g., "1,000" in en-US).
	 *
	 * @example
	 * ```typescript
	 * formatNumber.international(1000) // "1,000" (in en-US locale)
	 * formatNumber.international(1234567) // "1,234,567"
	 * formatNumber.international(100) // "100"
	 * ```
	 */
	international: (num: number): string => {
		return num.toLocaleString()
	},

	/**
	 * Formats a file size given in bytes to the appropriate size unit (Bytes, KB, MB, GB, TB, PB, EB, ZB, YB).
	 * Automatically selects the most appropriate unit and formats to 2 decimal places.
	 *
	 * @param {number | string | bigint} bytes - The file size in bytes to be formatted. Accepts numbers, numeric strings, and BigInt values.
	 * @param {"valueOnly" | "unitOnly" | "full"} [type="full"] - The format type:
	 *   - "valueOnly": Returns only the numeric value without the unit
	 *   - "unitOnly": Returns only the unit abbreviation
	 *   - "full": Returns the complete formatted string with value and unit (default)
	 * @returns {string} The formatted string representing the file size in the most appropriate unit.
	 *
	 * @example
	 * ```typescript
	 * formatNumber.fileSize(1024) // "1 KB"
	 * formatNumber.fileSize(1048576) // "1 MB"
	 * formatNumber.fileSize(1536, "valueOnly") // "1.5"
	 * formatNumber.fileSize(1024, "unitOnly") // "KB"
	 * formatNumber.fileSize("2048") // "2 KB"
	 * formatNumber.fileSize(1125899906842624n) // "1 PB"
	 * formatNumber.fileSize(0) // "0 Bytes"
	 * ```
	 */
	fileSize: (bytes: number | string | bigint, type?: "valueOnly" | "unitOnly" | "full"): string => {
		const newBytes = typeof bytes === "string" ? BigInt(bytes) : typeof bytes === "number" ? BigInt(bytes) : bytes
		const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

		if (newBytes === 0n) return "0 Bytes"

		const numberInK = 1024n

		// Find the appropriate unit index
		let index = 0
		let temp = newBytes
		while (temp >= numberInK && index < units.length - 1) {
			temp /= numberInK
			index++
		}

		// Calculate the final value
		const divisor = numberInK ** BigInt(index)
		const value = Number(newBytes) / Number(divisor)

		switch (type) {
			case "valueOnly":
				return `${Number.parseFloat(value.toFixed(2))}`
			case "unitOnly":
				return `${units[index]}`
			default:
				return `${Number.parseFloat(value.toFixed(2))} ${units[index]}`
		}
	},

	/**
	 * Calculates the monthly cost based on bytes usage and cost per GB pricing.
	 * Converts bytes to GB and multiplies by the cost per GB rate.
	 *
	 * @param {number | string} bytes - The data usage in bytes. Accepts both numbers and numeric strings.
	 * @param {number} costPerGb - The cost per gigabyte as a decimal number (e.g., 0.1 for $0.10 per GB).
	 * @returns {string} The calculated monthly cost formatted as a US dollar currency string (e.g., "$1.25").
	 *
	 * @example
	 * ```typescript
	 * const oneGB = 1024 * 1024 * 1024
	 * formatNumber.bytesAngCostPerMonthGbToCostPerMonth(oneGB, 0.1) // "$0.10"
	 * formatNumber.bytesAngCostPerMonthGbToCostPerMonth(oneGB * 2.5, 0.15) // "$0.38"
	 * formatNumber.bytesAngCostPerMonthGbToCostPerMonth("1073741824", 0.05) // "$0.05"
	 * ```
	 */
	bytesAngCostPerMonthGbToCostPerMonth: (bytes: number | string, costPerGb: number): string => {
		const newBytes = typeof bytes === "string" ? Number.parseInt(bytes) : bytes
		const bytesInGB = 1024 * 1024 * 1024
		const cost = (newBytes / bytesInGB) * costPerGb

		return `$${cost.toFixed(2)}`
	},

	/**
	 * Formats a numeric value as a percentage string with one decimal place.
	 * Handles falsy values by returning "0%".
	 *
	 * @param {number} value - The numeric value to format as a percentage. Should be the actual percentage value (e.g., 50 for 50%).
	 * @returns {string} The formatted percentage string with one decimal place (e.g., "50.0%") or "0%" for falsy values.
	 *
	 * @example
	 * ```typescript
	 * formatNumber.percentage(75) // "75.0%"
	 * formatNumber.percentage(33.333) // "33.3%"
	 * formatNumber.percentage(0) // "0%"
	 * formatNumber.percentage(NaN) // "0%"
	 * ```
	 */
	percentage: (value: number): string => {
		return value ? `${value.toFixed(1)}%` : "0%"
	},

	/**
	 * Formats a numeric amount as US currency with proper comma separators and two decimal places.
	 * Uses the Intl.NumberFormat API for consistent currency formatting.
	 *
	 * @param {number} amount - The numeric amount to format as currency. Can be positive, negative, or zero.
	 * @returns {string} The formatted currency string in US dollars (e.g., "$1,234.56").
	 *
	 * @example
	 * ```typescript
	 * formatNumber.currency(1234.56) // "$1,234.56"
	 * formatNumber.currency(100) // "$100.00"
	 * formatNumber.currency(0) // "$0.00"
	 * formatNumber.currency(-50.25) // "-$50.25"
	 * formatNumber.currency(1000000) // "$1,000,000.00"
	 * ```
	 */
	currency: (amount: number): string => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
		}).format(amount)
	},
}

export default formatNumber
