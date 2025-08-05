import type { CSSProperties, FC } from "react"
import cn from "../../utils/cn"
import styles from "./LoadingIndicator.module.css"

interface LoadingIndicatorProps {
	/** Additional CSS class name */
	className?: string
	/** Icon size in rem, defaults 2rem */
	size?: number
	/** Accessible label for screen readers */
	"aria-label"?: string
}

/**
 * Animated loading spinner component
 *
 * @param className - Additional CSS class name
 * @param size - Icon size in rem (default: 2)
 * @param aria-label - Accessible label for screen readers (default: "Loading...")
 */
const LoadingIndicator: FC<LoadingIndicatorProps> = ({
	className,
	size = 2,
	"aria-label": ariaLabel = "Loading...",
}) => (
	<output
		data-testid="LoadingIndicator"
		className={cn(styles.LoadingIndicator, className)}
		style={{ "--comp-icon-size": `${size}rem` } as CSSProperties}
		aria-label={ariaLabel}
	>
		<svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" />
			<path d="M12,1A11,11,0,0,0,1,12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
				<animateTransform
					attributeName="transform"
					type="rotate"
					dur="0.75s"
					values="0 12 12;360 12 12"
					repeatCount="indefinite"
				/>
			</path>
		</svg>
	</output>
)

export default LoadingIndicator
