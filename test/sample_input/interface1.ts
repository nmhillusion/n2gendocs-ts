/**
 * How to define a funniable class
 */
export interface Funniable {
  /**
   * posibility to talk
   * @param message to talk
   */
  talk(message: string): void;

  /**
   * posibility to eat
   * @param food to eat
   * @param drink to drink
   */
  eat(food: string, drink: string): void;

  /**
   * posibility to sleep in `hours`
   * @param hours to sleep
   */
  sleep(hours: number): void;
}
