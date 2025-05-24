// Auto-generated from errorCodes.csv

const ERROR_CODES = {
  AUTH_100: {
    code: 'AUTH-100',
    message: 'Invalid credentials'
  },
  DB_200: {
    code: 'DB-200',
    message: 'Database connection failed'
  },
  API_300: {
    code: 'API-300',
    message: 'API limit exceeded '
  },
  AUTH_101: {
    code: 'AUTH-101',
    message: 'Invalid token'
  },
  AUTH_102: {
    code: 'AUTH-102',
    message: 'Token expired'
  }
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES]['code'];
export const ERROR_MESSAGES = Object.fromEntries(
  Object.values(ERROR_CODES).map(info => [info.code, info.message])
) as Record<ErrorCode, string>;

/** Invalid credentials */
export const AUTH_100 = ERROR_CODES.AUTH_100.code;
/** Database connection failed */
export const DB_200 = ERROR_CODES.DB_200.code;
/** API limit exceeded  */
export const API_300 = ERROR_CODES.API_300.code;
/** Invalid token */
export const AUTH_101 = ERROR_CODES.AUTH_101.code;
/** Token expired */
export const AUTH_102 = ERROR_CODES.AUTH_102.code;
