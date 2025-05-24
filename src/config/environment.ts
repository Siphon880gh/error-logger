import { SeverityLevel } from '../data/error-codes/generated';
import * as fs from 'fs';
import * as path from 'path';

type Environment = 'development' | 'staging' | 'production';

interface LogConfig {
  filePath: string;
  maxLines: number;
  allowConsole: boolean;
  allowedConsoleLevels: SeverityLevel[];
}

interface EnvironmentConfig {
  logConfig: LogConfig;
}

const defaultConfig: LogConfig = {
  filePath: './logs/app.log',
  maxLines: 100,
  allowConsole: true,
  allowedConsoleLevels: ['INFO', 'WARN']
};

// Load environment configurations from JSON file
const loadEnvironmentConfigs = (): Record<Environment, EnvironmentConfig> => {
  try {
    const configPath = path.join(__dirname, 'environments.json');
    const configFile = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configFile);
  } catch (error) {
    console.error('Failed to load environment configurations:', error);
    // Return default configurations if file loading fails
    return {
      development: { logConfig: defaultConfig },
      staging: { logConfig: defaultConfig },
      production: { logConfig: defaultConfig }
    };
  }
};

const environmentConfigs = loadEnvironmentConfigs();

export const getEnvironment = (): Environment => {
  return (process.env.NODE_ENV as Environment) || 'development';
};

export const getConfig = (): EnvironmentConfig => {
  const env = getEnvironment();
  return environmentConfigs[env];
}; 