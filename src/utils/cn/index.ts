type Argument = string | boolean | null | undefined | number

/**
 *
 * Combines multiple class name arguments, automatically filtering out falsy values
 * (false, null, undefined) and normalizing any extra whitespace within or between
 * class names. Supports conditionally joining class names into a single string.
 *
 * @param args - Class name strings or conditional expressions that resolve to strings/booleans
 * @returns A single normalized class name string with no extra whitespace
 *
 * @example
 * Basic usage with conditional classes:
 * ```typescript
 * cn('btn', isActive && 'active', 'large')
 * // Returns: "btn active large" (when isActive is true)
 * // Returns: "btn large" (when isActive is false)
 * ```
 *
 * @example
 * Handling multiple spaces and falsy values:
 * ```typescript
 * cn('btn  primary', false, null, 'disabled')
 * // Returns: "btn primary disabled"
 * ```
 *
 * @example
 * Component usage pattern:
 * ```typescript
 * const Button = ({ variant, disabled, className }) => (
 *   <button className={cn('btn', `btn--${variant}`, disabled && 'btn--disabled', className)}>
 *     Click me
 *   </button>
 * )
 * ```
 *
 * @example
 * CSS Modules usage:
 * ```typescript
 * import styles from './Component.module.scss'
 *
 * const className = cn(styles.base, isError && styles.error, props.className)
 * ```
 *
 * @since 0.1.0
 * @category Utilities
 */
const cn = (...args: Argument[]): string => {
	let result = ""

	// biome-ignore lint/style/useForOf: For-of loops are typically 20-40% slower than traditional for loops for simple array operations like this.
	for (let i = 0; i < args.length; i++) {
		const arg = args[i]
		if (arg) {
			if (result) result += " "
			result += arg
		}
	}

	return result.split(/\s+/).filter(Boolean).join(" ")
}

export default cn
