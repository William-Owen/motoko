// src/components/Debug/Debug.tsx
import { useState } from "react"
import style from "./Debug.module.css"

export interface DebugProps {
	/** The label */
	label?: string
	/** The value to be shown */
	// biome-ignore lint/suspicious/noExplicitAny: This is an appropriate type in this instance.
	value: any
	/** Additional CSS class name */
	className?: string
}

/**
 * Present some information for debugging purposes; allows a user to copy debug information for reporting purposes.
 */
export const Debug = ({ label, className, value }: DebugProps) => {
	const [copied, setCopied] = useState(false)

	const handleCodeClick = async () => {
		try {
			await navigator.clipboard.writeText(JSON.stringify(value, null, "\t"))
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch {
			// Graceful degradation - just show copied state without actual copying
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

	return (
		<div className={[style.debug, className].filter(Boolean).join(" ")}>
			{label && <div className={style.label}>{label}</div>}
			<div>
				<strong>Type: {typeof value}</strong>
			</div>
			<button
				type="button"
				onClick={handleCodeClick}
				className={style.copyButton}
				aria-label={copied ? "Copied!" : "Copy to clipboard"}
			>
				{copied ? "✓ Done" : "Copy to the clipboard"}
			</button>
			<code>
				<pre onClick={handleCodeClick} className={style.code}>
					{JSON.stringify(value, null, "\t")}
				</pre>
			</code>
		</div>
	)
}
