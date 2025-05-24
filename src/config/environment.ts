import { SeverityLevel } from '../data/error-codes/generated';

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

const environmentConfigs: Record<Environment, EnvironmentConfig> = {
  development: {
    logConfig: {
      ...defaultConfig,
      filePath: './logs/development.log',
      allowConsole: true,
      allowedConsoleLevels: ['INFO', 'WARN']
    }
  },
  staging: {
    logConfig: {
      ...defaultConfig,
      filePath: './logs/staging.log',
      allowConsole: true,
      allowedConsoleLevels: ['INFO', 'WARN']
    }
  },
  production: {
    logConfig: {
      ...defaultConfig,
      filePath: './logs/production.log',
      allowConsole: false,
      allowedConsoleLevels: []
    }
  }
};

export const getEnvironment = (): Environment => {
  return (process.env.NODE_ENV as Environment) || 'development';
};

export const getConfig = (): EnvironmentConfig => {
  const env = getEnvironment();
  return environmentConfigs[env];
}; 