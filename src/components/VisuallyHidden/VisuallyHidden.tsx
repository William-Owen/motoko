// src/components/VisuallyHidden/VisuallyHidden.tsx

import type { ReactNode } from "react"
import cn from "../../utils/cn"
import style from "./VisuallyHidden.module.css"

interface VisuallyHiddenProps {
	showOnFocus?: boolean
	children: ReactNode
}

const VisuallyHidden = ({ showOnFocus = false, children }: VisuallyHiddenProps) => {
	const classNames = cn(!showOnFocus && style.VisuallyHidden, showOnFocus && style.VisuallyHiddenShowOnFocus)

	return (
		<div data-testid="VisuallyHidden" className={classNames}>
			{children}
		</div>
	)
}

export default VisuallyHidden
