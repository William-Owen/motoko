/** biome-ignore-all lint/suspicious/noExplicitAny: Required for testing */

import { describe, expect, it } from "vitest"
import boxModelSpacingToCSSValue, { type TBoxModelSpacing, type TCssUnit } from "./"

describe("boxModelSpacingToCSSValue", () => {
	describe("single value (number)", () => {
		it("should convert number to CSS value with default rem unit", () => {
			expect(boxModelSpacingToCSSValue(10)).toBe("10rem")
			expect(boxModelSpacingToCSSValue(0)).toBe("0rem")
			expect(boxModelSpacingToCSSValue(1.5)).toBe("1.5rem")
		})

		it("should handle negative values", () => {
			expect(boxModelSpacingToCSSValue(-5)).toBe("-5rem")
			expect(boxModelSpacingToCSSValue(-0.25)).toBe("-0.25rem")
		})

		it("should handle very small and large values", () => {
			expect(boxModelSpacingToCSSValue(0.001)).toBe("0.001rem")
			expect(boxModelSpacingToCSSValue(9999)).toBe("9999rem")
		})
	})

	describe("two values [top/bottom, left/right]", () => {
		it("should convert two values to CSS shorthand", () => {
			expect(boxModelSpacingToCSSValue([10, 20])).toBe("10rem 20rem")
			expect(boxModelSpacingToCSSValue([0, 5])).toBe("0rem 5rem")
			expect(boxModelSpacingToCSSValue([1.5, 2.5])).toBe("1.5rem 2.5rem")
		})

		it("should handle negative values in arrays", () => {
			expect(boxModelSpacingToCSSValue([-5, 10])).toBe("-5rem 10rem")
			expect(boxModelSpacingToCSSValue([5, -10])).toBe("5rem -10rem")
			expect(boxModelSpacingToCSSValue([-1, -2])).toBe("-1rem -2rem")
		})
	})

	describe("three values [top, left/right, bottom]", () => {
		it("should convert three values to CSS shorthand", () => {
			expect(boxModelSpacingToCSSValue([10, 20, 30])).toBe("10rem 20rem 30rem")
			expect(boxModelSpacingToCSSValue([0, 1, 2])).toBe("0rem 1rem 2rem")
			expect(boxModelSpacingToCSSValue([1.5, 2.5, 3.5])).toBe("1.5rem 2.5rem 3.5rem")
		})

		it("should handle mixed positive and negative values", () => {
			expect(boxModelSpacingToCSSValue([-10, 20, -30])).toBe("-10rem 20rem -30rem")
		})
	})

	describe("four values [top, right, bottom, left]", () => {
		it("should convert four values to CSS shorthand", () => {
			expect(boxModelSpacingToCSSValue([10, 20, 30, 40])).toBe("10rem 20rem 30rem 40rem")
			expect(boxModelSpacingToCSSValue([0, 1, 2, 3])).toBe("0rem 1rem 2rem 3rem")
			expect(boxModelSpacingToCSSValue([1.5, 2.5, 3.5, 4.5])).toBe("1.5rem 2.5rem 3.5rem 4.5rem")
		})

		it("should handle all negative values", () => {
			expect(boxModelSpacingToCSSValue([-1, -2, -3, -4])).toBe("-1rem -2rem -3rem -4rem")
		})
	})

	describe("custom units", () => {
		const testUnits: Array<{ unit: TCssUnit; description: string }> = [
			// Absolute units
			{ unit: "px", description: "pixels" },
			{ unit: "pt", description: "points" },
			{ unit: "pc", description: "picas" },
			{ unit: "in", description: "inches" },
			{ unit: "cm", description: "centimeters" },
			{ unit: "mm", description: "millimeters" },
			{ unit: "Q", description: "quarter-millimeters" },
			{ unit: "%", description: "percentage" },

			// Font-relative units
			{ unit: "em", description: "em units" },
			{ unit: "rem", description: "rem units" },
			{ unit: "ex", description: "ex units" },
			{ unit: "ch", description: "character units" },
			{ unit: "cap", description: "cap height units" },
			{ unit: "ic", description: "ideographic character units" },
			{ unit: "lh", description: "line height units" },
			{ unit: "rlh", description: "root line height units" },
			{ unit: "rex", description: "root ex units" },
			{ unit: "rch", description: "root character units" },
			{ unit: "rcap", description: "root cap height units" },
			{ unit: "ric", description: "root ideographic character units" },

			// Viewport units
			{ unit: "vh", description: "viewport height" },
			{ unit: "vw", description: "viewport width" },
			{ unit: "vmin", description: "viewport minimum" },
			{ unit: "vmax", description: "viewport maximum" },
			{ unit: "svh", description: "small viewport height" },
			{ unit: "svw", description: "small viewport width" },
			{ unit: "lvh", description: "large viewport height" },
			{ unit: "lvw", description: "large viewport width" },
			{ unit: "dvh", description: "dynamic viewport height" },
			{ unit: "dvw", description: "dynamic viewport width" },

			// Container query units
			{ unit: "cqw", description: "container query width" },
			{ unit: "cqh", description: "container query height" },
			{ unit: "cqi", description: "container query inline" },
			{ unit: "cqb", description: "container query block" },
			{ unit: "cqmin", description: "container query minimum" },
			{ unit: "cqmax", description: "container query maximum" },
		]

		testUnits.forEach(({ unit, description }) => {
			it(`should work with ${description} (${unit})`, () => {
				expect(boxModelSpacingToCSSValue(10, unit)).toBe(`10${unit}`)
				expect(boxModelSpacingToCSSValue([5, 15], unit)).toBe(`5${unit} 15${unit}`)
				expect(boxModelSpacingToCSSValue([1, 2, 3, 4], unit)).toBe(`1${unit} 2${unit} 3${unit} 4${unit}`)
			})
		})

		it("should handle zero values with custom units", () => {
			expect(boxModelSpacingToCSSValue(0, "px")).toBe("0px")
			expect(boxModelSpacingToCSSValue([0, 0], "em")).toBe("0em 0em")
			expect(boxModelSpacingToCSSValue([0, 0, 0, 0], "%")).toBe("0% 0% 0% 0%")
		})
	})

	describe("edge cases and error conditions", () => {
		it("should handle empty arrays", () => {
			expect(boxModelSpacingToCSSValue([] as any)).toBe("")
		})

		it("should handle arrays with too many values", () => {
			expect(boxModelSpacingToCSSValue([1, 2, 3, 4, 5] as any)).toBe("1rem 2rem 3rem 4rem 5rem")
		})

		it("should handle arrays with single value", () => {
			expect(boxModelSpacingToCSSValue([10] as any)).toBe("10rem")
		})

		it("should preserve decimal precision", () => {
			expect(boxModelSpacingToCSSValue(1.23456)).toBe("1.23456rem")
			expect(boxModelSpacingToCSSValue([0.1, 0.01, 0.001])).toBe("0.1rem 0.01rem 0.001rem")
		})
	})

	describe("real-world usage scenarios", () => {
		it("should handle common spacing patterns", () => {
			// Common single values
			expect(boxModelSpacingToCSSValue(1)).toBe("1rem")
			expect(boxModelSpacingToCSSValue(1.5)).toBe("1.5rem")
			expect(boxModelSpacingToCSSValue(2)).toBe("2rem")

			// Common margin/padding patterns
			expect(boxModelSpacingToCSSValue([1, 0])).toBe("1rem 0rem") // vertical only
			expect(boxModelSpacingToCSSValue([0, 1])).toBe("0rem 1rem") // horizontal only
			expect(boxModelSpacingToCSSValue([1, 2, 1, 2])).toBe("1rem 2rem 1rem 2rem") // symmetric
		})

		it("should work with pixel values for borders", () => {
			expect(boxModelSpacingToCSSValue(1, "px")).toBe("1px")
			expect(boxModelSpacingToCSSValue([1, 0], "px")).toBe("1px 0px")
		})

		it("should work with percentage values for responsive design", () => {
			expect(boxModelSpacingToCSSValue(50, "%")).toBe("50%")
			expect(boxModelSpacingToCSSValue([10, 5], "%")).toBe("10% 5%")
		})
	})

	describe("type safety and TypeScript integration", () => {
		it("should accept valid TBoxModelSpacing types", () => {
			const spacing1: TBoxModelSpacing = 10
			const spacing2: TBoxModelSpacing = [10, 20]
			const spacing3: TBoxModelSpacing = [10, 20, 30]
			const spacing4: TBoxModelSpacing = [10, 20, 30, 40]

			expect(boxModelSpacingToCSSValue(spacing1)).toBe("10rem")
			expect(boxModelSpacingToCSSValue(spacing2)).toBe("10rem 20rem")
			expect(boxModelSpacingToCSSValue(spacing3)).toBe("10rem 20rem 30rem")
			expect(boxModelSpacingToCSSValue(spacing4)).toBe("10rem 20rem 30rem 40rem")
		})

		it("should accept valid TCssUnit types", () => {
			const unit1: TCssUnit = "px"
			const unit2: TCssUnit = "rem"
			const unit3: TCssUnit = "vh"
			const unit4: TCssUnit = "cqw"

			expect(boxModelSpacingToCSSValue(10, unit1)).toBe("10px")
			expect(boxModelSpacingToCSSValue(10, unit2)).toBe("10rem")
			expect(boxModelSpacingToCSSValue(10, unit3)).toBe("10vh")
			expect(boxModelSpacingToCSSValue(10, unit4)).toBe("10cqw")
		})
	})

	describe("performance considerations", () => {
		it("should handle large arrays efficiently", () => {
			const largeArray = new Array(1000).fill(1) as TBoxModelSpacing
			const result = boxModelSpacingToCSSValue(largeArray)
			expect(result).toContain("1rem")
			expect(result?.split(" ")).toHaveLength(1000)
		})

		it("should not mutate input arrays", () => {
			const original = [1, 2, 3, 4]
			const originalCopy = [...original]
			boxModelSpacingToCSSValue(original as TBoxModelSpacing)
			expect(original).toEqual(originalCopy)
		})
	})
})
