#!/usr/bin/env node
import { CLIApplication, HelpCommand, VersionCommand, GenerateCommand, ImportCommand, } from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand(),
    new ImportCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
