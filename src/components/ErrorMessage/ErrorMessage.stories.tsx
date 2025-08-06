import type { Meta, StoryObj } from "@storybook/react"
import ErrorMessage from "./"

const meta: Meta<typeof ErrorMessage> = {
	title: "Components/Feedback/ErrorMessage",
	component: ErrorMessage,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
		label: {
			control: "text",
			description: "Error label to display",
		},
		message: {
			control: "text",
			description: "Simple error message",
		},
		error: {
			control: "object",
			description: "Error response object with nested data structure",
		},
		icon: {
			control: false,
			description: "Icon element to display",
		},
	},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		error: {
			response: {
				data: {
					detail: "Multiple validation failures detected",
					title: "Validation Error",
					errors: {
						username: ["Username already exists"],
						phone: ["Invalid phone number format"],
					},
				},
			},
		},
		label: "User Creation",
		icon: <span style={{ color: "red", fontSize: "20px" }}>❌</span>,
	},
}

export const WithLabel: Story = {
	args: {
		message: "Invalid form data was submitted resulting in a API error. PLease review the form information.",
		label: "Something went wrong",
	},
}

export const WithIcon: Story = {
	args: {
		message: "Invalid form data was submitted resulting in a API error. PLease review the form information.",
		icon: <span style={{ color: "red", marginRight: "8px" }}>⚠️</span>,
	},
}

export const WithCustomClassName: Story = {
	args: {
		message: "Invalid form data was submitted resulting in a API error. PLease review the form information.",
		className: "custom-error-style",
	},
}

export const WithSimpleErrorObject: Story = {
	args: {
		error: {
			message: "Network timeout occurred",
		},
	},
}

export const WithDetailedErrorResponse: Story = {
	args: {
		error: {
			response: {
				data: {
					detail: "The request could not be processed due to validation errors",
					title: "Bad Request",
				},
			},
		},
	},
}

export const WithFieldValidationErrors: Story = {
	args: {
		error: {
			response: {
				data: {
					errors: {
						email: ["Email is required", "Email format is invalid"],
						password: ["Password must be at least 8 characters"],
						confirmPassword: ["Passwords do not match"],
					},
				},
			},
		},
		label: "Registration Form",
	},
}

export const WithComplexErrorStructure: Story = {
	args: {
		error: {
			response: {
				data: {
					detail: "Multiple validation failures detected",
					title: "Validation Error",
					errors: {
						username: ["Username already exists"],
						phone: ["Invalid phone number format"],
					},
				},
			},
		},
		label: "User Creation",
		icon: <span style={{ color: "red", fontSize: "20px" }}>❌</span>,
	},
}

export const MessagePriority: Story = {
	args: {
		message: "Custom message takes priority",
		error: {
			message: "This error message is ignored",
			response: {
				data: {
					detail: "This detail is also ignored",
				},
			},
		},
	},
}

export const Empty: Story = {
	args: {},
}
