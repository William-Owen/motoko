import type { ComponentType, SVGProps } from "react"
import cn from "../../utils/cn"
import styleObject, { type TThemeObject } from "../../utils/styleObject"
import styles from "./PageTitle.module.css"

interface IThemeProps extends TThemeObject {
	accentColor: string
	iconSize: string
	spacing: string
	margin: string
}

/**
 * PageTitle component props interface
 */
interface PageTitleProps {
	/** Additional CSS class name to apply */
	className?: string
	/** Optional section label displayed above the title */
	section?: string
	/** Main title text (required) */
	title: string
	/** Optional description text displayed below the title */
	description?: string
	/** Whether to center-align the content */
	center?: boolean
	/** Optional SVG icon component to display alongside the title */
	Icon?: ComponentType<SVGProps<SVGSVGElement>>
	/** The component theme overrides  */
	theme?: Partial<IThemeProps>
}

/**
 * PageTitle component for displaying page headers with optional section, icon, and description
 *
 * Renders a structured page title with optional section label, icon, main title,
 * and description. Supports center alignment and custom styling.
 *
 * @param props - The component props
 * @param props.className - Additional CSS class name to apply
 * @param props.section - Optional section label displayed above the title
 * @param props.title - Main title text (required)
 * @param props.description - Optional description text displayed below the title
 * @param props.center - Whether to center-align the content
 * @param props.Icon - Optional SVG icon component to display alongside the title
 * @returns JSX element representing the page title header
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PageTitle title="Dashboard" />
 *
 * // With section and description
 * <PageTitle
 *   section="Analytics"
 *   title="User Metrics"
 *   description="View detailed user engagement statistics"
 * />
 *
 * // With icon and center alignment
 * <PageTitle
 *   title="Settings"
 *   Icon={SettingsIcon}
 *   center
 * />
 * ```
 */
const PageTitle = ({ className, section, title, description, Icon, center }: PageTitleProps) => {
	const rootClassName = cn(styles.PageTitle, className, center && styles.center)

	const defaultTheme: IThemeProps = {
		accentColor: "red",
		iconSize: "4rem",
		margin: "3rem 0",
		spacing: "2rem",
	}

	return (
		<div style={styleObject.build(defaultTheme, "PageTitle")} data-testid="PageTitle" className={rootClassName}>
			{Icon && (
				<div className={styles.icon}>
					<Icon />
				</div>
			)}
			<div>
				<h1>
					<span>{section}</span>
					{title}
				</h1>
				{description && <p>{description}</p>}
			</div>
		</div>
	)
}

export default PageTitle
