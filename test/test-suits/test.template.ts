import { util } from "@nmhillusion/n2mix";
import { DocsGenerator } from "@root/generators/generator";
import * as path from "path";
import * as fs from "fs";

export function fromTestTemplate(fileNameToTest: string) {
  makeSureExistTestOutputFolder();

  return (testName: string) =>
    test(testName, () => {
      const docsOutput = new DocsGenerator(
        path.join(__dirname, `../sample_input/${fileNameToTest}.ts`)
      ).generate();

      const expectedOutput = fs
        .readFileSync(
          path.join(__dirname, `../sample_output/${fileNameToTest}.md`)
        )
        .toString();

      fs.writeFileSync(
        path.join(__dirname, `../test_output/${fileNameToTest}.md`),
        docsOutput
      );

      expect(util.text.stringToNormalLines(docsOutput)).toEqual(
        util.text.stringToNormalLines(expectedOutput)
      );
    });
}

function makeSureExistTestOutputFolder() {
  const testOutputPath = path.join(__dirname, `../test_output`);
  if (!fs.existsSync(testOutputPath)) {
    fs.mkdirSync(testOutputPath, {
      recursive: true,
    });
  }
}
