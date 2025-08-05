import type { Meta, StoryObj } from "@storybook/react"
import LoadingIndicator from "."

const meta: Meta<typeof LoadingIndicator> = {
	title: "Components/LoadingIndicator",
	component: LoadingIndicator,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		size: {
			control: { type: "range", min: 0.5, max: 5, step: 0.5 },
			description: "Size of the loading spinner in rem units",
		},
		"aria-label": {
			control: "text",
			description: "Accessible label for screen readers",
		},
		className: {
			control: "text",
			description: "Additional CSS class name",
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const Small: Story = {
	args: {
		size: 1,
	},
}

export const Large: Story = {
	args: {
		size: 4,
	},
}

export const CustomLabel: Story = {
	args: {
		"aria-label": "Processing your request...",
	},
}

export const CustomSize: Story = {
	args: {
		size: 2.5,
	},
}

export const WithCustomClass: Story = {
	args: {
		className: "custom-loading-style",
	},
	parameters: {
		docs: {
			description: {
				story: "Example with custom CSS class applied",
			},
		},
	},
}

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
			<LoadingIndicator size={0.75} aria-label="Extra small" />
			<LoadingIndicator size={1} aria-label="Small" />
			<LoadingIndicator size={1.5} aria-label="Medium" />
			<LoadingIndicator size={2} aria-label="Default" />
			<LoadingIndicator size={3} aria-label="Large" />
			<LoadingIndicator size={4} aria-label="Extra large" />
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: "Comparison of different sizes from 0.75rem to 4rem",
			},
		},
	},
}
