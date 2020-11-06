import inquirer from 'inquirer';

import { Answer } from '../models/answer';

export async function outputSchemaDirectoryQuestion(): Promise<Answer> {

    return await inquirer.prompt([{
        name: 'outputSchemaDir',
        type: 'input',
        message: 'Specify the output schema directory:'
    }]);
}
