import type { CSSProperties, ReactNode } from "react"
import cn from "../../utils/cn"
import type { TBoxModelSpacing } from "../../utils/cssBoxSpacing"
import cssBoxSpacing from "../../utils/cssBoxSpacing"
import styles from "./Page.module.css"

/**
 * Page component props interface
 */
interface PageProps {
	/** Child elements to render inside the page */
	children?: ReactNode
	/** Additional CSS class name to apply */
	className?: string
	/** Whether to restrict the page width - boolean for default restriction 1200px, number (of pixels) for custom width */
	restrictWidth?: boolean | number
	/** Center the page, default = true */
	center?: boolean
	/** Padding, in em; default 1 (1em) */
	padding?: TBoxModelSpacing
}

/**
 * Page layout component that provides consistent page structure
 */
const Page = ({ children, className, restrictWidth, center = true, padding = 1 }: PageProps) => {
	const pageWidth = typeof restrictWidth === "number" ? `${restrictWidth}px` : undefined
	const paddingCss = cssBoxSpacing(padding, "em")
	const rootClassName = cn(styles.Page, restrictWidth && styles.restrictWidth, center && styles.center, className)

	const style: CSSProperties & { [key: string]: string | number } = {}

	if (paddingCss) {
		style.padding = paddingCss
	}

	if (pageWidth) {
		style["--size-pageWidth"] = pageWidth
	}

	return (
		<div data-testid="Page" style={style} className={rootClassName}>
			{children}
		</div>
	)
}

export default Page
