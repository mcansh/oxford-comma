interface ListFormatOptions {
	type?: 'conjunction' | 'disjunction' | 'unit';
	style?: 'long' | 'short' | 'narrow';
	conjunctionText?: string;
	disjunctionText?: string;
}

function oxfordComma(
	array: string[],
	options: ListFormatOptions = { style: 'long', type: 'conjunction' }
) {
	if (!Array.isArray(array)) {
		throw new TypeError('oxfordComma expected an array');
	}

	const {
		style = 'long',
		type = 'conjunction',
		conjunctionText = 'and',
		disjunctionText = 'or',
	} = options;

	if (style === 'narrow' && type !== 'unit') {
		throw new TypeError(
			`When style is 'narrow', 'unit' is the only allowed value for the type option.`
		);
	}

	const joiners = {
		conjunction: conjunctionText,
		disjunction: disjunctionText,
		unit: '',
	};

	const joiner = joiners[type];

	if (type === 'unit') {
		if (style === 'narrow') {
			return array.join(' ');
		}
		return array.join(', ');
	}

	return (
		array.slice(0, -2).join(', ') +
		(array.slice(0, -2).length ? ', ' : '') +
		array.slice(-2).join(array.length === 2 ? ` ${joiner} ` : `, ${joiner} `)
	);
}

export { ListFormatOptions };
export default oxfordComma;
