import { describe, expect, it } from 'vitest';
import { getQuoteSelection } from './quote-selection';

describe('quote selection', () => {
  it('preserves Original, weight and employee count when continuing to contact', () => {
    expect(getQuoteSelection(new URLSearchParams('korg=original&storlek=6kg&anstallda=12')))
      .toEqual({ basketType: 'Original', basketSize: '6kg', employeeCount: 12 });
  });
  it('does not invent a selection for a general contact request', () => {
    expect(getQuoteSelection(new URLSearchParams()))
      .toEqual({ basketType: undefined, basketSize: undefined, employeeCount: undefined });
  });
});