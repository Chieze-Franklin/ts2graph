import inquirer from 'inquirer';

import { Answer } from '../models/answer';

export async function schemaDirectoryQuestion(): Promise<Answer> {

    return await inquirer.prompt([{
        name: 'schemaDir',
        type: 'input',
        message: 'Specify the output schema directory:'
    }]);
}
