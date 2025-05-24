const fs = require('fs');
const csv = fs.readFileSync('./src/data/error-codes/input.csv', 'utf-8');
const lines = csv.trim().split('\n').slice(1); // skip header
const out = {};

// Define valid severity levels
const SEVERITY_LEVELS = ['INFO', 'WARN', 'ERROR', 'FATAL'];

for (const line of lines) {
  const [code, message, severity] = line.split(',');
  if (!SEVERITY_LEVELS.includes(severity)) {
    throw new Error(`Invalid severity level "${severity}" for code ${code}`);
  }
  out[code] = { message, severity };
}

// Create the error codes object with JSDoc comments
const errorCodesEntries = Object.entries(out).map(([code, { message, severity }]) => {
  const constName = code.replace('-', '_');
  return `  ${constName}: {
    code: '${code}',
    message: '${message}',
    severity: '${severity}'
  }`;
}).join(',\n');

const constants = Object.entries(out).map(([code, { message, severity }]) => {
  const constName = code.replace('-', '_');
  return `/** ${message} (${severity}) */
export const ${constName} = ERROR_CODES.${constName}.code;`;
}).join('\n');

const content = `// Auto-generated from errorCodes.csv

export type SeverityLevel = 'INFO' | 'WARN' | 'ERROR' | 'FATAL';

const ERROR_CODES = {
${errorCodesEntries}
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]['code'];
export const ERROR_MESSAGES = Object.fromEntries(
  Object.values(ERROR_CODES).map(info => [info.code, info.message])
) as Record<ErrorCode, string>;

export const ERROR_SEVERITIES = Object.fromEntries(
  Object.values(ERROR_CODES).map(info => [info.code, info.severity])
) as Record<ErrorCode, SeverityLevel>;

${constants}
`;

fs.writeFileSync('./src/data/error-codes/generated.ts', content); 