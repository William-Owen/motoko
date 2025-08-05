import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import LoadingIndicator from "."

describe("LoadingIndicator", () => {
	it("renders with default props", () => {
		render(<LoadingIndicator />)

		const element = screen.getByTestId("LoadingIndicator")
		expect(element).toBeInTheDocument()
		expect(element).toHaveAttribute("aria-label", "Loading...")
		expect(element.tagName).toBe("OUTPUT")
	})

	it("applies custom className", () => {
		render(<LoadingIndicator className="custom-class" />)

		const element = screen.getByTestId("LoadingIndicator")
		expect(element).toHaveClass("custom-class")
	})

	it("applies custom size as CSS custom property", () => {
		render(<LoadingIndicator size={3} />)

		const element = screen.getByTestId("LoadingIndicator")
		expect(element).toHaveStyle({ "--comp-icon-size": "3rem" })
	})

	it("applies custom aria-label", () => {
		render(<LoadingIndicator aria-label="Please wait" />)

		const element = screen.getByTestId("LoadingIndicator")
		expect(element).toHaveAttribute("aria-label", "Please wait")
	})

	it("renders SVG with correct structure", () => {
		render(<LoadingIndicator />)

		const element = screen.getByTestId("LoadingIndicator")
		const svg = element.querySelector("svg")

		expect(svg).toBeInTheDocument()
		expect(svg).toHaveAttribute("aria-hidden", "true")
		expect(svg).toHaveAttribute("viewBox", "0 0 24 24")

		// Check for circle and path elements
		const circle = svg?.querySelector("circle")
		const path = svg?.querySelector("path")
		const animateTransform = svg?.querySelector("animateTransform")

		expect(circle).toBeInTheDocument()
		expect(path).toBeInTheDocument()
		expect(animateTransform).toBeInTheDocument()
	})

	it("has correct animation attributes", () => {
		render(<LoadingIndicator />)

		const animateTransform = document.querySelector("animateTransform")
		expect(animateTransform).toHaveAttribute("attributeName", "transform")
		expect(animateTransform).toHaveAttribute("type", "rotate")
		expect(animateTransform).toHaveAttribute("dur", "0.75s")
		expect(animateTransform).toHaveAttribute("repeatCount", "indefinite")
	})

	it("combines all props correctly", () => {
		render(<LoadingIndicator className="test-class" size={1.5} aria-label="Custom loading" />)

		const element = screen.getByTestId("LoadingIndicator")
		expect(element).toHaveClass("test-class")
		expect(element).toHaveStyle({ "--comp-icon-size": "1.5rem" })
		expect(element).toHaveAttribute("aria-label", "Custom loading")
	})
})
