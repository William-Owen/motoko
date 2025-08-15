// src/components/Debug/Debug.test.tsx
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Debug } from "./Debug"

describe("Debug", () => {
	it("renders", () => {
		render(<Debug value="Test" />)
		expect(screen.getByText(/Test/)).toBeInTheDocument()
	})
})
