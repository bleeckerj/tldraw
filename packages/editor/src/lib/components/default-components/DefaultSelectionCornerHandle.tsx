import { toDomPrecision } from '../../primitives/utils'
import { TLSelectionCornerHandleProps } from '../../hooks/useEditorComponents'

/** @public */
export function DefaultSelectionCornerHandle({
	x,
	y,
	width,
	height,
	className,
}: TLSelectionCornerHandleProps) {
	return (
		<rect
			className={className}
			x={toDomPrecision(x)}
			y={toDomPrecision(y)}
			width={toDomPrecision(width)}
			height={toDomPrecision(height)}
		/>
	)
}
