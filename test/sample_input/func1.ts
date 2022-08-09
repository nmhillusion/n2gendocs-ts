/**
 * adder for number to adding from a constant number
 * @param init initial for adder
 * @returns adder after init with a number
 */
export function adder(init: number): (x: number) => number {
  return (extra: number) => init + extra;
}
