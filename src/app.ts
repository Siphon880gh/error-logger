import { ERROR_MESSAGES, ERROR_SEVERITIES, ErrorCode, SeverityLevel, AUTH_100, AUTH_102, AUTH_101, API_300, DB_200 } from './data/error-codes/generated';

function logWithSeverity(code: ErrorCode, severity: SeverityLevel, err?: unknown) {
  const message = ERROR_MESSAGES[code];
  const codeSeverity = ERROR_SEVERITIES[code];
  
  if (codeSeverity !== severity) {
    console.warn(`Warning: Logging ${code} with severity ${severity} but it's defined as ${codeSeverity}`);
  }

  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${code}] [${severity}] ${message}`;

  switch (severity) {
    case 'INFO':
      console.info(logMessage);
      break;
    case 'WARN':
      console.warn(logMessage);
      break;
    case 'ERROR':
      console.error(logMessage);
      break;
    case 'FATAL':
      console.error(`FATAL: ${logMessage}`);
      // In a real application, you might want to:
      // 1. Send to error monitoring service
      // 2. Trigger alerts
      // 3. Exit the process
      process.exit(1);
      break;
  }

  if (err instanceof Error) {
    console.error('Original error:', err.message);
  }
}

// Convenience functions for each severity level
export function logInfo(code: ErrorCode, data?: unknown) {
  logWithSeverity(code, 'INFO', data);
}

export function logWarn(code: ErrorCode, data?: unknown) {
  logWithSeverity(code, 'WARN', data);
}

export function logError(code: ErrorCode, err?: unknown) {
  logWithSeverity(code, 'ERROR', err);
}

export function logFatal(code: ErrorCode, err?: unknown) {
  logWithSeverity(code, 'FATAL', err);
}

/**
 * Automatically logs using the severity level defined for the error code.
 * This is the recommended way to log errors as it ensures consistency
 * with the defined severity levels.
 */
export function logAppropriate(code: ErrorCode, data?: unknown) {
  const severity = ERROR_SEVERITIES[code];
  logWithSeverity(code, severity, data);
}

function test() {
  try {
    throw new Error('Simulated failure');
  } catch (err) {
    // Using logAppropriate - automatically uses the correct severity level
    logAppropriate(API_300, { limit: 100 });  // Will use WARN level
    logAppropriate(AUTH_102, err);            // Will use ERROR level
    logAppropriate(DB_200, err);              // Will use FATAL level

    // You can still use specific severity levels if needed
    logInfo(API_300, { limit: 100 });     // Forces INFO level
    logWarn(API_300, { limit: 90 });      // Forces WARN level
    logError(AUTH_102, err);              // Forces ERROR level
    // logFatal(DB_200, err);             // Forces FATAL level
  }
}

test(); 