// src/components/NameValue/NameValue.stories.tsx
import type { Meta, StoryObj } from "@storybook/react"

import NameValue from "./"

const meta: Meta<typeof NameValue> = {
	title: "Components/Data/NameValue",
	component: NameValue,
	parameters: {
		layout: "padded",
	},
	argTypes: {
		name: {
			control: "text",
			description: "Label text to display",
		},
		value: {
			control: "text",
			description: "Value to display (string, number, boolean, Date, array, or object)",
		},
		direction: {
			control: "select",
			options: ["row", "column"],
			description: "Flex direction for layout",
		},
		noColon: {
			control: "boolean",
			description: "Hide the colon after the name",
		},
		className: {
			control: "text",
			description: "Additional CSS class for the name element",
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		name: "Username",
		value: "john.doe",
	},
}

export const WithNumber: Story = {
	args: {
		name: "Age",
		value: 25,
	},
}

export const WithBoolean: Story = {
	args: {
		name: "Active",
		value: true,
	},
}

export const WithBooleanFalse: Story = {
	args: {
		name: "Enabled",
		value: false,
	},
}

export const WithArray: Story = {
	args: {
		name: "Tags",
		value: ["react", "typescript", "storybook"],
	},
}

export const WithObject: Story = {
	args: {
		name: "Config",
		value: { theme: "dark", language: "en", notifications: true },
	},
}

export const WithDate: Story = {
	args: {
		name: "Created",
		value: new Date("2024-03-15"),
	},
}

export const WithDateString: Story = {
	args: {
		name: "Updated",
		value: "2024-03-15T10:30:00Z",
	},
}

export const ColumnDirection: Story = {
	args: {
		name: "Description",
		value: "This is a longer text that might look better in column layout",
		direction: "column",
	},
}

export const WithoutColon: Story = {
	args: {
		name: "Title",
		value: "Clean Format",
		noColon: true,
	},
}

export const ValueOnly: Story = {
	args: {
		value: "Just a value without a label",
	},
}

export const EmptyValue: Story = {
	args: {
		name: "Empty Field",
		value: "",
	},
}

export const ZeroValue: Story = {
	args: {
		name: "Count",
		value: 0,
	},
}

export const WithCustomClassName: Story = {
	args: {
		name: "Styled Label",
		value: "Custom styling applied",
		className: "font-bold text-blue-600",
	},
}

export const ComplexObject: Story = {
	args: {
		name: "User Data",
		value: {
			id: 123,
			profile: { name: "John", active: true },
			permissions: ["read", "write"],
		},
	},
}
