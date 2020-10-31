import fs from 'fs';
import path from 'path';
import { Answer } from './models/answer';
import { schemaActions } from './actions';
import { inQuestion, schemaDirectoryQuestion } from './questions';
import { showTitleAndBanner, showError } from './utils/logger.util';
import { store } from './store';

export async function tsToGraph(): Promise<any> {
    showTitleAndBanner();

    // check if ts2graph.congig.json exists
    const configFileName = 'ts2graph.config.json';
    const configFilePath = path.join(process.cwd(), configFileName);

    let configFile;

    if (!fs.existsSync(configFilePath)) {
        showError(`The file ${configFileName} cannot be found in this directory`);
    } else {
        try {
            configFile = JSON.parse(fs.readFileSync(configFilePath, {encoding:'utf8', flag:'r'}));
        } catch (e) {
            showError(e.message);
        }
    }

    if ((configFile.config || {}).in) {
        store.in = configFile.config.in;
    } else {
        showError(`Cannot find config.in in ${configFileName}`);

        const answer: Answer = await inQuestion();
        store.in = answer.in;
    }

    if ((configFile.config || {}).schemaDir) {
        store.schemaDir = configFile.config.schemaDir;
    } else {
        showError(`Cannot find config.schemaDir in ${configFileName}`);

        const answer: Answer = await schemaDirectoryQuestion();
        store.schemaDir = answer.schemaDir;
    }

    await schemaActions();
}
