import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PageTitle from "./"
import style from "./PageTitle.module.css"

// Mock icon component for testing
const MockIcon = () => <svg data-testid="mock-icon" />

describe("PageTitle", () => {
	it("renders with required props", () => {
		render(<PageTitle title="Test Title" />)

		expect(screen.getByTestId("PageTitle")).toBeInTheDocument()
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Test Title")
	})

	it("renders section when provided", () => {
		render(<PageTitle section="Test Section" title="Test Title" />)

		expect(screen.getByText("Test Section")).toBeInTheDocument()
	})

	it("renders description when provided", () => {
		render(<PageTitle title="Test Title" description="Test description content" />)

		expect(screen.getByText("Test description content")).toBeInTheDocument()
	})

	it("renders icon when provided", () => {
		render(<PageTitle title="Test Title" Icon={MockIcon} />)

		expect(screen.getByTestId("mock-icon")).toBeInTheDocument()
	})

	it("applies center class when center prop is true", () => {
		render(<PageTitle title="Test Title" center />)

		const pageTitle = screen.getByTestId("PageTitle")
		expect(pageTitle).toHaveClass(style.center)
	})

	it("applies custom className", () => {
		render(<PageTitle title="Test Title" className="custom-class" />)

		const pageTitle = screen.getByTestId("PageTitle")
		expect(pageTitle).toHaveClass("custom-class")
	})

	it("renders all props together", () => {
		render(
			<PageTitle
				section="Features"
				title="Component Library"
				description="Modern React components built with TypeScript"
				Icon={MockIcon}
				center
				className="featured-title"
			/>
		)

		expect(screen.getByText("Features")).toBeInTheDocument()
		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Component Library")
		expect(screen.getByText("Modern React components built with TypeScript")).toBeInTheDocument()
		expect(screen.getByTestId("mock-icon")).toBeInTheDocument()

		const pageTitle = screen.getByTestId("PageTitle")
		expect(pageTitle).toHaveClass(style.center, "featured-title")
	})

	it("does not render description paragraph when not provided", () => {
		render(<PageTitle title="Test Title" />)

		expect(screen.queryByText("p")).not.toBeInTheDocument()
	})

	it("does not render icon container when icon not provided", () => {
		render(<PageTitle title="Test Title" />)

		const pageTitle = screen.getByTestId("PageTitle")
		expect(pageTitle.querySelector(".icon")).not.toBeInTheDocument()
	})
})
