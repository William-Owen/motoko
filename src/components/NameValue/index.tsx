// src/components/NameValue/index.tsx
import { cn } from "../../utils"
import style from "./NameValue.module.css"

interface INameValueProps {
	name?: string
	value?: string | number | boolean | Date | string[] | object
	direction?: "row" | "column"
	noColon?: boolean
	className?: string
}

// src/components/PrimaryNavigation/index.tsx
const NameValue = ({ name, value, direction = "row", noColon, className }: INameValueProps) => {
	let displayValue: string

	// Handle boolean values with capitalized True/False
	if (typeof value === "boolean") {
		displayValue = value ? "True" : "False"
	}
	// Force JSON stringification if requested
	else if (typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date)) {
		displayValue = JSON.stringify(value)
	}
	// Handle arrays by joining with commas
	else if (Array.isArray(value)) {
		displayValue = value.join(", ")
	}
	// Handle Date objects with valid timestamps
	else if (value instanceof Date && !Number.isNaN(value.getTime())) {
		displayValue = value.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		})
	}
	// Handle date strings that can be parsed
	else if (typeof value === "string" && !Number.isNaN(Date.parse(value))) {
		displayValue = new Date(value).toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		})
	}
	// Fallback to string conversion for all other types
	else {
		displayValue = String(value)
	}

	return (
		<div style={{ flexDirection: direction }} className={style.NameValue}>
			{/* Render name label with optional colon */}
			{name && (
				<div className={cn(style.name, className)}>
					{name}
					{noColon ? "" : ":"}
				</div>
			)}
			{/* Render formatted value */}
			{displayValue && <div className={style.value}>{displayValue}</div>}
		</div>
	)
}

export default NameValue
