import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: ["@storybook/addon-docs", "@storybook/addon-links"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	viteFinal: async config => {
		config.css = {
			...config.css,
			modules: {
				localsConvention: "camelCase",
				generateScopedName: "[name]__[local]___[hash:base64:5]",
			},
		}

		return config
	},
}
export default config
