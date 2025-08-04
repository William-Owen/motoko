import { describe, expect, it } from "vitest"
import { cn, cssBoxSpacing, formatDate, formatNumber } from "./index"

describe("index exports", () => {
	it("exports all components and utilities", () => {
		expect(cn).toBeDefined()
		expect(cssBoxSpacing).toBeDefined()
		expect(formatDate).toBeDefined()
		expect(formatNumber).toBeDefined()
	})
})
describe("utils index exports", () => {
	it("exports all utilities", () => {
		expect(cn).toBeDefined()
		expect(cssBoxSpacing).toBeDefined()
		expect(formatDate).toBeDefined()
		expect(formatNumber).toBeDefined()
	})
})
