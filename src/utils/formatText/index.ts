/**
 * Provides methods for common text operations including pluralization, case conversion, truncation, and formatting.
 */
const formatText = {
	/**
	 * Pluralizes a word based on count. Handles common English pluralization rules.
	 * @param word - The word to pluralize
	 * @param count - The count to determine if pluralization is needed
	 * @param customPlural - Optional custom plural form to use instead of automatic rules
	 * @returns The singular word if count is 1, otherwise the pluralized form
	 * @example
	 * pluralize("cat", 1) // "cat"
	 * pluralize("cat", 2) // "cats"
	 * pluralize("person", 3) // "people"
	 * pluralize("item", 5, "things") // "things"
	 */
	pluralize: (word: string, count: number, customPlural?: string): string => {
		if (count === 1) return word
		if (customPlural) return customPlural

		const irregulars: Record<string, string> = {
			person: "people",
			child: "children",
			foot: "feet",
			tooth: "teeth",
			mouse: "mice",
			man: "men",
			woman: "women",
			goose: "geese",
			ox: "oxen",
		}

		const lower = word.toLowerCase()
		if (irregulars[lower]) return irregulars[lower]

		if (/(?:ss|sh|ch|x|z)$/.test(word)) return `${word}es`
		if (/[^aeiou]y$/.test(word)) return `${word.slice(0, -1)}ies`
		if (/f$/.test(word)) return `${word.slice(0, -1)}ves`
		if (/fe$/.test(word)) return `${word.slice(0, -2)}ves`

		return `${word}s`
	},

	/**
	 * Converts text to camelCase.
	 * @param text - The text to convert
	 * @returns The text converted to camelCase
	 * @example
	 * camelCase("hello world") // "helloWorld"
	 * camelCase("my-var_name") // "myVarName"
	 */
	camelCase: (text: string): string =>
		text.replace(/[-_\s]+(.)?/g, (_, char) => char?.toUpperCase() ?? "").replace(/^[A-Z]/, char => char.toLowerCase()),

	/**
	 * Converts text to kebab-case.
	 * @param text - The text to convert
	 * @returns The text converted to kebab-case
	 * @example
	 * kebabCase("helloWorld") // "hello-world"
	 * kebabCase("my_var name") // "my-var-name"
	 */
	kebabCase: (text: string): string =>
		text
			.replace(/([a-z])([A-Z])/g, "$1-$2")
			.replace(/[\s_]+/g, "-")
			.toLowerCase(),

	/**
	 * Converts text to snake_case.
	 * @param text - The text to convert
	 * @returns The text converted to snake_case
	 * @example
	 * snakeCase("helloWorld") // "hello_world"
	 * snakeCase("my-var name") // "my_var_name"
	 */
	snakeCase: (text: string): string =>
		text
			.replace(/([a-z])([A-Z])/g, "$1_$2")
			.replace(/[\s-]+/g, "_")
			.toLowerCase(),

	/**
	 * Converts text to Title Case.
	 * @param text - The text to convert
	 * @returns The text converted to Title Case
	 * @example
	 * titleCase("hello world") // "Hello World"
	 * titleCase("my-var_name") // "My Var Name"
	 */
	titleCase: (text: string): string =>
		text.replace(/[-_]/g, " ").replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()),

	/**
	 * Truncates text to a specified length with optional ellipsis.
	 * @param text - The text to truncate
	 * @param maxLength - Maximum length of the resulting string (including suffix)
	 * @param suffix - The suffix to append when truncating (default: "...")
	 * @returns The truncated text with suffix, or original text if within limit
	 * @example
	 * truncate("Hello world", 8) // "Hello..."
	 * truncate("Hi", 10) // "Hi"
	 * truncate("Long text", 5, "..") // "Lon.."
	 */
	truncate: (text: string, maxLength: number, suffix = "..."): string => {
		if (text.length <= maxLength) return text
		if (maxLength === 0) return suffix
		if (maxLength <= suffix.length) return ""
		return text.slice(0, maxLength - suffix.length) + suffix
	},

	/**
	 * Capitalizes the first letter of a string.
	 * @param text - The text to capitalize
	 * @returns The text with the first letter capitalized
	 * @example
	 * capitalize("hello") // "Hello"
	 * capitalize("WORLD") // "WORLD"
	 */
	capitalize: (text: string): string => text.charAt(0).toUpperCase() + text.slice(1),

	/**
	 * Removes extra whitespace and trims the text.
	 * @param text - The text to clean
	 * @returns The text with normalized whitespace
	 * @example
	 * clean("  hello   world  ") // "hello world"
	 * clean("multiple\t\nspaces") // "multiple spaces"
	 */
	clean: (text: string): string => text.replace(/\s+/g, " ").trim(),

	/**
	 * Extracts initials from a name or phrase.
	 * @param text - The text to extract initials from
	 * @param maxInitials - Maximum number of initials to extract (default: 2)
	 * @returns The extracted initials in uppercase
	 * @example
	 * initials("John Doe") // "JD"
	 * initials("Jane Mary Smith", 3) // "JMS"
	 * initials("single") // "S"
	 */
	initials: (text: string, maxInitials = 2): string =>
		text
			.trim()
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, maxInitials)
			.map(word => word.charAt(0).toUpperCase())
			.join(""),

	/**
	 * Formats a count with its corresponding word.
	 * @param count - The numerical count
	 * @param word - The word to pluralize based on count
	 * @param customPlural - Optional custom plural form
	 * @returns A formatted string with count and properly pluralized word
	 * @example
	 * countWithWord(1, "item") // "1 item"
	 * countWithWord(5, "cat") // "5 cats"
	 * countWithWord(3, "person") // "3 people"
	 * countWithWord(2, "box", "containers") // "2 containers"
	 */
	countWithWord: (count: number, word: string, customPlural?: string): string =>
		`${count} ${formatText.pluralize(word, count, customPlural)}`,
} as const

export default formatText
