import * as glob from 'glob';
import fs from 'fs-extra';
import path from 'path';
import { showReading, showGenerated } from '../utils/logger.util';
import { store } from '../store';
import * as compiler from '../compiler';

export async function schemaActions(): Promise<any>  {
    if (store.in && store.schemaDir) {
        const files = glob.sync(store.in);
        files.forEach(async file => {
            showReading(file);

            const fileName = path.basename(file, '.ts');
            const outputFilePath = path.resolve(path.join(store.schemaDir, `${fileName}.graphql`));

            await fs.createFile(outputFilePath)
            const writeStream = fs.createWriteStream(outputFilePath);
            compiler.emit(file, [], writeStream);

            showGenerated(outputFilePath);
        });

        return;
    }
}
