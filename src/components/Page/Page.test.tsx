import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Page from "./"
import style from "./Page.module.css"

describe("Page", () => {
	it("renders children content", () => {
		render(<Page>Test content</Page>)

		expect(screen.getByText("Test content")).toBeInTheDocument()
	})

	it("renders with default testid", () => {
		render(<Page>Content</Page>)

		expect(screen.getByTestId("Page")).toBeInTheDocument()
	})

	it("applies restrictWidth class when prop is true", () => {
		render(<Page restrictWidth>Content</Page>)

		const pageElement = screen.getByTestId("Page")
		expect(pageElement).toHaveClass(style.restrictWidth)
		expect(pageElement).not.toHaveStyle("--size-pageWidth: undefined")
	})

	it("does not apply restrictWidth class when prop is false", () => {
		render(<Page restrictWidth={false}>Content</Page>)

		const pageElement = screen.getByTestId("Page")
		expect(pageElement).not.toHaveClass(style.restrictWidth)
	})

	it("applies restrictWidth class and sets CSS custom property when prop is a number", () => {
		render(<Page restrictWidth={800}>Content</Page>)

		const pageElement = screen.getByTestId("Page")
		expect(pageElement).toHaveClass(style.restrictWidth)
		expect(pageElement).toHaveStyle("--size-pageWidth: 800px")
	})

	it("applies restrictWidth class with different numeric values", () => {
		render(<Page restrictWidth={1200}>Content</Page>)

		const pageElement = screen.getByTestId("Page")
		expect(pageElement).toHaveClass(style.restrictWidth)
		expect(pageElement).toHaveStyle("--size-pageWidth: 1200px")
	})

	it("does not apply restrictWidth class when prop is undefined", () => {
		render(<Page>Content</Page>)

		const pageElement = screen.getByTestId("Page")
		expect(pageElement).not.toHaveClass(style.restrictWidth)
	})

	it("applies custom className", () => {
		render(<Page className="custom-class">Content</Page>)

		const pageElement = screen.getByTestId("Page")
		expect(pageElement).toHaveClass("custom-class")
	})

	it("combines base class with restrictWidth and custom className", () => {
		render(
			<Page restrictWidth className="custom-class">
				Content
			</Page>
		)

		const pageElement = screen.getByTestId("Page")
		expect(pageElement).toHaveClass(style.Page)
		expect(pageElement).toHaveClass(style.restrictWidth)
		expect(pageElement).toHaveClass("custom-class")
	})

	it("combines base class with numeric restrictWidth and custom className", () => {
		render(
			<Page restrictWidth={1000} className="custom-class">
				Content
			</Page>
		)

		const pageElement = screen.getByTestId("Page")
		expect(pageElement).toHaveClass(style.Page)
		expect(pageElement).toHaveClass(style.restrictWidth)
		expect(pageElement).toHaveClass("custom-class")
		expect(pageElement).toHaveStyle("--size-pageWidth: 1000px")
	})

	it("renders without children", () => {
		render(<Page />)

		const pageElement = screen.getByTestId("Page")
		expect(pageElement).toBeInTheDocument()
		expect(pageElement).toBeEmptyDOMElement()
	})

	it("renders complex children content", () => {
		render(
			<Page>
				<h1>Title</h1>
				<p>Paragraph</p>
			</Page>
		)

		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Title")
		expect(screen.getByText("Paragraph")).toBeInTheDocument()
	})
})
