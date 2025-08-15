import type { Meta, StoryObj } from "@storybook/react"
import VisuallyHidden from "./"

const meta: Meta<typeof VisuallyHidden> = {
	title: "Components/Utility/VisuallyHidden",
	component: VisuallyHidden,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		showOnFocus: {
			control: "boolean",
			description: "Whether to show the content when it receives focus",
		},
		children: {
			control: "text",
			description: "Content to be visually hidden",
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: "This content is visually hidden but accessible to screen readers",
	},
}

export const WithShowOnFocus: Story = {
	args: {
		showOnFocus: true,
		children: "Skip to main content",
	},
}

export const WithSkipLink: Story = {
	args: {
		showOnFocus: true,
		children: <a href="#main">Skip to main content</a>,
	},
}

export const WithComplexContent: Story = {
	args: {
		children: (
			<>
				<span>Current page: </span>
				<strong>Products</strong>
				<span> of 12 pages</span>
			</>
		),
	},
}

export const Empty: Story = {
	args: {},
}
