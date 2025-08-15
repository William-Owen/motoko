import { StarIcon } from "@phosphor-icons/react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import NoData from "./NoData"

describe("NoData", () => {
	it("renders with default props", () => {
		render(<NoData />)

		const noData = screen.getByTestId("NoData")
		const message = screen.getByText("No results.")

		expect(noData).toBeInTheDocument()
		expect(message).toBeInTheDocument()
	})

	it("renders custom message", () => {
		render(<NoData message="Custom no data message" />)

		expect(screen.getByText("Custom no data message")).toBeInTheDocument()
		expect(screen.queryByText("No results.")).not.toBeInTheDocument()
	})

	it("renders custom icon", () => {
		render(<NoData icon={<StarIcon data-testid="custom-icon" />} />)

		expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
	})

	it("applies custom className", () => {
		render(<NoData className="custom-class" />)

		const noData = screen.getByTestId("NoData")
		expect(noData).toHaveClass("custom-class")
	})

	it("applies custom theme styles", () => {
		const customTheme = {
			padding: "4rem",
			spacingGap: "4rem",
			iconFillColor: "blue",
		}

		render(<NoData theme={customTheme} />)

		const noData = screen.getByTestId("NoData")

		expect(noData).toHaveStyle("--NoData-padding: 4rem")
		expect(noData).toHaveStyle("--NoData-spacing-gap: 4rem")
		expect(noData).toHaveStyle("--NoData-icon-fill-color: blue")
	})

	it("merges partial theme with defaults", () => {
		render(<NoData theme={{ padding: "3rem" }} />)

		const noData = screen.getByTestId("NoData")

		expect(noData).toHaveStyle("--NoData-padding: 3rem")
	})

	it("has correct structure", () => {
		render(<NoData />)

		const noData = screen.getByTestId("NoData")
		const iconDiv = noData.querySelector('[class*="icon"]')
		const messageDiv = noData.querySelector('[class*="message"]')

		expect(iconDiv).toBeInTheDocument()
		expect(messageDiv).toBeInTheDocument()
	})
})
