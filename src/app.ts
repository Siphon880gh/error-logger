import { ERROR_MESSAGES, ErrorCode, AUTH_100, AUTH_102, AUTH_101 } from './data/error-codes/generated';

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
    logError(AUTH_102, err); // <-- Hover over AUTH_100 shows: Invalid credentials
  }
}

test(); 