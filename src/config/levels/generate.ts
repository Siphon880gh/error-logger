import * as fs from 'fs';
import * as path from 'path';

interface LevelConfig {
  description: string;
  consoleAllowed: boolean;
  fileRequired: boolean;
}

interface LevelsConfig {
  levels: Record<string, LevelConfig>;
}

function generateTypes() {
  try {
    // Read the input configuration
    const inputPath = path.join(__dirname, 'input.json');
    const config: LevelsConfig = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

    // Generate TypeScript code
    const levelNames = Object.keys(config.levels);
    const typeContent = `// Auto-generated from input.json
// DO NOT EDIT DIRECTLY

export type SeverityLevel = ${levelNames.map(level => `'${level}'`).join(' | ')};

export interface LevelConfig {
  description: string;
  consoleAllowed: boolean;
  fileRequired: boolean;
}

export const LEVEL_CONFIGS: Record<SeverityLevel, LevelConfig> = ${JSON.stringify(config.levels, null, 2)};

export const CONSOLE_ALLOWED_LEVELS: SeverityLevel[] = ${JSON.stringify(
      levelNames.filter(level => config.levels[level].consoleAllowed)
    )};

export const FILE_REQUIRED_LEVELS: SeverityLevel[] = ${JSON.stringify(
      levelNames.filter(level => config.levels[level].fileRequired)
    )};
`;

    // Write the generated file
    const outputPath = path.join(__dirname, 'generated.ts');
    fs.writeFileSync(outputPath, typeContent);
    console.log('Successfully generated types from input.json');
  } catch (error) {
    console.error('Failed to generate types:', error);
    process.exit(1);
  }
}

generateTypes(); 