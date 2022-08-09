export function resolveVariableTemplate(
  template: string,
  varName: string,
  varValue: string
) {
  const VAR_PATTERN = new RegExp(
    `{{\\s*var\\s*\\(\\s*${varName}\\s*\\)\\s*}}`,
    "g"
  );

  return template.replace(VAR_PATTERN, varValue);
}

export function resolveVariablesTemplate(
  template: string,
  variablesToInject: { varName: string; varValue: string }[]
) {
  let converted = template;

  if (variablesToInject) {
    for (const varInj of variablesToInject) {
      converted = resolveVariableTemplate(
        converted,
        varInj.varName,
        varInj.varValue
      );
    }
  }

  return converted;
}
