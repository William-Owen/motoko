/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./tests/setup.ts"],
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

		coverage: {
			reporter: ["text", "html"],
			include: ["src/**/*"],
			exclude: [
				"src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
				"src/**/*.stories.{js,jsx,ts,tsx}",
				"src/types/**/*",
				"src/**/*.d.ts",
			],
			thresholds: {
				global: {
					lines: 100,
					functions: 100,
					branches: 100,
					statements: 100,
				},
			},
		},
		css: {
			modules: {
				classNameStrategy: "stable",
			},
		},
	},
	resolve: {
		alias: {
			"@": "/src",
		},
	},
})
