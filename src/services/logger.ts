import fs from 'fs';
import path from 'path';
import { ErrorCode, SeverityLevel } from '../data/error-codes/generated';
import { getConfig } from '../config/environment';

class Logger {
  private config = getConfig();
  private logFile: string;
  private maxLines: number;

  constructor() {
    this.logFile = this.config.logConfig.filePath;
    this.maxLines = this.config.logConfig.maxLines;
    this.ensureLogDirectory();
  }

  private ensureLogDirectory() {
    const dir = path.dirname(this.logFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private rotateLogFile() {
    if (!fs.existsSync(this.logFile)) return;

    const lines = fs.readFileSync(this.logFile, 'utf-8').split('\n');
    if (lines.length > this.maxLines) {
      const rotatedLines = lines.slice(-this.maxLines);
      fs.writeFileSync(this.logFile, rotatedLines.join('\n') + '\n');
    }
  }

  private shouldConsoleLog(severity: SeverityLevel): boolean {
    return (
      this.config.logConfig.allowConsole &&
      this.config.logConfig.allowedConsoleLevels.includes(severity)
    );
  }

  private formatLogMessage(code: ErrorCode, severity: SeverityLevel, message: string, data?: unknown): string {
    const timestamp = new Date().toISOString();
    const dataStr = data ? `\nData: ${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] [${code}] [${severity}] ${message}${dataStr}\n`;
  }

  log(code: ErrorCode, severity: SeverityLevel, message: string, data?: unknown) {
    const logMessage = this.formatLogMessage(code, severity, message, data);

    // Write to file
    fs.appendFileSync(this.logFile, logMessage);
    this.rotateLogFile();

    // Console logging based on configuration
    if (this.shouldConsoleLog(severity)) {
      switch (severity) {
        case 'INFO':
          console.info(logMessage);
          break;
        case 'WARN':
          console.warn(logMessage);
          break;
        default:
          // Other severity levels are not logged to console
          break;
      }
    }
  }
}

export const logger = new Logger(); 