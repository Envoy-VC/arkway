interface Props {
	className?: string;
	size?: number | string;
	color?: string;
}

const VerticalDots = ({ className, size, color }: Props) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size || '24'}
			height={size || '24'}
			viewBox='0 0 24 24'
		>
			<path
				d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z'
				fill={color || 'currentColor'}
			></path>
		</svg>
	);
};

export default VerticalDots;
