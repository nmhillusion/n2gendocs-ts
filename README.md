# n2gendocs-ts

> Tool to generate docs from typescript file

---
## Usage:
```typescript

import { DocsGenerator } from "@nmhillusion/n2gendocs-ts/generators/generator";
import * as path from "path";

const docsOutput: string = new DocsGenerator(
  path.join(__dirname, `../sample_input/class1.ts`)
).generate();

```

## Support Types:
- Class
- Function
- Interface / Type
- Export statement

## Example input

```typescript

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

```

## Example output

```markdown

# Class: `Class1`
    

## Properties

`None`

<br/>
<br/>

## Methods

### Function: `method1()`

    description of method1

#### Parameter List:



#### Return Type: `Not defined` 

<br/>
<br/>

### Function: `method2(x: number)`

    description of method2

#### Parameter List:

- **x**: `number` -- paramter of x


#### Return Type: `Not defined` --- add 1 to x

<br/>
<br/>

### Function: `method3(x: string, extra?: number)`

    test method 3

#### Parameter List:

- **x**: `string` -- parameter x

- **extra**: `number` _(optional)_ -- parater extra, is optional


#### Return Type: `Not defined` --- toString of method

<br/>
<br/>

### Function: `method4(position: { x: number; y: number })`

    locate a position

#### Parameter List:

- **position**: `{ x: number; y: number }` -- to locate


#### Return Type: `Not defined` --- locate to position and show it

```