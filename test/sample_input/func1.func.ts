/**
 * adder for number to adding from a constant number
 * @param init initial for adder
 * @returns adder after init with a number
 */
export function adder(init: number): (x: number) => number {
  return (extra: number) => init + extra;
}

/**
 * multilier for number to multiply from a constant number
 * @param init initial for multilier
 * @returns multilier after init with a number
 */
export function multilier(init: number): (x: number) => number {
  return (extra: number) => init * extra;
}
