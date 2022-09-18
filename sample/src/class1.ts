export class Class1 {
  /**
   * description of method1
   */
  method1() {}

  /**
   * description of method2
   * @param x paramter of x
   * @returns add 1 to x
   */
  method2(x: number) {
    return x + 1;
  }

  /**
   * test method 3
   * @param x parameter x
   * @param extra parater extra, is optional
   * @returns toString of method
   */
  method3(x: string, extra?: number) {
    return `${x} -> ${extra}`;
  }

  /**
   * locate a position
   * @param position to locate
   * @returns locate to position and show it
   */
  method4(position: { x: number; y: number }) {
    const { x, y } = position;
    return `Position is (${x}, ${y})`;
  }
}
