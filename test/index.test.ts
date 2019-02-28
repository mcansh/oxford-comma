/* eslint-env jest */
import oxfordComma from '../source';

describe('oxfordComma', () => {
	it('throws an error if invalid args', () => {
		const error = 'oxfordComma expected an array';
		// @ts-ignore
		expect(() => oxfordComma()).toThrowError(error);
		// @ts-ignore
		expect(() => oxfordComma(1)).toThrowError(error);
		// @ts-ignore
		expect(() => oxfordComma('hello')).toThrowError(error);
	});

	it('returns a single item without altering it', () => {
		expect(oxfordComma(['1'])).toEqual('1');
	});

	it('works with conjunction', () => {
		expect(oxfordComma(['1', '2'])).toEqual('1 and 2');
		expect(oxfordComma(['Motorcycle', 'Bus', 'Car'])).toEqual(
			'Motorcycle, Bus, and Car'
		);
		expect(oxfordComma(['1', '2'], { style: 'short' })).toEqual('1 and 2');
		expect(
			oxfordComma(['Motorcycle', 'Bus', 'Car'], { style: 'short' })
		).toEqual('Motorcycle, Bus, and Car');
	});

	it('works with disjunction', () => {
		expect(oxfordComma(['1', '2'], { type: 'disjunction' })).toEqual('1 or 2');
		expect(
			oxfordComma(['Motorcycle', 'Bus', 'Car'], { type: 'disjunction' })
		).toEqual('Motorcycle, Bus, or Car');
		expect(
			oxfordComma(['1', '2'], { type: 'disjunction', style: 'short' })
		).toEqual('1 or 2');
		expect(
			oxfordComma(['Motorcycle', 'Bus', 'Car'], {
				type: 'disjunction',
				style: 'short',
			})
		).toEqual('Motorcycle, Bus, or Car');
	});

	it('works with style: `narrow` AND type: `unit`', () => {
		expect(oxfordComma(['1', '2'], { style: 'narrow', type: 'unit' })).toEqual(
			'1 2'
		);
		expect(
			oxfordComma(['Motorcycle', 'Bus', 'Car'], {
				style: 'narrow',
				type: 'unit',
			})
		).toEqual('Motorcycle Bus Car');
	});

	it('works with unit', () => {
		expect(oxfordComma(['1', '2'], { type: 'unit' })).toEqual('1, 2');
		expect(oxfordComma(['Motorcycle', 'Bus', 'Car'], { type: 'unit' })).toEqual(
			'Motorcycle, Bus, Car'
		);
	});

	it('throws an error when "narrow" is mixed with a type other than "unit"', () => {
		const error =
			"When style is 'narrow', 'unit' is the only allowed value for the type option.";
		expect(() => oxfordComma(['1', '2'], { style: 'narrow' })).toThrowError(
			error
		);
		expect(() =>
			oxfordComma(['Motorcycle', 'Bus', 'Car'], { style: 'narrow' })
		).toThrowError(error);
	});
});
