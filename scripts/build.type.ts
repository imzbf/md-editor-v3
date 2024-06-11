import ts from 'typescript';
import { replaceTscAliasPaths } from 'tsc-alias';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const buildType = () => {
  const configFile = 'tsconfig.build.json';

  const configPath = path.resolve(configFile);
  const configFileContents = fs.readFileSync(configPath, 'utf8');
  const config = ts.parseConfigFileTextToJson(configPath, configFileContents);

  const parsedCommandLine = ts.parseJsonConfigFileContent(
    config.config,
    ts.sys,
    path.dirname(configPath)
  );

  const program = ts.createProgram(
    parsedCommandLine.fileNames,
    parsedCommandLine.options
  );

  const emitResult = program.emit();

  const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

  allDiagnostics.forEach((diagnostic) => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start
      );
      const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
      console.log(
        chalk.red(
          `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
        )
      );
    } else {
      console.log(
        chalk.red(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'))
      );
    }
  });

  if (allDiagnostics.length > 0) {
    process.exit(1);
  }

  // 处理别名
  replaceTscAliasPaths({
    configFile: configPath
  });
};
