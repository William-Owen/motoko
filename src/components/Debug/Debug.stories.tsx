import type { Meta, StoryObj } from "@storybook/react"
import { Debug } from "./"

const meta: Meta<typeof Debug> = {
	title: "Components/Debug/Debug",
	component: Debug,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		label: {
			control: "text",
			description: "Optional label for the debug output",
		},
		value: {
			control: "object",
			description: "The value to debug and display",
		},
		className: {
			control: "text",
			description: "Additional CSS classes",
		},
	},
} satisfies Meta<typeof Debug>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		value: { name: "John Doe", age: 30, active: true },
	},
}

export const WithLabel: Story = {
	args: {
		label: "User Object",
		value: { id: 123, username: "johndoe", roles: ["admin", "user"] },
	},
}

export const StringValue: Story = {
	args: {
		label: "Simple String",
		value: "Hello, World!",
	},
}

export const NumberValue: Story = {
	args: {
		label: "Number",
		value: 42,
	},
}

export const BooleanValue: Story = {
	args: {
		label: "Boolean",
		value: true,
	},
}

export const ArrayValue: Story = {
	args: {
		label: "Array Data",
		value: ["apple", "banana", "cherry", "date"],
	},
}

export const ComplexObject: Story = {
	args: {
		label: "Complex Data Structure",
		value: {
			applicationConfiguration: {
				environment: "production",
				apiEndpoints: {
					userService: "https://api.example.com/v2/users",
					paymentService: "https://payments.example.com/v1/process",
					notificationService: "https://notifications.example.com/v3/send",
					analyticsService: "https://analytics.example.com/v1/track",
				},
				featureFlags: {
					enableNewDashboard: true,
					enableAdvancedReporting: false,
					enableRealTimeNotifications: true,
					enableBetaFeatures: false,
				},
				security: {
					jwtSecret: "super-secret-jwt-key-that-should-never-be-exposed-in-production-environments",
					sessionTimeout: 86400000,
					maxLoginAttempts: 5,
					passwordRequirements: {
						minLength: 12,
						requireUppercase: true,
						requireLowercase: true,
						requireNumbers: true,
						requireSpecialCharacters: true,
					},
				},
			},
			users: [
				{
					id: 12345,
					username: "john.doe.developer",
					email: "john.doe.developer@verylongcompanyname.example.com",
					fullName: "John Alexander Doe III",
					roles: ["admin", "developer", "project-manager", "team-lead"],
					permissions: ["read:users", "write:users", "delete:users", "manage:projects", "view:analytics"],
					metadata: {
						lastLogin: "2024-08-15T14:30:25.123Z",
						createdAt: "2023-01-15T09:22:11.456Z",
						ipAddress: "192.168.1.100",
						userAgent:
							"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
					},
				},
				{
					id: 67890,
					username: "sarah.johnson.manager",
					email: "sarah.johnson.manager@anotherveryverylongcompanyname.example.org",
					fullName: "Sarah Elizabeth Johnson-Martinez",
					roles: ["manager", "hr-representative", "budget-approver"],
					permissions: ["read:reports", "write:reports", "approve:expenses", "manage:teams", "view:salaries"],
					metadata: {
						lastLogin: "2024-08-15T16:45:33.789Z",
						createdAt: "2023-03-22T11:15:44.321Z",
						ipAddress: "10.0.0.50",
						userAgent:
							"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
					},
				},
			],
			systemMetrics: {
				performance: {
					averageResponseTime: 245.67,
					requestsPerSecond: 1250.5,
					errorRate: 0.001,
					memoryUsage: "4.2GB",
					cpuUsage: "23.5%",
				},
				database: {
					connectionPool: "50/100",
					queryExecutionTime: 12.34,
					indexEfficiency: 0.987,
					backupStatus: "completed-successfully-at-2024-08-15T02:00:00Z",
				},
			},
		},
	},
}

export const NullValue: Story = {
	args: {
		label: "Null Value",
		value: null,
	},
}

export const UndefinedValue: Story = {
	args: {
		label: "Undefined Value",
		value: undefined,
	},
}

export const EmptyObject: Story = {
	args: {
		label: "Empty Object",
		value: {},
	},
}

export const EmptyArray: Story = {
	args: {
		label: "Empty Array",
		value: [],
	},
}

export const WithCustomClassName: Story = {
	args: {
		label: "Styled Debug",
		value: { message: "Custom styling applied" },
		className: "border-2 border-dashed border-blue-300 rounded-lg bg-blue-50",
	},
}
