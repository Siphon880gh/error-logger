# Error Code Management System

A type-safe error code management system with VS Code IntelliSense support.

## Features

- Centralized error code management in CSV
- Type-safe error codes in TypeScript
- VS Code IntelliSense hover tooltips
- Auto-generated TypeScript definitions

## How It Works

### 1. Error Code Definition (errorCodes.csv)
```csv
code,message
AUTH-100,Invalid credentials
DB-200,Database connection failed
API-300,API limit exceeded
```

### 2. Auto-generated TypeScript (errorCodes.ts)
The generator creates TypeScript code with JSDoc comments that enable IntelliSense:

```typescript
/** Invalid credentials */
export const AUTH_100 = ERROR_CODES.AUTH_100.code;
```

### 3. IntelliSense Hover Tooltips
When you hover over an error code constant in VS Code, IntelliSense shows:
- The error message from the JSDoc comment
- The type information
- The constant value

Example:
```typescript
logError(AUTH_100, err); // Hover over AUTH_100 to see "Invalid credentials"
```

### 4. Type Safety
The system ensures type safety through:
- Strict TypeScript types
- Constant assertions
- Record type for error messages

## Usage

1. Add error codes to `errorCodes.csv`
2. Run `npm run generate` to update TypeScript definitions
3. Import and use error codes in your code:
```typescript
import { AUTH_100 } from './errorCodes';

// Hover over AUTH_100 to see the error message
logError(AUTH_100, err);
```

## How IntelliSense Works

The IntelliSense hover tooltip is powered by:
1. JSDoc comments in the generated TypeScript
2. TypeScript's type system
3. VS Code's language server

When you hover over a constant like `AUTH_100`, VS Code:
1. Reads the JSDoc comment `/** Invalid credentials */`
2. Combines it with type information
3. Displays it in a tooltip

This provides immediate documentation without leaving your code.
