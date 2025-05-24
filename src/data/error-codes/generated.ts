// Auto-generated from errorCodes.csv

export type SeverityLevel = 'INFO' | 'WARN' | 'ERROR' | 'FATAL';

const ERROR_CODES = {
  AUTH_100: {
    code: 'AUTH-100',
    message: 'Invalid credentials',
    severity: 'ERROR'
  },
  DB_200: {
    code: 'DB-200',
    message: 'Database connection failed',
    severity: 'FATAL'
  },
  API_300: {
    code: 'API-300',
    message: 'API limit exceeded',
    severity: 'WARN'
  },
  AUTH_101: {
    code: 'AUTH-101',
    message: 'Invalid token',
    severity: 'ERROR'
  },
  AUTH_102: {
    code: 'AUTH-102',
    message: 'Token expired',
    severity: 'ERROR'
  }
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]['code'];
export const ERROR_MESSAGES = Object.fromEntries(
  Object.values(ERROR_CODES).map(info => [info.code, info.message])
) as Record<ErrorCode, string>;

export const ERROR_SEVERITIES = Object.fromEntries(
  Object.values(ERROR_CODES).map(info => [info.code, info.severity])
) as Record<ErrorCode, SeverityLevel>;

/** Invalid credentials (ERROR) */
export const AUTH_100 = ERROR_CODES.AUTH_100.code;
/** Database connection failed (FATAL) */
export const DB_200 = ERROR_CODES.DB_200.code;
/** API limit exceeded (WARN) */
export const API_300 = ERROR_CODES.API_300.code;
/** Invalid token (ERROR) */
export const AUTH_101 = ERROR_CODES.AUTH_101.code;
/** Token expired (ERROR) */
export const AUTH_102 = ERROR_CODES.AUTH_102.code;
