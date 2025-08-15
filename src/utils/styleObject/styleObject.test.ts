import { describe, expect, it } from "vitest"
import styleObject, { type TThemeObject } from "./"

describe("styleObject", () => {
	describe("createCSSVariable", () => {
		it("converts camelCase to CSS variable", () => {
			expect(styleObject.createCSSVariable("backgroundColor")).toBe("--background-color")
			expect(styleObject.createCSSVariable("fontSize")).toBe("--font-size")
			expect(styleObject.createCSSVariable("borderRadius")).toBe("--border-radius")
		})

		it("adds prefix when provided", () => {
			expect(styleObject.createCSSVariable("backgroundColor", "button")).toBe("--button-background-color")
			expect(styleObject.createCSSVariable("fontSize", "text")).toBe("--text-font-size")
			expect(styleObject.createCSSVariable("paddingX", "card")).toBe("--card-padding-x")
		})

		it("handles single word properties", () => {
			expect(styleObject.createCSSVariable("color")).toBe("--color")
			expect(styleObject.createCSSVariable("width")).toBe("--width")
			expect(styleObject.createCSSVariable("margin")).toBe("--margin")
		})

		it("handles multi-word camelCase", () => {
			expect(styleObject.createCSSVariable("borderTopLeftRadius")).toBe("--border-top-left-radius")
			expect(styleObject.createCSSVariable("textDecorationColor")).toBe("--text-decoration-color")
		})

		it("handles empty string", () => {
			expect(styleObject.createCSSVariable("")).toBe("--")
			expect(styleObject.createCSSVariable("", "prefix")).toBe("--prefix-")
		})

		it("handles empty prefix", () => {
			expect(styleObject.createCSSVariable("backgroundColor", "")).toBe("--background-color")
			expect(styleObject.createCSSVariable("fontSize", "")).toBe("--font-size")
		})
	})

	describe("build", () => {
		it("handles empty theme object", () => {
			const theme: TThemeObject = {}
			const result = styleObject.build(theme)

			expect(result).toEqual({})
		})

		it("converts theme object to CSS variables", () => {
			const theme: TThemeObject = {
				backgroundColor: "#ff6b6b",
				fontSize: "16px",
				padding: 8,
			}

			const result = styleObject.build(theme)

			expect(result).toEqual({
				"--background-color": "#ff6b6b",
				"--font-size": "16px",
				"--padding": "8",
			})
		})

		it("adds prefix to all CSS variables", () => {
			const theme: TThemeObject = {
				backgroundColor: "#ff6b6b",
				textColor: "white",
				borderRadius: "4px",
			}

			const result = styleObject.build(theme, "button")

			expect(result).toEqual({
				"--button-background-color": "#ff6b6b",
				"--button-text-color": "white",
				"--button-border-radius": "4px",
			})
		})

		it("converts numbers to strings", () => {
			const theme: TThemeObject = {
				width: 100,
				height: 200,
				zIndex: 999,
			}

			const result = styleObject.build(theme)

			expect(result).toEqual({
				"--width": "100",
				"--height": "200",
				"--z-index": "999",
			})
		})

		it("handles mixed string and number values", () => {
			const theme: TThemeObject = {
				backgroundColor: "#ffffff",
				padding: 16,
				borderWidth: "2px",
				opacity: 0.8,
			}

			const result = styleObject.build(theme, "card")

			expect(result).toEqual({
				"--card-background-color": "#ffffff",
				"--card-padding": "16",
				"--card-border-width": "2px",
				"--card-opacity": "0.8",
			})
		})

		it("handles empty theme object", () => {
			const theme: TThemeObject = {}
			const result = styleObject.build(theme)

			expect(result).toEqual({})
		})

		it("handles complex camelCase properties", () => {
			const theme: TThemeObject = {
				borderTopLeftRadius: "8px",
				textDecorationColor: "red",
				backgroundAttachment: "fixed",
			}

			const result = styleObject.build(theme, "component")

			expect(result).toEqual({
				"--component-border-top-left-radius": "8px",
				"--component-text-decoration-color": "red",
				"--component-background-attachment": "fixed",
			})
		})

		it("handles single character properties", () => {
			const theme: TThemeObject = {
				x: 10,
				y: 20,
				z: 30,
			}

			const result = styleObject.build(theme)

			expect(result).toEqual({
				"--x": "10",
				"--y": "20",
				"--z": "30",
			})
		})

		it("handles real-world component theme", () => {
			const buttonTheme: TThemeObject = {
				backgroundColor: "#007bff",
				color: "white",
				borderRadius: "4px",
				paddingX: 16,
				paddingY: 8,
				fontSize: "14px",
				fontWeight: 500,
				hoverBackgroundColor: "#0056b3",
			}

			const result = styleObject.build(buttonTheme, "btn")

			expect(result).toEqual({
				"--btn-background-color": "#007bff",
				"--btn-color": "white",
				"--btn-border-radius": "4px",
				"--btn-padding-x": "16",
				"--btn-padding-y": "8",
				"--btn-font-size": "14px",
				"--btn-font-weight": "500",
				"--btn-hover-background-color": "#0056b3",
			})
		})

		it("handles undefined theme", () => {
			const result = styleObject.build(undefined)
			expect(result).toEqual({})
		})

		it("handles undefined theme with prefix", () => {
			const result = styleObject.build(undefined, "button")
			expect(result).toEqual({})
		})

		it("filters out undefined values", () => {
			const theme: TThemeObject = {
				backgroundColor: "#ff6b6b",
				fontSize: "16px",
				// biome-ignore lint/suspicious/noExplicitAny: Allow for testing
				padding: undefined as any, // Force undefined for testing
			}

			const result = styleObject.build(theme)

			expect(result).toEqual({
				"--background-color": "#ff6b6b",
				"--font-size": "16px",
				// padding should be excluded
			})
		})

		it("handles empty prefix", () => {
			const theme: TThemeObject = {
				backgroundColor: "#ff6b6b",
				padding: 8,
			}

			const result = styleObject.build(theme, "")

			expect(result).toEqual({
				"--background-color": "#ff6b6b",
				"--padding": "8",
			})
		})
	})
})
