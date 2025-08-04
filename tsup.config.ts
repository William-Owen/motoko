import { readFileSync } from "node:fs"
import { defineConfig } from "tsup"

export default defineConfig({
	entry: {
		index: "src/index.ts",
		utils: "src/utils/index.ts",
	},
	format: ["cjs", "esm"],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	external: ["react", "react-dom"],
	esbuildPlugins: [
		{
			name: "lightningcss",
			setup(build) {
				build.onLoad({ filter: /\.css$/ }, async args => {
					const { transform } = await import("lightningcss")
					const css = readFileSync(args.path, "utf8")
					const result = transform({
						filename: args.path,
						code: new Uint8Array(Buffer.from(css)),
						minify: true,
						targets: {
							chrome: 80,
						},
					})
					return {
						contents: result.code.toString(),
						loader: "css",
					}
				})
			},
		},
	],
})
