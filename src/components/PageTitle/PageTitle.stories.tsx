import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentType, SVGProps } from "react"
import PageTitle from "./PageTitle"

// Example icons for stories
const BookIcon: ComponentType<SVGProps<SVGSVGElement>> = props => (
	<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
	</svg>
)

const SettingsIcon: ComponentType<SVGProps<SVGSVGElement>> = props => (
	<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.66-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
	</svg>
)

const meta: Meta<typeof PageTitle> = {
	title: "Components/Layout/PageTitle",
	component: PageTitle,
	parameters: {
		layout: "padded",
	},
	argTypes: {
		title: {
			control: "text",
			description: "The main title text",
		},
		section: {
			control: "text",
			description: "Optional section label",
		},
		description: {
			control: "text",
			description: "Optional description text",
		},
		center: {
			control: "boolean",
			description: "Center align the content",
		},
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
		Icon: {
			control: false,
			description: "Optional icon component",
		},
	},
}

export default meta
type Story = StoryObj<typeof PageTitle>

export const Default: Story = {
	args: {
		title: "Page Title",
	},
}

export const WithSection: Story = {
	args: {
		section: "Documentation",
		title: "Component Library",
	},
}

export const WithDescription: Story = {
	args: {
		title: "Getting Started",
		description: "Learn how to use our component library in your React applications",
	},
}

export const WithIcon: Story = {
	args: {
		title: "Settings",
		Icon: SettingsIcon,
	},
}

export const Complete: Story = {
	args: {
		section: "Features",
		title: "Component Library",
		description: "A comprehensive set of React components built with TypeScript and modern best practices",
		Icon: BookIcon,
	},
}

export const Centered: Story = {
	args: {
		section: "Welcome",
		title: "Design System",
		description: "Modern components for building exceptional user interfaces",
		Icon: BookIcon,
		center: true,
	},
}

export const LongContent: Story = {
	args: {
		section: "Documentation",
		title: "Advanced Component Integration Patterns",
		description:
			"This is a longer description that demonstrates how the PageTitle component handles extended content. It should wrap naturally and maintain proper spacing and hierarchy.",
		Icon: SettingsIcon,
	},
}
