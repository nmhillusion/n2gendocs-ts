import * as fs from "fs";
import path from "path";
import { DocsGenerator } from "../src/generators/generator";

const docsOutput = new DocsGenerator(
  path.join(__dirname, "./sample_input/class1.ts")
).generate();

console.log({ docsOutput });

fs.writeFileSync(path.join(__dirname, "./sample_output/class1.md"), docsOutput);
