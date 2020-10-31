import inquirer from 'inquirer';

import { Answer } from '../models/answer';

export async function inQuestion(): Promise<Answer> {

    return await inquirer.prompt([{
        name: 'in',
        type: 'input',
        message: 'Specify the input glob:'
    }]);
}
