import fs from 'fs';
import path from 'path';
import { Answer } from './models/answer';
import { schemaActions } from './actions';
import { inputFilesQuestion, outputSchemaDirectoryQuestion } from './questions';
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

    if ((configFile.config || {}).inputFiles) {
        store.inputFiles = configFile.config.inputFiles;
    } else {
        showError(`Cannot find config.inputFiles in ${configFileName}`);

        const answer: Answer = await inputFilesQuestion();
        store.inputFiles = answer.inputFiles;
    }

    if ((configFile.config || {}).outputSchemaDir) {
        store.outputSchemaDir = configFile.config.outputSchemaDir;
    } else {
        showError(`Cannot find config.outputSchemaDir in ${configFileName}`);

        const answer: Answer = await outputSchemaDirectoryQuestion();
        store.outputSchemaDir = answer.outputSchemaDir;
    }

    await schemaActions();
}
