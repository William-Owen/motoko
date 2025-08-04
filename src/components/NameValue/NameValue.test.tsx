// src/components/NameValue/NameValue.test.tsx

import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import NameValue from "./"
import style from "./NameValue.module.css"

describe("NameValue", () => {
	it("renders with name and string value", () => {
		render(<NameValue name="Label" value="Test Value" />)

		expect(screen.getByText("Label:")).toBeInTheDocument()
		expect(screen.getByText("Test Value")).toBeInTheDocument()
	})

	it("renders without colon when noColon is true", () => {
		render(<NameValue name="Label" value="Test Value" noColon />)

		expect(screen.getByText("Label")).toBeInTheDocument()
		expect(screen.queryByText("Label:")).not.toBeInTheDocument()
	})

	it("renders with column direction", () => {
		const { container } = render(<NameValue name="Label" value="Test Value" direction="column" />)

		const wrapper = container.firstChild as HTMLElement
		expect(wrapper).toHaveStyle({ flexDirection: "column" })
	})

	it("renders with row direction by default", () => {
		const { container } = render(<NameValue name="Label" value="Test Value" />)

		const wrapper = container.firstChild as HTMLElement
		expect(wrapper).toHaveStyle({ flexDirection: "row" })
	})

	it("handles number values", () => {
		render(<NameValue name="Count" value={42} />)

		expect(screen.getByText("42")).toBeInTheDocument()
	})

	it("handles boolean values with capitalized True/False", () => {
		render(<NameValue name="Active" value={true} />)
		expect(screen.getByText("True")).toBeInTheDocument()

		render(<NameValue name="Inactive" value={false} />)
		expect(screen.getByText("False")).toBeInTheDocument()
	})

	it("handles array values by joining with commas", () => {
		render(<NameValue name="Items" value={["apple", "banana", "cherry"]} />)

		expect(screen.getByText("apple, banana, cherry")).toBeInTheDocument()
	})

	it("handles Date objects", () => {
		const date = new Date("2024-03-15")
		render(<NameValue name="Date" value={date} />)

		expect(screen.getByText("15 Mar 2024")).toBeInTheDocument()
	})

	it("handles valid date strings", () => {
		render(<NameValue name="Date" value="2024-03-15" />)

		expect(screen.getByText("15 Mar 2024")).toBeInTheDocument()
	})

	it("handles invalid Date objects as strings", () => {
		const invalidDate = new Date("invalid")
		render(<NameValue name="Date" value={invalidDate} />)

		expect(screen.getByText("Invalid Date")).toBeInTheDocument()
	})

	it("handles non-date strings normally", () => {
		render(<NameValue name="Text" value="regular string" />)

		expect(screen.getByText("regular string")).toBeInTheDocument()
	})

	it("handles object values with JSON stringification", () => {
		const obj = { key: "value", number: 42 }
		render(<NameValue name="Config" value={obj} />)

		expect(screen.getByText('{"key":"value","number":42}')).toBeInTheDocument()
	})

	it("renders without name when not provided", () => {
		render(<NameValue value="Just Value" />)

		expect(screen.getByText("Just Value")).toBeInTheDocument()
		expect(screen.queryByText(":")).not.toBeInTheDocument()
	})

	it("renders undefined when no value provided", () => {
		render(<NameValue name="Empty" />)

		expect(screen.getByText("Empty:")).toBeInTheDocument()
		expect(screen.getByText("undefined")).toBeInTheDocument()
	})

	it("handles empty string value by not rendering value element", () => {
		const { container } = render(<NameValue name="Empty" value="" />)

		expect(screen.getByText("Empty:")).toBeInTheDocument()
		expect(container.querySelector(`.${style.value}`)).not.toBeInTheDocument()
	})

	it("handles zero as valid value", () => {
		render(<NameValue name="Zero" value={0} />)

		expect(screen.getByText("0")).toBeInTheDocument()
	})

	it("handles false as valid value", () => {
		render(<NameValue name="False" value={false} />)

		expect(screen.getByText("False")).toBeInTheDocument()
	})

	it("applies correct CSS classes", () => {
		render(<NameValue name="Test" value="Value" />)

		const nameElement = screen.getByText("Test:")
		const valueElement = screen.getByText("Value")

		expect(nameElement).toHaveClass(style.name)
		expect(valueElement).toHaveClass(style.value)
	})

	it("applies custom className to name element", () => {
		render(<NameValue name="Test" value="Value" className="custom-class" />)

		const nameElement = screen.getByText("Test:")
		expect(nameElement).toHaveClass("custom-class")
	})

	it("uses correct CSS class for wrapper", () => {
		const { container } = render(<NameValue name="Test" value="Value" />)
		const wrapper = container.firstChild as HTMLElement

		expect(wrapper).toHaveClass(style.NameValue)
	})
})
