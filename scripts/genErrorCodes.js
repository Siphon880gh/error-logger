const fs = require('fs');
const csv = fs.readFileSync('./errorCodes.csv', 'utf-8');
const lines = csv.trim().split('\n').slice(1); // skip header
const out = {};
for (const line of lines) {
  const [code, message] = line.split(',');
  out[code] = message;
}

// Create the error codes object with JSDoc comments
const errorCodesEntries = Object.entries(out).map(([code, message]) => {
  const constName = code.replace('-', '_');
  return `  ${constName}: {
    code: '${code}',
    message: '${message}'
  }`;
}).join(',\n');

const constants = Object.entries(out).map(([code, message]) => {
  const constName = code.replace('-', '_');
  return `/** ${message} */
export const ${constName} = ERROR_CODES.${constName}.code;`;
}).join('\n');

const content = `// Auto-generated from errorCodes.csv

const ERROR_CODES = {
${errorCodesEntries}
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]['code'];
export const ERROR_MESSAGES = Object.fromEntries(
  Object.values(ERROR_CODES).map(info => [info.code, info.message])
) as Record<ErrorCode, string>;

${constants}
`;

fs.writeFileSync('./src/errorCodes.ts', content); 