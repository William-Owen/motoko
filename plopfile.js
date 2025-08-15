export default function (plop) {
	plop.setGenerator('component', {
		description: 'Create a new React component',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Component name (PascalCase):',
				validate: (input) => {
					if (!input) return 'Component name is required'
					if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
						return 'Component name must be PascalCase (e.g., MyComponent)'
					}
					return true
				}
			},
			{
				type: 'input',
				name: 'description',
				message: 'Component description:',
				default: (answers) => `${answers.name} component`
			},
			{
				type: 'confirm',
				name: 'hasForwardRef',
				message: 'Should this component use forwardRef?',
				default: true
			},
			{
				type: 'input',
				name: 'elementType',
				message: 'Base HTML element:',
				default: 'div',
				when: (answers) => answers.hasForwardRef
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
				templateFile: 'plop-templates/component.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
				templateFile: 'plop-templates/component.module.css.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
				templateFile: 'plop-templates/component.test.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
				templateFile: 'plop-templates/component.stories.tsx.hbs'
			},
			{
				type: 'add',
				path: 'src/components/{{pascalCase name}}/index.tsx',
				templateFile: 'plop-templates/index.tsx.hbs'
			},
			{
				type: 'modify',
				path: 'src/index.ts',
				pattern: /^/,
				template: 'export { {{pascalCase name}} } from "./components/{{pascalCase name}}"\nexport type { {{pascalCase name}}Props } from "./components/{{pascalCase name}}"\n'
			}
		]
	})

	plop.setGenerator('util', {
		description: 'Create a new utility function',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Utility name (camelCase):',
				validate: (input) => {
					if (!input) return 'Utility name is required'
					if (!/^[a-z][a-zA-Z0-9]*$/.test(input)) {
						return 'Utility name must be camelCase (e.g., myUtility)'
					}
					return true
				}
			},
			{
				type: 'input',
				name: 'description',
				message: 'Utility description:',
				default: (answers) => `${answers.name} utility function`
			}
		],
		actions: [
			{
				type: 'add',
				path: 'src/utils/{{camelCase name}}/index.ts',
				templateFile: 'plop-templates/util.ts.hbs'
			},
			{
				type: 'add',
				path: 'src/utils/{{camelCase name}}/{{camelCase name}}.test.ts',
				templateFile: 'plop-templates/util.test.ts.hbs'
			},
			{
				type: 'add',
				path: 'src/utils/{{camelCase name}}/{{camelCase name}}.mdx',
				templateFile: 'plop-templates/util.mdx.hbs'
			},
			{
				type: 'modify',
				path: 'src/utils/index.ts',
				pattern: /^/,
				template: 'export { {{camelCase name}} } from "./{{camelCase name}}"\n'
			}
		]
	})
}
