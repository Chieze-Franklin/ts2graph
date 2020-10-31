import { showReading, showGenerated } from '../utils/logger.util';
import { store } from '../store';
import * as glob from 'glob';
import * as ts2gql from 'ts2gql';
import fs from 'fs-extra';
import path from 'path';

export async function schemaActions(): Promise<any>  {
    if (store.in && store.schemaDir) {
        const files = glob.sync(store.in);
        files.forEach(async file => {
            showReading(file);

            const fileName = path.basename(file, '.ts');
            const outputFilePath = path.resolve(path.join(store.schemaDir, `${fileName}.graphql`));

            await fs.createFile(outputFilePath)
            const writeStream = fs.createWriteStream(outputFilePath);
            ts2gql.emit(file, [], writeStream);

            showGenerated(outputFilePath);
        });

        return;
    }
}
