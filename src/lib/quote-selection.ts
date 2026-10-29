export function getQuoteSelection(params: URLSearchParams) {
  const baskets: Record<string, string> = {
    original: 'Original', premium: 'Premium', banan: 'Banan',
  };
  const basketType = baskets[params.get('korg')?.toLowerCase() ?? ''];
  const size = params.get('storlek');
  const basketSize = size && ['4kg', '6kg', '9kg', '11kg'].includes(size) ? size : undefined;
  const count = Number(params.get('anstallda'));
  const employeeCount = Number.isSafeInteger(count) && count > 0 ? count : undefined;
  return { basketType, basketSize, employeeCount };
}