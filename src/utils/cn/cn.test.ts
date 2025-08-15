/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: Required for Testing */
/** biome-ignore-all lint/complexity/useSimplifiedLogicExpression: Required for Testing */
import { describe, expect, it } from "vitest"
import cn from "./"

describe("bcn utility", () => {
	describe("basic functionality", () => {
		it("joins string arguments with spaces", () => {
			expect(cn("button", "primary", "large")).toBe("button primary large")
		})

		it("handles single string argument", () => {
			expect(cn("button")).toBe("button")
		})

		it("returns empty string when no arguments", () => {
			expect(cn()).toBe("")
		})

		it("handles empty string arguments", () => {
			expect(cn("", "button", "")).toBe("button")
		})
	})

	describe("falsy value filtering", () => {
		it("filters out false values", () => {
			expect(cn("button", false, "active")).toBe("button active")
		})

		it("filters out null values", () => {
			expect(cn("button", null, "active")).toBe("button active")
		})

		it("filters out undefined values", () => {
			expect(cn("button", undefined, "active")).toBe("button active")
		})

		it("filters out all falsy values", () => {
			expect(cn("button", false, null, undefined, "active")).toBe("button active")
		})

		it("returns empty string when all arguments are falsy", () => {
			expect(cn(false, null, undefined)).toBe("")
		})
	})

	describe("conditional expressions", () => {
		it("handles boolean && string expressions (truthy)", () => {
			const isActive = true
			expect(cn("button", isActive && "active")).toBe("button active")
		})

		it("handles boolean && string expressions (falsy)", () => {
			const isActive = false
			expect(cn("button", isActive && "active")).toBe("button")
		})

		it("handles complex conditional logic", () => {
			const isDisabled = false
			const isPrimary = true
			const size = "large"

			expect(
				cn("button", isPrimary && "button-primary", isDisabled && "button-disabled", size === "large" && "button-large")
			).toBe("button button-primary button-large")
		})
	})

	describe("space-separated string flattening", () => {
		it("flattens single space-separated string", () => {
			expect(cn("button primary large")).toBe("button primary large")
		})

		it("flattens multiple space-separated strings", () => {
			expect(cn("button primary", "large disabled")).toBe("button primary large disabled")
		})

		it("handles mixed single and space-separated strings", () => {
			expect(cn("button", "primary large", "disabled")).toBe("button primary large disabled")
		})
	})

	describe("real-world usage patterns", () => {
		it("works with React component className patterns", () => {
			const isActive = true
			const isDisabled = false
			const variant = "primary"
			const size = "large"

			expect(
				cn(
					"button",
					`button--${variant}`,
					`button--${size}`,
					isActive && "button--active",
					isDisabled && "button--disabled"
				)
			).toBe("button button--primary button--large button--active")
		})

		it("works with CSS modules pattern", () => {
			const styles = {
				button: "button_abc123",
				primary: "primary_def456",
				active: "active_ghi789",
			}
			const isActive = true

			expect(cn(styles.button, styles.primary, isActive && styles.active)).toBe(
				"button_abc123 primary_def456 active_ghi789"
			)
		})

		it("handles utility class combinations", () => {
			expect(cn("flex items-center", "px-4 py-2", "bg-blue-500 text-white")).toBe(
				"flex items-center px-4 py-2 bg-blue-500 text-white"
			)
		})
	})

	describe("edge cases", () => {
		it("handles very long class lists", () => {
			const longClassList = Array(100).fill("class").join(" ")
			expect(cn(longClassList)).toBe(Array(100).fill("class").join(" "))
		})

		it("handles special characters in class names", () => {
			expect(cn("button-primary_large", "icon:before")).toBe("button-primary_large icon:before")
		})

		it("handles numbers in class names", () => {
			expect(cn("col-12", "mt-4", "z-10")).toBe("col-12 mt-4 z-10")
		})

		it("handles unicode characters", () => {
			expect(cn("button-🚀", "icon-✨")).toBe("button-🚀 icon-✨")
		})
	})

	describe("performance considerations", () => {
		it("handles large number of arguments efficiently", () => {
			const manyArgs = Array(1000)
				.fill(null)
				.map((_, i) => (i % 2 === 0 ? `class-${i}` : false))
			const result = cn(...manyArgs)

			// Should contain only even-indexed classes
			expect(result).toContain("class-0")
			expect(result).toContain("class-998")
			expect(result).not.toContain("undefined")
		})

		it("handles empty arrays and complex nested conditionals", () => {
			const conditions = [
				true && "a", // "a" (truthy)
				false && "b", // false (falsy)
				null, // null (falsy)
				undefined, // undefined (falsy)
				"" as string, // "" (falsy - empty string)
				0 as number, // 0 (falsy - zero)
				"valid-class", // "valid-class" (truthy)
			]
			expect(cn(...conditions)).toBe("a valid-class")
		})
	})

	describe("type safety", () => {
		it("maintains type safety with proper arguments", () => {
			// These should not cause TypeScript errors
			const validUsages = [
				cn("string"),
				cn(true && "conditional"),
				cn(false && "wont-show"),
				cn(null),
				cn(undefined),
				cn("multiple", "classes", true && "conditional"),
			]

			validUsages.forEach((usage, index) => {
				expect(typeof usage).toBe("string")
			})
		})
	})

	describe("documentation examples", () => {
		it("matches first documentation example", () => {
			const isActive = true
			expect(cn("button", isActive && "active", "large")).toBe("button active large")
		})

		it("matches second documentation example", () => {
			expect(cn("button primary", false, null, "disabled")).toBe("button primary disabled")
		})
	})
})
