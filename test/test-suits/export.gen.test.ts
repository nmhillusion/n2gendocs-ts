import * as fs from "fs";
import * as path from "path";
import { util } from "@nmhillusion/n2mix";
import { DocsGenerator } from "@root/generators/generator";

test("test export docs generator", () => {
  const docsOutput = new DocsGenerator(
    path.join(__dirname, "../sample_input/export1.ts")
  ).generate();

  const expectedOutput = fs
    .readFileSync(path.join(__dirname, "../sample_output/export1.md"))
    .toString();

  console.log({
    docsOutput,
    expectedOutput,
  });

  expect(util.text.stringToNormalLines(docsOutput)).toEqual(
    util.text.stringToNormalLines(expectedOutput)
  );
});
