import { WarningCircleIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"
import cn from "../../utils/cn"
import styleObject, { type TThemeObject } from "../../utils/styleObject"
import style from "./NoData.module.css"

interface IThemeProps extends TThemeObject {
	padding: string
	spacingGap: string
	iconFillColor: string
	iconSize: string
	direction: "row" | "column"
}

interface NoDataProps {
	className?: string
	message?: string
	icon?: ReactNode
	theme?: Partial<IThemeProps>
}

const NoData = ({ className, message, icon = <WarningCircleIcon />, theme }: NoDataProps) => {
	const rootClassName = cn(style.NoData, className)
	const displayMessage = message ?? "No results."

	const defaultTheme: IThemeProps = {
		padding: "1rem",
		spacingGap: ".5rem",
		iconFillColor: "orange",
		iconSize: "1.5rem",
		direction: "row",
		...theme,
	}

	return (
		<div style={styleObject.build(defaultTheme, "NoData")} data-testid="NoData" className={rootClassName}>
			<div className={style.icon}>{icon}</div>
			<div className={style.message}>{displayMessage}</div>
		</div>
	)
}

export default NoData
