import { ERROR_MESSAGES, ERROR_SEVERITIES, ErrorCode, SeverityLevel, AUTH_100, AUTH_102, AUTH_101, API_300, DB_200 } from './data/error-codes/generated';
import { logger } from './services/logger';

function logWithSeverity(code: ErrorCode, severity: SeverityLevel, err?: unknown) {
  const message = ERROR_MESSAGES[code];
  const codeSeverity = ERROR_SEVERITIES[code];
  
  if (codeSeverity !== severity) {
    logger.log(code, 'WARN', `Warning: Logging ${code} with severity ${severity} but it's defined as ${codeSeverity}`);
  }

  if (err instanceof Error) {
    logger.log(code, severity, message, { error: err.message });
  } else {
    logger.log(code, severity, message, err);
  }

  if (severity === 'FATAL') {
    process.exit(1);
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