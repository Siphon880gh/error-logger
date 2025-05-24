import { ERROR_MESSAGES, ErrorCode } from './errorCodes';

function logError(code: ErrorCode, err?: unknown) {
  const message = ERROR_MESSAGES[code];
  console.log(`[%s] %s`, code, message);
  if (err instanceof Error) {
    console.error('Original error:', err.message);
  }
}

function test() {
  try {
    throw new Error('Simulated failure');
  } catch (err) {
    logError('AUTH-100', err); // <-- Hover over 'AUTH-100' shows: Invalid credentials
  }
}

test(); 