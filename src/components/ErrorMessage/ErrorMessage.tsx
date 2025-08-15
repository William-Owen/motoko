import { WarningIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import cn from "../../utils/cn"
import style from "./ErrorMessage.module.css"

/**
 * Represents an error response structure from API calls
 */
interface ErrorResponse {
	response?: {
		data?: {
			/** Detailed error message */
			detail?: string
			/** Error title/summary */
			title?: string
			/** Field-specific validation errors */
			errors?: Record<string, string[]>
		}
	}
	/** Generic error message */
	message?: string
}

/**
 * Props for the ErrorMessage component
 */
interface ErrorMessageProps {
	/** Additional CSS class name */
	className?: string
	/** Label/heading for the error section */
	label?: string
	/** Error object containing response data */
	error?: ErrorResponse
	/** Custom error message to display */
	message?: string
	/** Icon element to display alongside error. Default Phosphor icons WarningIcon */
	icon?: ReactNode
}

/**
 * ErrorMessage component displays error information in a structured format.
 * Handles various error response formats and displays field-specific validation errors.
 */
const ErrorMessage = ({ className, label, error, message, icon = <WarningIcon /> }: ErrorMessageProps) => {
	if (!(error || message)) return null

	const rootClassName = cn(style.ErrorMessage, className)
	const errorData = error?.response?.data
	const errors = errorData?.errors || {}
	const errorKeys = Object.keys(errors)
	const displayMessage = message || errorData?.detail?.trim() || error?.message || ""

	return (
		<div data-testid="ErrorMessage" className={rootClassName}>
			<div>
				{icon}

				{label && (
					<div>
						<h3>
							<strong>Error:</strong> {label}
						</h3>
					</div>
				)}

				<div>
					{displayMessage && <span>{displayMessage} </span>}
					{errorData?.title && <span>{errorData.title} </span>}
				</div>

				{errorKeys?.length > 0 && (
					<ul>
						{errorKeys.map(key => (
							<li key={key}>
								<strong>{key}</strong>: {errors[key].join(", ")}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}

export default ErrorMessage
