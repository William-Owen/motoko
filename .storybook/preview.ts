import type { Preview } from "@storybook/react-vite"
import { themes } from "storybook/theming"

import "@fontsource/roboto/100.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "./preview.css"

const preview: Preview = {
	parameters: {
		layout: "centered", // or 'fullscreen' or 'padded'
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			autodocs: "tag",
			theme: themes.dark,
		},
	},
	tags: ["autodocs"],
}

export default preview
