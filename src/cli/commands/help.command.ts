import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    ${chalk.cyanBright('Программа для подготовки данных для REST API сервера.')}
    Пример:
      ${chalk.greenBright('cli.js --<command> [--arguments]')}
    Команды:
        ${chalk.blueBright('--version')}:                   ${chalk.bgMagentaBright('# выводит номер версии')}
        ${chalk.blueBright('--help')}:                      ${chalk.bgMagentaBright('# печатает этот текст')}
        ${chalk.blueBright('--import')}<path>:             ${chalk.bgMagentaBright('# импортирует данные из TSV')}
        ${chalk.blueBright('--generate')}<n> <path> <url>  ${chalk.bgMagentaBright('# генерирует произвольное количество тестовых данных')}
`);
  }
}
