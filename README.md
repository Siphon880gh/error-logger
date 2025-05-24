# Error Code Management System

A type-safe error code management system with VS Code IntelliSense support and severity levels.

## Features

- Centralized error code management in CSV
- Type-safe error codes in TypeScript
- VS Code IntelliSense hover tooltips
- Auto-generated TypeScript definitions
- Support for multiple severity levels (INFO, WARN, ERROR, FATAL)

## How It Works

### 1. Error Code Definition (src/data/error-codes/input.csv)
```csv
code,message,severity
AUTH-100,Invalid credentials,ERROR
DB-200,Database connection failed,FATAL
API-300,API limit exceeded,WARN
USER-400,User preferences updated,INFO
```

### 2. Auto-generated TypeScript (src/data/error-codes/generated.ts)
The generator creates TypeScript code with JSDoc comments that enable IntelliSense:

```typescript
/** Invalid credentials */
export const AUTH_100 = ERROR_CODES.AUTH_100.code;
```

### 3. IntelliSense Hover Tooltips
When you hover over an error code constant in VS Code, IntelliSense shows:
- The error message from the JSDoc comment
- The severity level
- The type information
- The constant value

Example:
```typescript
logError(AUTH_100, err); // Hover over AUTH_100 to see "Invalid credentials (ERROR)"
```

### 4. Type Safety
The system ensures type safety through:
- Strict TypeScript types
- Constant assertions
- Record type for error messages
- Enum for severity levels

## Usage

1. Add error codes to `src/data/error-codes/input.csv` with appropriate severity levels
2. Run `npm run generate` to update TypeScript definitions
3. Import and use error codes in your code:
```typescript
import { AUTH_100, USER_400 } from './src/data/error-codes/generated';

// Log with different severity levels
logError(AUTH_100, err);    // ERROR level
logInfo(USER_400, data);    // INFO level
logWarn(API_300, limit);    // WARN level
logFatal(DB_200, connErr);  // FATAL level
```

## Severity Levels

The system supports four severity levels:

- **INFO**: Informational messages that don't indicate problems
- **WARN**: Warning messages that might indicate potential issues
- **ERROR**: Error messages that indicate actual problems
- **FATAL**: Critical errors that require immediate attention

## How IntelliSense Works

The IntelliSense hover tooltip is powered by:
1. JSDoc comments in the generated TypeScript
2. TypeScript's type system
3. VS Code's language server

When you hover over a constant like `AUTH_100`, VS Code:
1. Reads the JSDoc comment `/** Invalid credentials */`
2. Combines it with severity level and type information
3. Displays it in a tooltip

This provides immediate documentation without leaving your code.

if (process.env.NODE_ENV === 'production') {
  // Production-specific code
  // - Disable detailed error messages
  // - Enable caching
  // - Use production database
  // - Enable compression
  // - Set up security headers
}
