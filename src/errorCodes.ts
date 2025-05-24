// Auto-generated from errorCodes.csv
export const ERROR_MESSAGES = {
  "AUTH-100": "Invalid credentials",
  "DB-200": "Database connection failed",
  "API-300": "API limit exceeded"
} as const;
export type ErrorCode = keyof typeof ERROR_MESSAGES;
