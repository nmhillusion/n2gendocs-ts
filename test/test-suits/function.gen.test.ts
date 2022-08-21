import * as fs from "fs";
import * as path from "path";
import { DocsGenerator } from "@root/generators/generator";

test("test function docs generator", () => {
  const docsOutput = new DocsGenerator(
    path.join(__dirname, "../sample_input/func1.ts")
  ).generate();

  const expectedOutput = fs
    .readFileSync(path.join(__dirname, "../sample_output/func1.md"))
    .toString();

  expect(docsOutput).toBe(expectedOutput);
});
