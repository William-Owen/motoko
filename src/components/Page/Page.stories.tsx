import type { Meta, StoryObj } from "@storybook/react"
import Page from "./Page"

const meta: Meta<typeof Page> = {
	title: "Components/Layout/Page",
	component: Page,
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		children: {
			control: "text",
			description: "Content to display inside the page",
		},
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
		restrictWidth: {
			control: { type: "radio", options: [false, true, 320, 768, 1024, 1200] },
			description: "Whether to restrict the page width (boolean) or specific width (number)",
		},
		center: {
			control: "boolean",
			description: "Whether to center the page",
		},
		padding: {
			control: "object",
			description: "Padding as number or array of 1-4 numbers [top, right, bottom, left]",
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: "This is a default page layout",
	},
}

export const WithDefaultRestrictedWidth: Story = {
	args: {
		children: "This page has default restricted width",
		restrictWidth: true,
	},
}

export const WithSpecifiedRestrictedWidth: Story = {
	args: {
		children: "This page has restricted width of 400px",
		restrictWidth: 400,
	},
}

export const WithCustomClassName: Story = {
	args: {
		children: "This page has a custom class",
		className: "custom-page-class",
	},
}

export const WithComplexContent: Story = {
	args: {
		children: (
			<div>
				<h1>Page Title</h1>
				<p>This is some complex content with multiple elements.</p>
				<button type="button">Click me</button>
			</div>
		),
	},
}

export const Empty: Story = {
	args: {},
}
