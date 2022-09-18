import { DocsGenerator } from "@nmhillusion/n2gendocs-ts";

const generatedContent = new DocsGenerator("./src/class1.ts").generate();

console.log({ generatedContent });
