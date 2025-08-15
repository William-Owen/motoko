import { InfoIcon, XCircleIcon } from "@phosphor-icons/react"
import type { Meta, StoryObj } from "@storybook/react"
import NoData from "./"

const meta: Meta<typeof NoData> = {
	title: "Components/Indicators/NoData",
	component: NoData,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		message: {
			control: "text",
			description: "Custom message to display",
		},
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
		icon: {
			control: false,
			description: "Custom icon element",
		},
		theme: {
			control: "object",
			description: "Theme customization object",
		},
	},
} satisfies Meta<typeof NoData>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const CustomMessage: Story = {
	args: {
		message: "No items found matching your criteria",
	},
}

export const WithCustomIcon: Story = {
	args: {
		message: "No data available",
		icon: <InfoIcon size={32} />,
	},
}

export const ErrorState: Story = {
	args: {
		message: "Failed to load data. Please try again.",
		icon: <XCircleIcon size={32} />,
		theme: {
			iconFillColor: "red",
		},
	},
}

export const LargeSpacing: Story = {
	args: {
		message: "No results found",
		theme: {
			padding: "3rem",
			spacingGap: "2rem",
		},
	},
}

export const CompactLayout: Story = {
	args: {
		message: "Empty",
		theme: {
			padding: "0.5rem",
			spacingGap: "0.5rem",
		},
	},
}

export const CustomStyling: Story = {
	args: {
		message: "No content available",
		theme: {
			padding: "2rem",
			spacingGap: "1.5rem",
			iconFillColor: "#6366f1",
		},
	},
}

export const LongMessage: Story = {
	args: {
		message:
			"We couldn't find any results that match your search criteria. Try adjusting your filters or search terms to find what you're looking for.",
	},
}

export const WithClassName: Story = {
	args: {
		message: "Custom styled component",
		className: "border-2 border-dashed border-gray-300 rounded-lg bg-gray-50",
	},
}
