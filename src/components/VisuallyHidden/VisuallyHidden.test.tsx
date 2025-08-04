import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import VisuallyHidden from "./"
import style from "./VisuallyHidden.module.css"

describe("VisuallyHidden", () => {
	it("renders children with correct testid", () => {
		render(<VisuallyHidden>Hidden content</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toBeInTheDocument()
		expect(element).toHaveTextContent("Hidden content")
	})

	it("applies default visually hidden class when showOnFocus is false", () => {
		render(<VisuallyHidden>Hidden content</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toHaveClass(style.VisuallyHidden)
	})

	it("applies show on focus class when showOnFocus is true", () => {
		render(<VisuallyHidden showOnFocus>Show on focus content</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toHaveClass(style.VisuallyHiddenShowOnFocus)
		expect(element).not.toHaveClass(style.VisuallyHidden)
	})

	it("renders complex children correctly", () => {
		render(
			<VisuallyHidden>
				<span>Skip to</span> <a href="#main">main content</a>
			</VisuallyHidden>
		)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toHaveTextContent("Skip to main content")
		expect(element.querySelector("a")).toHaveAttribute("href", "#main")
	})

	// New tests for better coverage
	it("applies correct class when showOnFocus is explicitly false", () => {
		render(<VisuallyHidden showOnFocus={false}>Content</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toHaveClass(style.VisuallyHidden)
		expect(element).not.toHaveClass(style.VisuallyHiddenShowOnFocus)
	})

	it("handles empty children", () => {
		render(<VisuallyHidden>{""}</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toBeInTheDocument()
		expect(element).toBeEmptyDOMElement()
	})

	it("handles null children", () => {
		render(<VisuallyHidden>{null}</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toBeInTheDocument()
		expect(element).toBeEmptyDOMElement()
	})

	it("handles undefined children", () => {
		render(<VisuallyHidden>{undefined}</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toBeInTheDocument()
		expect(element).toBeEmptyDOMElement()
	})

	it("handles zero as children", () => {
		render(<VisuallyHidden>{0}</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toBeInTheDocument()
		expect(element).toHaveTextContent("0")
	})

	it("handles multiple text nodes", () => {
		render(<VisuallyHidden>First text Second text</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element).toHaveTextContent("First text Second text")
	})

	it("renders with div element by default", () => {
		render(<VisuallyHidden>Content</VisuallyHidden>)

		const element = screen.getByTestId("VisuallyHidden")
		expect(element.tagName).toBe("DIV")
	})

	it("preserves nested component structure", () => {
		const NestedComponent = () => <button type="button">Click me</button>

		render(
			<VisuallyHidden>
				<NestedComponent />
			</VisuallyHidden>
		)

		const element = screen.getByTestId("VisuallyHidden")
		const button = element.querySelector("button")
		expect(button).toBeInTheDocument()
		expect(button).toHaveTextContent("Click me")
		expect(button).toHaveAttribute("type", "button")
	})
})
