import { describe, expect, it } from "vitest"
import formatText from "./"

describe("formatText", () => {
	describe("pluralize", () => {
		it("returns singular form when count is 1", () => {
			expect(formatText.pluralize("user", 1)).toBe("user")
			expect(formatText.pluralize("item", 1)).toBe("item")
			expect(formatText.pluralize("box", 1)).toBe("box")
		})

		it("returns plural form for count > 1", () => {
			expect(formatText.pluralize("user", 2)).toBe("users")
			expect(formatText.pluralize("item", 5)).toBe("items")
			expect(formatText.pluralize("cat", 3)).toBe("cats")
		})

		it("returns plural form for count = 0", () => {
			expect(formatText.pluralize("user", 0)).toBe("users")
			expect(formatText.pluralize("item", 0)).toBe("items")
		})

		it("handles words ending with s, sh, ch, x, z", () => {
			expect(formatText.pluralize("box", 2)).toBe("boxes")
			expect(formatText.pluralize("class", 2)).toBe("classes")
			expect(formatText.pluralize("church", 2)).toBe("churches")
			expect(formatText.pluralize("bush", 2)).toBe("bushes")
			expect(formatText.pluralize("buzz", 2)).toBe("buzzes")
		})

		it("handles words ending with consonant + y", () => {
			expect(formatText.pluralize("story", 2)).toBe("stories")
			expect(formatText.pluralize("city", 3)).toBe("cities")
			expect(formatText.pluralize("country", 5)).toBe("countries")
		})

		it("handles words ending with vowel + y", () => {
			expect(formatText.pluralize("boy", 2)).toBe("boys")
			expect(formatText.pluralize("day", 3)).toBe("days")
			expect(formatText.pluralize("key", 5)).toBe("keys")
		})

		it("handles words ending with f", () => {
			expect(formatText.pluralize("leaf", 2)).toBe("leaves")
			expect(formatText.pluralize("wolf", 3)).toBe("wolves")
		})

		it("handles words ending with fe", () => {
			expect(formatText.pluralize("knife", 2)).toBe("knives")
			expect(formatText.pluralize("life", 3)).toBe("lives")
		})

		it("handles irregular plurals", () => {
			expect(formatText.pluralize("person", 2)).toBe("people")
			expect(formatText.pluralize("child", 3)).toBe("children")
			expect(formatText.pluralize("foot", 2)).toBe("feet")
			expect(formatText.pluralize("tooth", 4)).toBe("teeth")
			expect(formatText.pluralize("mouse", 2)).toBe("mice")
			expect(formatText.pluralize("man", 3)).toBe("men")
			expect(formatText.pluralize("woman", 5)).toBe("women")
			expect(formatText.pluralize("goose", 2)).toBe("geese")
			expect(formatText.pluralize("ox", 3)).toBe("oxen")
		})

		it("uses custom plural when provided", () => {
			expect(formatText.pluralize("octopus", 3, "octopi")).toBe("octopi")
			expect(formatText.pluralize("datum", 5, "data")).toBe("data")
			expect(formatText.pluralize("person", 3, "persons")).toBe("persons")
		})

		it("ignores custom plural when count is 1", () => {
			expect(formatText.pluralize("person", 1, "people")).toBe("person")
			expect(formatText.pluralize("child", 1, "children")).toBe("child")
		})
	})

	describe("camelCase", () => {
		it("converts space-separated words", () => {
			expect(formatText.camelCase("hello world")).toBe("helloWorld")
			expect(formatText.camelCase("user name")).toBe("userName")
			expect(formatText.camelCase("my variable name")).toBe("myVariableName")
		})

		it("converts hyphenated words", () => {
			expect(formatText.camelCase("user-name")).toBe("userName")
			expect(formatText.camelCase("api-response")).toBe("apiResponse")
			expect(formatText.camelCase("my-variable-name")).toBe("myVariableName")
		})

		it("converts underscored words", () => {
			expect(formatText.camelCase("user_name")).toBe("userName")
			expect(formatText.camelCase("api_response")).toBe("apiResponse")
			expect(formatText.camelCase("my_variable_name")).toBe("myVariableName")
		})

		it("handles mixed case input", () => {
			expect(formatText.camelCase("My Title")).toBe("myTitle")
			expect(formatText.camelCase("API Response")).toBe("aPIResponse")
		})

		it("handles already camelCase input", () => {
			expect(formatText.camelCase("userName")).toBe("userName")
			expect(formatText.camelCase("myVariable")).toBe("myVariable")
		})

		it("handles single words", () => {
			expect(formatText.camelCase("hello")).toBe("hello")
			expect(formatText.camelCase("API")).toBe("aPI")
		})

		it("handles empty string", () => {
			expect(formatText.camelCase("")).toBe("")
		})

		it("returns empty string when maxLength equals suffix length", () => {
			expect(formatText.truncate("Hello", 3, "...")).toBe("")
		})

		it("handles trailing delimiters", () => {
			expect(formatText.camelCase("hello-")).toBe("hello")
			expect(formatText.camelCase("test_")).toBe("test")
			expect(formatText.camelCase("word ")).toBe("word")
		})
	})

	describe("kebabCase", () => {
		it("converts space-separated words", () => {
			expect(formatText.kebabCase("Hello World")).toBe("hello-world")
			expect(formatText.kebabCase("User Name")).toBe("user-name")
			expect(formatText.kebabCase("My Variable Name")).toBe("my-variable-name")
		})

		it("converts camelCase", () => {
			expect(formatText.kebabCase("userName")).toBe("user-name")
			expect(formatText.kebabCase("apiResponse")).toBe("api-response")
			expect(formatText.kebabCase("myVariableName")).toBe("my-variable-name")
		})

		it("converts underscored words", () => {
			expect(formatText.kebabCase("user_name")).toBe("user-name")
			expect(formatText.kebabCase("api_response")).toBe("api-response")
		})

		it("handles already kebab-case input", () => {
			expect(formatText.kebabCase("hello-world")).toBe("hello-world")
			expect(formatText.kebabCase("user-name")).toBe("user-name")
		})

		it("handles single words", () => {
			expect(formatText.kebabCase("hello")).toBe("hello")
			expect(formatText.kebabCase("API")).toBe("api")
		})

		it("handles empty string", () => {
			expect(formatText.kebabCase("")).toBe("")
		})
	})

	describe("snakeCase", () => {
		it("converts space-separated words", () => {
			expect(formatText.snakeCase("Hello World")).toBe("hello_world")
			expect(formatText.snakeCase("User Name")).toBe("user_name")
			expect(formatText.snakeCase("My Variable Name")).toBe("my_variable_name")
		})

		it("converts camelCase", () => {
			expect(formatText.snakeCase("userName")).toBe("user_name")
			expect(formatText.snakeCase("apiResponse")).toBe("api_response")
			expect(formatText.snakeCase("myVariableName")).toBe("my_variable_name")
		})

		it("converts hyphenated words", () => {
			expect(formatText.snakeCase("hello-world")).toBe("hello_world")
			expect(formatText.snakeCase("user-name")).toBe("user_name")
		})

		it("handles already snake_case input", () => {
			expect(formatText.snakeCase("hello_world")).toBe("hello_world")
			expect(formatText.snakeCase("user_name")).toBe("user_name")
		})

		it("handles single words", () => {
			expect(formatText.snakeCase("hello")).toBe("hello")
			expect(formatText.snakeCase("API")).toBe("api")
		})

		it("handles empty string", () => {
			expect(formatText.snakeCase("")).toBe("")
		})
	})

	describe("titleCase", () => {
		it("converts lowercase words", () => {
			expect(formatText.titleCase("hello world")).toBe("Hello World")
			expect(formatText.titleCase("user name")).toBe("User Name")
		})

		it("converts hyphenated words", () => {
			expect(formatText.titleCase("user-name")).toBe("User Name")
			expect(formatText.titleCase("api-response")).toBe("Api Response")
		})

		it("converts underscored words", () => {
			expect(formatText.titleCase("user_name")).toBe("User Name")
			expect(formatText.titleCase("api_response")).toBe("Api Response")
		})

		it("handles mixed case input", () => {
			expect(formatText.titleCase("API response")).toBe("Api Response")
			expect(formatText.titleCase("myVariable")).toBe("Myvariable")
		})

		it("handles single words", () => {
			expect(formatText.titleCase("hello")).toBe("Hello")
			expect(formatText.titleCase("api")).toBe("Api")
		})

		it("handles empty string", () => {
			expect(formatText.titleCase("")).toBe("")
		})
	})

	describe("truncate", () => {
		it("truncates text longer than maxLength", () => {
			expect(formatText.truncate("Long text here", 10)).toBe("Long te...")
			expect(formatText.truncate("This is a very long sentence", 15)).toBe("This is a ve...")
		})

		it("returns original text when shorter than maxLength", () => {
			expect(formatText.truncate("Short", 10)).toBe("Short")
			expect(formatText.truncate("Hello", 5)).toBe("Hello")
		})

		it("uses custom suffix when provided", () => {
			expect(formatText.truncate("Long text here", 10, "…")).toBe("Long text…")
			expect(formatText.truncate("Long text here", 10, " [more]")).toBe("Lon [more]")
		})

		it("uses empty suffix when provided", () => {
			expect(formatText.truncate("Long text here", 10, "")).toBe("Long text ")
		})

		it("handles edge cases", () => {
			expect(formatText.truncate("", 10)).toBe("")
			expect(formatText.truncate("Hello", 0)).toBe("...")
			expect(formatText.truncate("Hello", 3)).toBe("")
		})
	})

	describe("capitalize", () => {
		it("capitalizes first letter of lowercase text", () => {
			expect(formatText.capitalize("hello world")).toBe("Hello world")
			expect(formatText.capitalize("api response")).toBe("Api response")
		})

		it("handles already capitalized text", () => {
			expect(formatText.capitalize("Hello world")).toBe("Hello world")
			expect(formatText.capitalize("API")).toBe("API")
		})

		it("handles single characters", () => {
			expect(formatText.capitalize("a")).toBe("A")
			expect(formatText.capitalize("A")).toBe("A")
		})

		it("handles empty string", () => {
			expect(formatText.capitalize("")).toBe("")
		})

		it("handles all caps", () => {
			expect(formatText.capitalize("API RESPONSE")).toBe("API RESPONSE")
		})
	})

	describe("clean", () => {
		it("removes extra spaces", () => {
			expect(formatText.clean("  hello   world  ")).toBe("hello world")
			expect(formatText.clean("hello    world")).toBe("hello world")
		})

		it("handles multiple newlines", () => {
			expect(formatText.clean("line1\n\n\nline2")).toBe("line1 line2")
			expect(formatText.clean("line1\n\nline2\n\nline3")).toBe("line1 line2 line3")
		})

		it("handles mixed whitespace", () => {
			expect(formatText.clean(" \t hello \n world \t ")).toBe("hello world")
			expect(formatText.clean("hello\t\tworld")).toBe("hello world")
		})

		it("handles already clean text", () => {
			expect(formatText.clean("hello world")).toBe("hello world")
			expect(formatText.clean("clean text")).toBe("clean text")
		})

		it("handles empty string", () => {
			expect(formatText.clean("")).toBe("")
			expect(formatText.clean("   ")).toBe("")
		})
	})

	describe("initials", () => {
		it("extracts initials from full names", () => {
			expect(formatText.initials("John Doe")).toBe("JD")
			expect(formatText.initials("Jane Smith")).toBe("JS")
		})

		it("limits to maxInitials (default 2)", () => {
			expect(formatText.initials("John Michael Doe")).toBe("JM")
			expect(formatText.initials("Mary Jane Watson Smith")).toBe("MJ")
		})

		it("respects custom maxInitials", () => {
			expect(formatText.initials("John Michael Doe", 3)).toBe("JMD")
			expect(formatText.initials("Mary Jane Watson Smith", 4)).toBe("MJWS")
			expect(formatText.initials("John Michael Doe", 1)).toBe("J")
		})

		it("handles single names", () => {
			expect(formatText.initials("John")).toBe("J")
			expect(formatText.initials("Madonna")).toBe("M")
		})

		it("handles phrases", () => {
			expect(formatText.initials("API Response Handler")).toBe("AR")
			expect(formatText.initials("User Interface Design")).toBe("UI")
		})

		it("handles empty string", () => {
			expect(formatText.initials("")).toBe("")
		})

		it("handles extra spaces", () => {
			expect(formatText.initials("  John   Doe  ")).toBe("JD")
			expect(formatText.initials("John    Michael    Doe")).toBe("JM")
		})
	})

	describe("countWithWord", () => {
		it("formats singular counts", () => {
			expect(formatText.countWithWord(1, "item")).toBe("1 item")
			expect(formatText.countWithWord(1, "user")).toBe("1 user")
		})

		it("formats plural counts", () => {
			expect(formatText.countWithWord(5, "user")).toBe("5 users")
			expect(formatText.countWithWord(2, "item")).toBe("2 items")
			expect(formatText.countWithWord(10, "box")).toBe("10 boxes")
		})

		it("formats zero counts as plural", () => {
			expect(formatText.countWithWord(0, "item")).toBe("0 items")
			expect(formatText.countWithWord(0, "user")).toBe("0 users")
		})

		it("uses custom plural when provided", () => {
			expect(formatText.countWithWord(3, "child", "children")).toBe("3 children")
			expect(formatText.countWithWord(5, "person", "people")).toBe("5 people")
		})

		it("ignores custom plural for singular counts", () => {
			expect(formatText.countWithWord(1, "child", "children")).toBe("1 child")
			expect(formatText.countWithWord(1, "person", "people")).toBe("1 person")
		})

		it("handles irregular plurals", () => {
			expect(formatText.countWithWord(2, "mouse")).toBe("2 mice")
			expect(formatText.countWithWord(3, "foot")).toBe("3 feet")
		})

		it("handles large numbers", () => {
			expect(formatText.countWithWord(1000, "user")).toBe("1000 users")
			expect(formatText.countWithWord(1000000, "item")).toBe("1000000 items")
		})
	})
})
