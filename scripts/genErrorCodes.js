const fs = require('fs');
const csv = fs.readFileSync('./errorCodes.csv', 'utf-8');
const lines = csv.trim().split('\n').slice(1); // skip header
const out = {};
for (const line of lines) {
  const [code, message] = line.split(',');
  out[code] = message;
}

const content = `// Auto-generated from errorCodes.csv\nexport const ERROR_MESSAGES = ${JSON.stringify(out, null, 2)} as const;\nexport type ErrorCode = keyof typeof ERROR_MESSAGES;\n`;

fs.writeFileSync('./src/errorCodes.ts', content); 