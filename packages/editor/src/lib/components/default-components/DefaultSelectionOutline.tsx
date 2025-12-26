import { toDomPrecision } from '../../primitives/utils'
import { TLSelectionOutlineProps } from '../../hooks/useEditorComponents'

/** @public */
export function DefaultSelectionOutline({ width, height, className }: TLSelectionOutlineProps) {
	return (
		<rect
			className={className}
			width={toDomPrecision(width)}
			height={toDomPrecision(height)}
		/>
	)
}
