// Auto-generated from input.json
// DO NOT EDIT DIRECTLY

export type SeverityLevel = 'INFO' | 'WARN' | 'ERROR' | 'FATAL';

export interface LevelConfig {
  description: string;
  consoleAllowed: boolean;
  fileRequired: boolean;
}

export const LEVEL_CONFIGS: Record<SeverityLevel, LevelConfig> = {
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
};

export const CONSOLE_ALLOWED_LEVELS: SeverityLevel[] = ["INFO","WARN"];

export const FILE_REQUIRED_LEVELS: SeverityLevel[] = ["INFO","WARN","ERROR","FATAL"];
