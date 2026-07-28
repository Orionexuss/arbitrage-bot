export function formatTokenAmount(
  rawAmount: bigint | number | string,
  decimals: number,
  fractionDigits = 2
): string {
  return (
    Number(rawAmount) / 10 ** decimals
  ).toFixed(fractionDigits);
}
