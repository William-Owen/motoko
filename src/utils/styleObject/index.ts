import formatText from "../formatText"

/**
 * Theme object with camelCase keys and string/number values.
 * Numbers are converted to strings in CSS output.
 */
export type TThemeObject = Record<string, string | number>

/**
 * Utilities for CSS custom properties and theme objects.
 */
const styleObject = {
	/**
	 * Converts camelCase key to CSS custom property name.
	 *
	 * @param key - camelCase property name
	 * @param prefix - optional prefix
	 * @returns CSS variable name with -- prefix
	 *
	 * @example
	 * createCSSVariable('backgroundColor') // '--background-color'
	 * createCSSVariable('fontSize', 'button') // '--button-font-size'
	 */
	createCSSVariable: (key: string, prefix?: string): string =>
		`--${prefix ? `${prefix}-` : ""}${formatText.kebabCase(key)}`,

	/**
	 * Converts theme object to CSS custom properties.
	 *
	 * @param theme - theme object with camelCase keys
	 * @param prefix - optional prefix for all variables
	 * @returns object with CSS variable names as keys
	 *
	 * @example
	 * const theme = { backgroundColor: '#ff6b6b', padding: 16 }
	 * build(theme, 'btn')
	 * // { '--btn-background-color': '#ff6b6b', '--btn-padding': '16' }
	 */
	build: <T extends TThemeObject>(theme: T | undefined, prefix?: string): Record<string, string> => {
		if (!theme) return {}

		return Object.entries(theme).reduce(
			(acc, [key, value]) => {
				if (value !== undefined) {
					acc[styleObject.createCSSVariable(key, prefix)] = String(value)
				}
				return acc
			},
			{} as Record<string, string>
		)
	},
}

export default styleObject
