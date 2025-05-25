# Error Code Management System

![Last Commit](https://img.shields.io/github/last-commit/Siphon880gh/error-logger/main)
<a target="_blank" href="https://github.com/Siphon880gh" rel="nofollow"><img src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" alt="Github" data-canonical-src="https://img.shields.io/badge/GitHub--blue?style=social&logo=GitHub" style="max-width:8.5ch;"></a>
<a target="_blank" href="https://www.linkedin.com/in/weng-fung/" rel="nofollow"><img src="https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue" alt="Linked-In" data-canonical-src="https://img.shields.io/badge/LinkedIn-blue?style=flat&amp;logo=linkedin&amp;labelColor=blue" style="max-width:10ch;"></a>
<a target="_blank" href="https://www.youtube.com/@WayneTeachesCode/" rel="nofollow"><img src="https://img.shields.io/badge/Youtube-red?style=flat&logo=youtube&labelColor=red" alt="Youtube" data-canonical-src="https://img.shields.io/badge/Youtube-red?style=flat&amp;logo=youtube&amp;labelColor=red" style="max-width:10ch;"></a>

By Weng Fei Fung. Frustrated with messy error handling, I built a type-safe error code system with full VS Code IntelliSense support. It enforces best practices by limiting console output to info and warn logs, while routing critical errors to private log files—optionally capped by line count for easier management. Each error includes a structured code and a clear, human-readable description to make issues easier to understand, report, and debug.

The system is fully configurable across environments (development, staging, production), and it maintains a synced CSV file of errors to serve as a centralized, editable catalog for the entire team. Thanks to IntelliSense integration, developers can hover over any error code in VS Code and instantly preview its description—making it fast and intuitive to use the right codes in the right context.

## Features

- Centralized error code management in CSV
- Type-safe error codes in TypeScript
- VS Code IntelliSense hover tooltips
- Auto-generated TypeScript definitions
- Support for multiple severity levels (INFO, WARN, ERROR, FATAL)
- Environment-specific logging configurations
- Configurable log levels with JSON-based configuration

## How It Works

### 1. Error Code Definition (src/data/error-codes/input.csv)
```csv
code,message,severity
AUTH-100,Invalid credentials,ERROR
DB-200,Database connection failed,FATAL
API-300,API limit exceeded,WARN
USER-400,User preferences updated,INFO
```

> Pro Tip: Have the team use Excel 
> ![](README-assets/screenshot-excel.png)

### 2. Log Levels Configuration


The system supports four severity levels, each configurable in `src/config/levels/input.json`:

- **INFO**: Informational messages that don't indicate problems
  - Console output allowed
  - File logging required
- **WARN**: Warning messages that might indicate potential issues
  - Console output allowed
  - File logging required
- **ERROR**: Error messages that indicate actual problems
  - Console output disabled
  - File logging required
- **FATAL**: Critical errors that require immediate attention
  - Console output disabled
  - File logging required

By swapping true or false, you can control if the error message appears in the console and/or a log file. Note that the log filepath may differ depending on if you're on local development or deployed to staging or production, therefore filepath configuration will be at the environment config (will review later).

```json
{
  "levels": {
    "INFO": {
      "description": "Informational messages that don't indicate problems",
      "consoleAllowed": true,
      "fileRequired": true
    },
    "WARN": {
      "description": "Warning messages that might indicate potential issues",
      "consoleAllowed": true,
      "fileRequired": true
    },
    "ERROR": {
      "description": "Error messages that indicate actual problems",
      "consoleAllowed": false,
      "fileRequired": true
    },
    "FATAL": {
      "description": "Critical errors that require immediate attention",
      "consoleAllowed": false,
      "fileRequired": true
    }
  }
}
```

The default configuration follows best practices already, but you may configure it to your liking if you want to.

See Weng's notes on log leveling best practices with regards to sending information to the console or to the log files:
https://wengindustries.com/app/devbrain/?open=_Software Development Standards, Runtime - Logging#-Log-Levels--Safe-Output-Local-and-Staging-Servers

### 4. Auto-generated TypeScript (src/data/error-codes/generated.ts)
The generator creates TypeScript code with JSDoc comments that enable IntelliSense:

```typescript
/** Invalid credentials */
export const AUTH_100 = ERROR_CODES.AUTH_100.code;
```

### 5. IntelliSense Hover Tooltips
When you hover over an error code constant in VS Code, IntelliSense shows:
- The error message from the JSDoc comment
- The severity level
- The type information
- The constant value

Example:
```typescript
logError(AUTH_100, err); // Hover over AUTH_100 to see "Invalid credentials (ERROR)"
```

> Hover your mouse over the error code
> ![](README-assets/screenshot-intellisense.png)

When you hover over a constant like `AUTH_102`, VS Code:
1. Reads the JSDoc comment `/** Token expired */`
2. Combines it with severity level and type information
3. Displays it in a tooltip

This provides immediate documentation without leaving your code.

### 6. Type Safety
The system ensures type safety through:
- Strict TypeScript types
- Constant assertions
- Record type for error messages
- Enum for severity levels


## Setup: Environment Configuration

Logging behavior can be configured per environment in `src/config/environments.json`:
- Development: Console logging enabled for INFO and WARN
- Staging: Console logging enabled for INFO and WARN
- Production: Console logging disabled, all levels written to file

src/config/environments.json:
```
{
  "development": {
    "logConfig": {
      "filePath": "./logs/development.log",
      "maxLines": 100,
      "allowConsole": true,
      "allowedConsoleLevels": ["INFO", "WARN"]
    }
  },
  "staging": {
    "logConfig": {
      "filePath": "./logs/staging.log",
      "maxLines": 100,
      "allowConsole": true,
      "allowedConsoleLevels": ["INFO", "WARN"]
    }
  },
  "production": {
    "logConfig": {
      "filePath": "./logs/production.log",
      "maxLines": 100,
      "allowConsole": false,
      "allowedConsoleLevels": []
    }
  }
} 
```

## Usage

1. Add error codes to `src/data/error-codes/input.csv` with appropriate severity levels. They must match capilization and spelling between the `src/config/levels/input.json` and the csv spreadsheet: INFO, WARN, ERROR, FATAL.
2. Optionally, configure log levels in `src/config/levels/input.json`
3. Configure environmental settings which includes logging file paths, at `src/config/environments.json`
4. Input your error codes and severeity levels at `data/error-codes/input.csv`.
3. Run `npm run generate` to update all configs and error codes, in addition to updating the IntelliSense hovering tooltips inside VS Code.
4. Import and use error codes in your code:
```typescript
import { AUTH_100, USER_400 } from './src/data/error-codes/generated';

// Log with different severity levels
logError(AUTH_100, err);    // ERROR level
logInfo(USER_400, data);    // INFO level
logWarn(API_300, limit);    // WARN level
logFatal(DB_200, connErr);  // FATAL level

// Or use logAppropriate to automatically use the correct severity level
// based on the error code's definition in the CSV file
logAppropriate(AUTH_100, err);  // Will log as ERROR
logAppropriate(USER_400, data); // Will log as INFO
```

5. Test in different environments:

The `package.json` file defines how to start the app in different environments:

```
"start": "NODE_ENV=production ts-node src/app.ts",
"start:dev": "NODE_ENV=development ts-node src/app.ts",
"start:staging": "NODE_ENV=staging ts-node src/app.ts"
```

Use the appropriate npm run command to start the app in the desired environment—for example, npm run start:dev for development.

The app will log errors to the file path specified for that environment in your environments.json.

For example, running `npm run start` it'll simulate a crash on the console log and then writes error information to the file `logs/production.log`:
- You do not need logs/ folder to exist beacuse the logger automatically creates that folder if it doesn't exist.
```
[2025-05-25T04:10:45.696Z] [API-300] [WARN] API limit exceeded
Data: {
  "limit": 100
}
[2025-05-25T04:10:45.697Z] [AUTH-102] [ERROR] Token expired
Data: {
  "error": "Simulated failure"
}
[2025-05-25T04:10:45.697Z] [DB-200] [FATAL] Database connection failed
Data: {
  "error": "Simulated failure"
}
```

## Future Plans

This system will be released as an npm package, allowing you to:

1. Install via npm:
```bash
npm install error-code-manager
```

2. Use in your project:
```typescript
import { ErrorCodeManager } from 'error-code-manager';

const manager = new ErrorCodeManager({
  // Your configuration here
});
```

3. Features planned for the plugin:
   - Custom log level definitions
   - Multiple output formats (JSON, CSV, YAML)
   - Custom log formatters
   - Integration with popular logging libraries
   - CLI tools for code generation
   - VS Code extension for better IDE support
   - Custom severity level definitions
   - Environment-specific configurations
   - Log rotation and management
   - Performance optimizations

Stay tuned for the release!

## Further Reading

Checkout Weng's notes on best practices of error handling and logging:
- Error Handling: https://wengindustries.com/app/devbrain/?open=_Software%20Development%20Standards,%20Runtime%20-%20Error%20Handling
- Logging: https://wengindustries.com/app/devbrain/?open=_Software%20Development%20Standards,%20Runtime%20-%20Logging
