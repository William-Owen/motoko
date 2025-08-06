import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ErrorMessage from "./"

describe("ErrorMessage", () => {
	it("returns null when no error or message provided", () => {
		const { container } = render(<ErrorMessage />)
		expect(container.firstChild).toBeNull()
	})

	it("renders with message prop", () => {
		render(<ErrorMessage message="Something went wrong" />)
		expect(screen.getByTestId("ErrorMessage")).toBeInTheDocument()
		expect(screen.getByText("Something went wrong")).toBeInTheDocument()
	})

	it("renders with label", () => {
		render(<ErrorMessage message="Error occurred" label="Form Validation" />)
		expect(screen.getByText("Error:", { exact: false })).toBeInTheDocument()
		expect(screen.getByText("Form Validation")).toBeInTheDocument()
	})

	it("renders with icon", () => {
		const icon = <span data-testid="error-icon">⚠️</span>
		render(<ErrorMessage message="Error occurred" icon={icon} />)
		expect(screen.getByTestId("error-icon")).toBeInTheDocument()
	})

	it("applies custom className", () => {
		render(<ErrorMessage message="Error" className="custom-error" />)
		expect(screen.getByTestId("ErrorMessage")).toHaveClass("custom-error")
	})

	it("renders error.message when available", () => {
		const error = { message: "Network error" }
		render(<ErrorMessage error={error} />)
		expect(screen.getByText("Network error")).toBeInTheDocument()
	})

	it("renders error.response.data.detail", () => {
		const error = {
			response: {
				data: {
					detail: "  Validation failed  ",
				},
			},
		}
		render(<ErrorMessage error={error} />)
		expect(screen.getByText("Validation failed")).toBeInTheDocument()
	})

	it("renders error.response.data.title", () => {
		const error = {
			response: {
				data: {
					title: "Bad Request",
				},
			},
		}
		render(<ErrorMessage error={error} />)
		expect(screen.getByText("Bad Request")).toBeInTheDocument()
	})

	it("renders field errors as list", () => {
		const error = {
			response: {
				data: {
					errors: {
						email: ["Email is required", "Email format invalid"],
						password: ["Password too short"],
					},
				},
			},
		}
		render(<ErrorMessage error={error} />)

		expect(screen.getByText("email")).toBeInTheDocument()
		expect(screen.getByText(": Email is required, Email format invalid")).toBeInTheDocument()
		expect(screen.getByText("password")).toBeInTheDocument()
		expect(screen.getByText(": Password too short")).toBeInTheDocument()
		expect(screen.getByRole("list")).toBeInTheDocument()
	})

	it("prioritizes message prop over error", () => {
		const error = { message: "Network error" }
		render(<ErrorMessage error={error} message="Custom message" />)
		expect(screen.getByText("Custom message")).toBeInTheDocument()
		expect(screen.queryByText("Network error")).not.toBeInTheDocument()
	})

	it("renders complex error structure", () => {
		const error = {
			response: {
				data: {
					detail: "Validation failed",
					title: "Bad Request",
					errors: {
						name: ["Name is required"],
					},
				},
			},
		}

		render(<ErrorMessage error={error} label="User Form" />)

		expect(screen.getByText("Error:", { exact: false })).toBeInTheDocument()
		expect(screen.getByText("User Form")).toBeInTheDocument()
		expect(screen.getByText("Validation failed")).toBeInTheDocument()
		expect(screen.getByText("Bad Request")).toBeInTheDocument()
		expect(screen.getByText("name")).toBeInTheDocument()
		expect(screen.getByText(": Name is required")).toBeInTheDocument()
	})
})
