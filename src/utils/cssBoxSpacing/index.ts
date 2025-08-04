/**
 * CSS box model spacing type supporting 1-4 values like CSS shorthand properties.
 * - number: applies to all sides
 * - [top/bottom, left/right]: applies to opposite sides
 * - [top, left/right, bottom]: applies to specific sides
 * - [top, right, bottom, left]: applies to each side individually
 */
export type TBoxModelSpacing = number | [number, number] | [number, number, number] | [number, number, number, number]

/**
 * All valid CSS length units including absolute, relative, viewport, and container query units.
 */
export type TCssUnit =
	// Absolute units
	| "px"
	| "pt"
	| "pc"
	| "in"
	| "cm"
	| "mm"
	| "Q"
	| "%"

	// Font-relative units
	| "em"
	| "rem"
	| "ex"
	| "ch"
	| "cap" // Firefox only
	| "ic" // Chrome/Edge
	| "lh" // Chrome/Edge/Safari
	| "rlh" // Chrome/Edge/Safari
	| "rex"
	| "rch"
	| "rcap"
	| "ric" // Experimental

	// Viewport units
	| "vh"
	| "vw"
	| "vmin"
	| "vmax"
	| "svh"
	| "svw"
	| "lvh"
	| "lvw"
	| "dvh"
	| "dvw"

	// Container query units - Chrome 106+, Firefox 110+, Safari 16.6+
	| "cqw" // 1% of container width
	| "cqh" // 1% of container height
	| "cqi" // 1% of container inline size
	| "cqb" // 1% of container block size
	| "cqmin" // Smaller of cqi or cqb
	| "cqmax" // Larger of cqi or cqb
/**
 * Converts box model spacing values to CSS string format.
 *
 * @param spacing - Numeric value(s) for spacing, follows CSS shorthand rules
 * @param unit - CSS unit to append to values (default: "rem")
 * @returns CSS-formatted spacing string or undefined if spacing is undefined/null
 *
 * @example
 * ```typescript
 * boxModelSpacingToCSSValue(10) // "10rem"
 * boxModelSpacingToCSSValue([10, 20]) // "10rem 20rem"
 * boxModelSpacingToCSSValue([5, 10, 15, 20]) // "5rem 10rem 15rem 20rem"
 * boxModelSpacingToCSSValue(8, "px") // "8px"
 * boxModelSpacingToCSSValue(null) // undefined
 * ```
 */
const cssBoxSpacing = (spacing: TBoxModelSpacing, unit: TCssUnit = "rem"): string =>
	typeof spacing === "number" ? `${spacing}${unit}` : spacing.map(p => `${p}${unit}`).join(" ")

export default cssBoxSpacing
